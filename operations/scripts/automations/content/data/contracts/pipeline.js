const https = require("node:https");
const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");
const { keccak256 } = require("js-sha3");

const {
  ACTIVE_LIFECYCLES,
  BRANCH_WATCH_STATE_PATH,
  CONTROLLERS,
  DEFAULT_RPC_URLS,
  EXPLORER_URLS,
  FAILURE_CLASSES,
  GOVERNOR_FILE,
  GOVERNOR_REPO,
  HEALTH_CHECK_PATH,
  OUTPUT_JSON_PATH,
  OUTPUT_PATH,
  PUBLIC_COMPANION_PATH,
  PUBLISHED_LIFECYCLES,
  REPO_ROOT,
  WATCHED_REPOS,
} = require("./constants");
const { diffBranchWatchState, loadBranchWatchState, writeBranchWatchState } = require("./branch-watch");
const { writeIncidentArtifacts, computeIncidentFingerprint } = require("./incidents");
const { buildContractProofCatalog } = require("./spec");

const REQUEST_TIMEOUT_MS = Number.parseInt(process.env.CONTRACTS_HTTP_TIMEOUT_MS || "15000", 10) || 15000;
const GET_CONTRACT_SELECTOR = `0x${keccak256("getContract(bytes32)").slice(0, 8)}`;
const TARGET_CONTRACT_ID_SELECTOR = `0x${keccak256("targetContractId()").slice(0, 8)}`;
const CONTROLLER_GETTER_SELECTOR = `0x${keccak256("controller()").slice(0, 8)}`;
const ARBISCAN_API_KEY = process.env.ARBISCAN_API_KEY || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || process.env.ETHERSCAN_API_KEY_2 || "";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function httpsGet(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const request = https.request({
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      method: "GET",
      timeout: REQUEST_TIMEOUT_MS,
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "livepeer-docs-bot",
        ...headers,
      },
    }, (response) => {
      let data = "";
      response.on("data", (chunk) => {
        data += chunk;
      });
      response.on("end", () => resolve({ status: response.statusCode, data }));
    });
    request.on("error", reject);
    request.on("timeout", () => request.destroy(new Error(`Request timed out after ${REQUEST_TIMEOUT_MS}ms: ${url}`)));
    request.end();
  });
}

function httpsPost(url, body) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const postData = typeof body === "string" ? body : JSON.stringify(body);
    const request = https.request({
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      method: "POST",
      timeout: REQUEST_TIMEOUT_MS,
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData),
      },
    }, (response) => {
      let data = "";
      response.on("data", (chunk) => {
        data += chunk;
      });
      response.on("end", () => resolve({ status: response.statusCode, data }));
    });
    request.on("error", reject);
    request.on("timeout", () => request.destroy(new Error(`Request timed out after ${REQUEST_TIMEOUT_MS}ms: ${url}`)));
    request.write(postData);
    request.end();
  });
}

async function ethCall(chain, to, data) {
  const urls = DEFAULT_RPC_URLS[chain] || [];
  const failures = [];
  for (const rpcUrl of urls) {
    try {
      const rpcResponse = await httpsPost(rpcUrl, {
        jsonrpc: "2.0",
        method: "eth_call",
        params: [{ to, data }, "latest"],
        id: 1,
      });
      const rpcData = JSON.parse(rpcResponse.data);
      if (rpcData.result && rpcData.result !== "0x") {
        return { result: rpcData.result, rpcUrl, failures };
      }
      failures.push({ rpcUrl, detail: rpcData.error?.message || "empty result" });
    } catch (error) {
      failures.push({ rpcUrl, detail: error.message });
    }
  }
  return { result: null, rpcUrl: null, failures };
}

function decodeAddressCallResult(result) {
  if (typeof result !== "string" || result.length < 42) return null;
  const address = `0x${result.slice(-40)}`;
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) return null;
  if (/^0x0{40}$/i.test(address)) return null;
  return address;
}

function decodeBytes32CallResult(result) {
  if (typeof result !== "string" || !/^0x[a-fA-F0-9]{64}$/.test(result)) return null;
  if (/^0x0{64}$/i.test(result)) return null;
  return result;
}

function normalizeAddress(value) {
  return typeof value === "string" ? value.toLowerCase() : null;
}

function addressesMatch(left, right) {
  return Boolean(left && right && normalizeAddress(left) === normalizeAddress(right));
}

function compareVersions(left, right) {
  const l = Number(String(left || "").replace(/^V/i, "")) || 0;
  const r = Number(String(right || "").replace(/^V/i, "")) || 0;
  return l - r;
}

function resolveGovernorSeries(governorChain, prefix) {
  return Object.entries(governorChain || {})
    .filter(([key]) => key.startsWith(prefix))
    .map(([key, address]) => {
      const version = key.slice(prefix.length);
      if (!/^(\d+)$/.test(version)) return null;
      return { key, address, version: `V${version}` };
    })
    .filter(Boolean)
    .sort((a, b) => compareVersions(a.version, b.version));
}

function resolveAuthority(strategy, governorChain) {
  if (!strategy) return { address: null, version: null, authorityKind: "unknown", sourceKey: null };
  if (strategy.kind === "governor-key") {
    return {
      address: governorChain?.[strategy.key] || null,
      version: strategy.version || null,
      authorityKind: "governor-manifest",
      sourceKey: strategy.key,
    };
  }
  if (strategy.kind === "governor-versioned-latest") {
    const candidates = resolveGovernorSeries(governorChain || {}, strategy.prefix || "");
    const winner = candidates[candidates.length - 1] || null;
    return {
      address: winner?.address || governorChain?.[strategy.baseKey] || null,
      version: winner?.version || strategy.baseVersion || null,
      authorityKind: "governor-manifest",
      sourceKey: winner?.key || strategy.baseKey || null,
    };
  }
  if (strategy.kind === "proxy-meta") {
    return {
      address: null,
      version: null,
      authorityKind: "proxy-runtime",
      sourceKey: null,
    };
  }
  return { address: null, version: null, authorityKind: "unknown", sourceKey: null };
}

function githubCliGet(endpoint) {
  try {
    const output = execFileSync("gh", ["api", endpoint], {
      cwd: REPO_ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    return { status: 200, data: output };
  } catch (error) {
    const message = (error.stderr || error.stdout || error.message || "").toString();
    const statusMatch = message.match(/HTTP (\d{3})/i);
    return { status: statusMatch ? Number(statusMatch[1]) : 500, data: message };
  }
}

async function githubGet(endpoint) {
  const headers = {};
  if (GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
  }
  if (GITHUB_TOKEN) {
    const response = await httpsGet(`https://api.github.com${endpoint}`, headers);
    if (response.status === 200) return response;
  }
  return githubCliGet(endpoint);
}

async function fetchGovernorAddresses() {
  const response = await githubGet(`/repos/${GOVERNOR_REPO}/contents/${GOVERNOR_FILE}`);
  if (response.status !== 200) {
    throw new Error(`Unable to fetch ${GOVERNOR_REPO}/${GOVERNOR_FILE}: ${String(response.data).slice(0, 200)}`);
  }
  const json = JSON.parse(response.data);
  const content = Buffer.from(json.content, "base64").toString("utf8");
  const sha = json.sha.slice(0, 7);
  const match = content.match(/const ADDRESSES\s*=\s*(\{[\s\S]*?\});/);
  if (!match) throw new Error("Could not parse ADDRESSES from governor-scripts");
  const addresses = new Function(`return ${match[1]}`)();
  return { addresses, sha };
}

function getGovernorChain(governorAddresses, chain) {
  return chain === "arbitrumOne"
    ? (governorAddresses.arbitrumMainnet || {})
    : (governorAddresses.mainnet || {});
}

async function fetchRepoInventory(repoConfig) {
  const repoInfoResponse = await githubGet(`/repos/${repoConfig.repo}`);
  const repoInfo = repoInfoResponse.status === 200 ? JSON.parse(repoInfoResponse.data) : {};
  const branchesResponse = await githubGet(`/repos/${repoConfig.repo}/branches?per_page=100`);
  const branches = branchesResponse.status === 200 ? JSON.parse(branchesResponse.data).map((branch) => branch.name).sort() : [];
  return {
    repo: repoConfig.repo,
    role: repoConfig.role,
    defaultBranch: repoInfo.default_branch || repoConfig.preferredBranches?.[0] || null,
    branches,
  };
}

async function resolveCodeSource(codeAuthority) {
  if (!codeAuthority) return null;
  const commitResponse = await githubGet(`/repos/${codeAuthority.repo}/commits/${codeAuthority.branch}`);
  if (commitResponse.status !== 200) {
    return {
      ...codeAuthority,
      resolvedCommit: null,
      href: codeAuthority.path
        ? `https://github.com/${codeAuthority.repo}/blob/${codeAuthority.branch}/${codeAuthority.path}`
        : null,
      isPrivate: false,
      resolutionError: `commit lookup returned ${commitResponse.status}`,
    };
  }
  const commitData = JSON.parse(commitResponse.data);
  const resolvedCommit = String(commitData.sha || "").slice(0, 7) || null;
  const contentsResponse = await githubGet(
    `/repos/${codeAuthority.repo}/contents/${codeAuthority.path}?ref=${codeAuthority.branch}`
  );
  return {
    ...codeAuthority,
    resolvedCommit,
    href: resolvedCommit
      ? `https://github.com/${codeAuthority.repo}/blob/${resolvedCommit}/${codeAuthority.path}`
      : `https://github.com/${codeAuthority.repo}/blob/${codeAuthority.branch}/${codeAuthority.path}`,
    isPrivate: false,
    exists: contentsResponse.status === 200,
  };
}

async function resolveControllerSlotAddress(chain, slotName) {
  if (!CONTROLLERS[chain] || !slotName) return { address: null, rpcUrl: null, failures: [] };
  const call = await ethCall(chain, CONTROLLERS[chain], `${GET_CONTRACT_SELECTOR}${keccak256(slotName)}`);
  return {
    address: decodeAddressCallResult(call.result),
    rpcUrl: call.rpcUrl,
    failures: call.failures,
  };
}

async function resolveProxyRuntimeVerification(chain, proxyAddress, canonicalName) {
  if (!proxyAddress) {
    return {
      controllerAddress: null,
      controllerMatchesExpected: null,
      targetContractId: null,
      targetContractName: null,
      implementationAddress: null,
      implementationSource: null,
      rpcFailures: [],
    };
  }

  const controllerCall = await ethCall(chain, proxyAddress, CONTROLLER_GETTER_SELECTOR);
  const controllerAddress = decodeAddressCallResult(controllerCall.result) || CONTROLLERS[chain] || null;
  const targetIdCall = await ethCall(chain, proxyAddress, TARGET_CONTRACT_ID_SELECTOR);
  const targetContractId = decodeBytes32CallResult(targetIdCall.result);
  const targetContractName = targetContractId ? `${canonicalName}Target` : null;

  let implementationAddress = null;
  if (controllerAddress && targetContractId) {
    const implementationCall = await ethCall(
      chain,
      controllerAddress,
      `${GET_CONTRACT_SELECTOR}${targetContractId.slice(2)}`
    );
    implementationAddress = decodeAddressCallResult(implementationCall.result);
  }

  return {
    controllerAddress,
    controllerMatchesExpected: controllerAddress ? addressesMatch(controllerAddress, CONTROLLERS[chain]) : null,
    targetContractId,
    targetContractName,
    implementationAddress,
    implementationSource: implementationAddress ? "proxy-runtime-controller" : null,
    rpcFailures: [...(controllerCall.failures || []), ...(targetIdCall.failures || [])],
  };
}

async function searchRepoForAddress(strategy) {
  if (!strategy?.repos?.length || !strategy.searchTerms?.length) {
    return { address: null, authorityKind: "repo-search", repo: null, path: null, refMode: "code-search", resolvedCommit: null, sourceKey: null };
  }

  for (const repo of strategy.repos) {
    for (const term of strategy.searchTerms) {
      const query = encodeURIComponent(`${term} repo:${repo}`);
      const response = await githubGet(`/search/code?q=${query}&per_page=5`);
      if (response.status !== 200) continue;
      const data = JSON.parse(response.data);
      for (const item of data.items || []) {
        const fileResponse = await githubGet(`/repos/${repo}/contents/${item.path}?ref=${item.repository.default_branch}`);
        if (fileResponse.status !== 200) continue;
        const fileJson = JSON.parse(fileResponse.data);
        const content = fileJson.content ? Buffer.from(fileJson.content, "base64").toString("utf8") : "";
        const addressMatch = content.match(/0x[a-fA-F0-9]{40}/);
        if (addressMatch) {
          return {
            address: addressMatch[0],
            authorityKind: "repo-search",
            repo,
            path: item.path,
            refMode: "code-search",
            resolvedCommit: String(fileJson.sha || "").slice(0, 7) || null,
            sourceKey: term,
          };
        }
      }
    }
  }

  return { address: null, authorityKind: "repo-search", repo: null, path: null, refMode: "code-search", resolvedCommit: null, sourceKey: null };
}

async function resolveDeployment(definition, governorAddresses) {
  const governorChain = getGovernorChain(governorAddresses, definition.chain);
  let resolved;

  if (definition.addressStrategy.kind === "controller-root") {
    resolved = {
      address: CONTROLLERS[definition.chain],
      authorityKind: "controller-runtime",
      repo: null,
      path: null,
      refMode: "onchain-root",
      resolvedCommit: null,
      sourceKey: definition.canonicalName,
      version: null,
    };
  } else if (definition.addressStrategy.kind === "controller-slot") {
    const slot = await resolveControllerSlotAddress(definition.chain, definition.addressStrategy.controllerSlot);
    resolved = {
      address: slot.address,
      authorityKind: "controller-runtime",
      repo: null,
      path: null,
      refMode: "onchain-controller",
      resolvedCommit: null,
      sourceKey: definition.addressStrategy.controllerSlot,
      version: null,
      rpcFailures: slot.failures || [],
    };
  } else if (definition.addressStrategy.kind === "governor-manifest") {
    const authority = resolveAuthority({ kind: "governor-key", key: definition.addressStrategy.governorKey }, governorChain);
    resolved = {
      address: authority.address,
      authorityKind: authority.authorityKind,
      repo: GOVERNOR_REPO,
      path: GOVERNOR_FILE,
      refMode: "default_branch",
      resolvedCommit: governorAddresses._sha || null,
      sourceKey: authority.sourceKey,
      version: authority.version,
    };
  } else if (definition.addressStrategy.kind === "repo-search") {
    resolved = await searchRepoForAddress(definition.addressStrategy);
  } else {
    resolved = {
      address: null,
      authorityKind: "unknown",
      repo: null,
      path: null,
      refMode: null,
      resolvedCommit: null,
      sourceKey: null,
      version: null,
    };
  }

  const codeSource = await resolveCodeSource(definition.codeAuthority);
  return {
    definition,
    governorChain,
    resolved,
    codeSource,
  };
}

function getExplorerAddressBase(chain) {
  return chain === "arbitrumOne" ? EXPLORER_URLS.arbiscanAddress : EXPLORER_URLS.etherscanAddress;
}

function getBlockscoutBase(chain) {
  return chain === "arbitrumOne" ? EXPLORER_URLS.blockscoutArbitrum : EXPLORER_URLS.blockscoutEthereum;
}

function getExplorerProfile(chain) {
  const addressBaseUrl = getExplorerAddressBase(chain);
  return {
    family: chain === "arbitrumOne" ? "etherscan" : "etherscan",
    host: new URL(addressBaseUrl).host,
    addressBaseUrl,
  };
}

function buildBaseEntry(definition, resolution) {
  const address = resolution.resolved.address || null;
  const codeSource = resolution.codeSource;
  return {
    id: definition.id,
    name: definition.canonicalName,
    canonicalName: definition.canonicalName,
    address,
    type: definition.deploymentKind,
    deploymentKind: definition.deploymentKind,
    category: definition.category,
    lifecycle: definition.lifecycle,
    chain: definition.chain,
    version: resolution.resolved.version || null,
    addressAuthority: resolution.resolved.authorityKind,
    runtimeAuthority: definition.runtimeAuthority?.kind || "explorer",
    repoSrc: codeSource?.repo && (codeSource.resolvedCommit || codeSource.branch)
      ? `${codeSource.repo}@${codeSource.resolvedCommit || codeSource.branch}`
      : null,
    contractCodeHref: codeSource?.href || null,
    blockchainHref: address ? `${getExplorerAddressBase(definition.chain)}${address}` : null,
    hasBytecode: null,
    sourceVerified: null,
    verified: null,
    verifiedAt: null,
    verifiedAtISO: null,
    isHistorical: definition.lifecycle === "historical",
    meta: {
      statusLabel: definition.lifecycle === "active" ? "Active" : definition.lifecycle.replaceAll("_", " "),
      notes: definition.notes || null,
      keccakHash: `0x${keccak256(definition.canonicalName)}`,
      registrationState: definition.runtimeAuthority?.kind === "controller" ? "unknown" : "not_applicable",
      registeredInController: definition.runtimeAuthority?.kind === "controller" ? null : false,
      controllerSlot: definition.runtimeAuthority?.controllerSlot || null,
      controllerResolvedAddress: null,
      governorKey: resolution.resolved.sourceKey || null,
      currentImplementation: false,
      currentImplementationVersion: null,
      proxyTarget: null,
      repoIsPrivate: false,
      creatorAddress: null,
      blockscoutLabel: null,
      sourceResolvedCommit: codeSource?.resolvedCommit || null,
      sourceResolutionError: codeSource?.resolutionError || null,
    },
    addressSource: {
      kind: resolution.resolved.authorityKind || "unknown",
      repo: resolution.resolved.repo || null,
      path: resolution.resolved.path || null,
      refMode: resolution.resolved.refMode || null,
      resolvedCommit: resolution.resolved.resolvedCommit || null,
      key: resolution.resolved.sourceKey || null,
    },
    codeSource: codeSource
      ? {
          repo: codeSource.repo,
          branch: codeSource.branch,
          path: codeSource.path,
          href: codeSource.href,
          isPrivate: false,
          resolvedCommit: codeSource.resolvedCommit || null,
        }
      : null,
  };
}

async function verifyAddresses(entries, chain, skipVerify = false) {
  if (skipVerify) return entries;
  const baseUrl = chain === "arbitrumOne" ? "https://api.arbiscan.io" : "https://api.etherscan.io";
  const apiKey = chain === "arbitrumOne" ? ARBISCAN_API_KEY : ETHERSCAN_API_KEY;
  const now = new Date();
  const nowFormatted = now.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  const nowISO = now.toISOString();
  const results = [];

  for (const entry of entries) {
    if (!entry.address) {
      results.push(entry);
      continue;
    }

    let hasBytecode = null;
    try {
      let url = `${baseUrl}/api?module=proxy&action=eth_getCode&address=${entry.address}&tag=latest`;
      if (apiKey) url += `&apikey=${apiKey}`;
      const response = await httpsGet(url);
      const data = JSON.parse(response.data);
      hasBytecode = Boolean(data.result && data.result !== "0x" && data.result.length > 2);
    } catch (_error) {
      hasBytecode = false;
    }

    results.push({
      ...entry,
      hasBytecode,
      verifiedAt: nowFormatted,
      verifiedAtISO: nowISO,
    });
    await sleep(apiKey ? 100 : 250);
  }

  return results;
}

async function enrichFromBlockscout(entry) {
  const addressResponse = await httpsGet(`${getBlockscoutBase(entry.chain)}/api/v2/addresses/${entry.address}`);
  if (addressResponse.status !== 200) {
    throw new Error(`Blockscout address lookup failed: ${addressResponse.status}`);
  }
  const data = JSON.parse(addressResponse.data);
  return {
    creatorAddress: data.creator_address_hash || null,
    blockscoutLabel: data.name || null,
    bsVerified: data.is_verified,
    isContract: data.is_contract,
    balance: data.coin_balance || null,
    compilerVersion: data.compiler_version || null,
    isProxy: data.proxy_type ? true : null,
  };
}

async function enrichMetadata(entries, skipVerify = false) {
  const results = [];
  const warnings = [];

  for (const entry of entries) {
    const next = { ...entry, meta: { ...(entry.meta || {}) } };
    if (!entry.address) {
      results.push(next);
      continue;
    }

    if (!skipVerify) {
      try {
        const blockscoutMeta = await enrichFromBlockscout(entry);
        Object.entries(blockscoutMeta).forEach(([key, value]) => {
          if (value != null) next.meta[key] = value;
        });
        next.sourceVerified = typeof blockscoutMeta.bsVerified === "boolean" ? blockscoutMeta.bsVerified : next.sourceVerified;
      } catch (error) {
        warnings.push({
          failureClass: FAILURE_CLASSES.truth,
          endpoint: "blockscout-enrichment",
          chain: entry.chain,
          contract: entry.name,
          detail: error.message,
        });
      }
    }

    if (entry.runtimeAuthority === "controller" && entry.meta.controllerSlot) {
      const controllerResolution = await resolveControllerSlotAddress(entry.chain, entry.meta.controllerSlot);
      next.meta.controllerResolvedAddress = controllerResolution.address;
      next.meta.registrationState = controllerResolution.address && addressesMatch(controllerResolution.address, entry.address)
        ? "registered"
        : "not_registered";
      next.meta.registeredInController = next.meta.registrationState === "registered";
      if (controllerResolution.failures?.length) {
        next.meta.rpcFailures = controllerResolution.failures;
      }
    } else {
      next.meta.registrationState = "not_applicable";
      next.meta.registeredInController = false;
    }

    if (entry.deploymentKind === "proxy") {
      const proxyRuntime = await resolveProxyRuntimeVerification(entry.chain, entry.address, entry.canonicalName);
      next.meta.proxyControllerAddress = proxyRuntime.controllerAddress;
      next.meta.proxyControllerMatchesExpected = proxyRuntime.controllerMatchesExpected;
      next.meta.proxyTargetContractId = proxyRuntime.targetContractId;
      next.meta.proxyTargetContractName = proxyRuntime.targetContractName;
      next.meta.proxyTarget = proxyRuntime.implementationAddress;
      next.meta.proxyImplementationSource = proxyRuntime.implementationSource;
    }

    next.verified = next.sourceVerified;
    results.push(next);
  }

  results._warnings = warnings;
  return results;
}

function buildImplementationEntries(entries, governorAddresses) {
  const implementations = [];
  for (const entry of entries) {
    const strategy = entry.definition?.currentImplementationStrategy;
    if (!strategy) continue;
    let implementationAddress = null;
    let implementationVersion = null;
    let implementationSource = null;
    if (strategy.kind === "proxy-meta") {
      implementationAddress = entry.entry.meta.proxyTarget || null;
      implementationSource = entry.entry.meta.proxyImplementationSource || "proxy-runtime";
    } else {
      const authority = resolveAuthority(strategy, getGovernorChain(governorAddresses, entry.definition.chain));
      implementationAddress = authority.address;
      implementationVersion = authority.version || null;
      implementationSource = authority.authorityKind;
    }
    if (!implementationAddress) continue;
    implementations.push({
      id: `${entry.definition.id}.implementation`,
      name: entry.definition.canonicalName,
      canonicalName: entry.definition.canonicalName,
      address: implementationAddress,
      type: "target",
      deploymentKind: "target",
      category: entry.definition.category,
      lifecycle: "historical",
      chain: entry.definition.chain,
      version: implementationVersion,
      addressAuthority: implementationSource,
      runtimeAuthority: "explorer",
      repoSrc: entry.entry.repoSrc,
      contractCodeHref: entry.entry.contractCodeHref,
      blockchainHref: `${getExplorerAddressBase(entry.definition.chain)}${implementationAddress}`,
      hasBytecode: null,
      sourceVerified: null,
      verified: null,
      verifiedAt: null,
      verifiedAtISO: null,
      isHistorical: true,
      meta: {
        statusLabel: "Current implementation",
        notes: "Current implementation behind the published proxy address.",
        keccakHash: `0x${keccak256(entry.definition.canonicalName)}`,
        registrationState: "not_applicable",
        registeredInController: false,
        controllerSlot: entry.definition.runtimeAuthority?.controllerSlot || null,
        controllerResolvedAddress: null,
        governorKey: strategy.key || null,
        currentImplementation: true,
        currentImplementationVersion: implementationVersion,
        proxyAddress: entry.entry.address,
        proxyTarget: implementationAddress,
        proxyImplementationSource: implementationSource,
        expectedProxyImplementationAddress: implementationAddress,
        expectedProxyImplementationSource: implementationSource,
        proxyImplementationMatchesExpected: true,
        repoIsPrivate: false,
      },
      addressSource: {
        kind: implementationSource || "proxy-runtime",
        repo: GOVERNOR_REPO,
        path: GOVERNOR_FILE,
        refMode: implementationSource === "proxy-runtime" ? "runtime" : "default_branch",
        resolvedCommit: governorAddresses._sha || null,
        key: strategy.key || null,
      },
      codeSource: entry.entry.codeSource,
    });
  }
  return implementations;
}

function deriveControllerRegistered(registrationState, legacyValue) {
  if (registrationState === "registered") return true;
  if (registrationState === "not_registered") return false;
  if (registrationState === "not_applicable") return null;
  if (typeof legacyValue === "boolean") return legacyValue;
  return null;
}

function buildVerificationStatus(entry, controllerRegistered, proxyVerification) {
  if (entry.runtimeAuthority === "controller" && controllerRegistered === true && entry.hasBytecode === true) {
    return "strong";
  }
  if (proxyVerification.applicable && proxyVerification.implementationMatchesExpected === true && entry.hasBytecode === true) {
    return "strong";
  }
  if ((entry.hasBytecode === true || entry.sourceVerified === true) && entry.addressSource?.kind && entry.addressSource.kind !== "unknown") {
    return "partial";
  }
  if (entry.addressSource?.kind && entry.addressSource.kind !== "unknown") {
    return "weak";
  }
  return "unverified";
}

function decorateEntryForOutput(entry) {
  const meta = { ...(entry.meta || {}) };
  const controllerRegistered = deriveControllerRegistered(meta.registrationState || null, meta.registeredInController);
  meta.controllerRegistered = controllerRegistered;

  const isProxyEntry = (entry.deploymentKind || entry.type) === "proxy";
  const isImplementationEntry = Boolean(meta.currentImplementation);
  const proxyAddress = isImplementationEntry ? meta.proxyAddress || null : (isProxyEntry ? entry.address : null);
  const implementationAddress = isImplementationEntry ? entry.address || null : meta.proxyTarget || null;

  const proxyVerification = {
    applicable: Boolean(isProxyEntry || isImplementationEntry || meta.proxyTarget || meta.proxyAddress),
    proxyAddress,
    controllerAddress: meta.proxyControllerAddress || null,
    controllerMatchesExpected: typeof meta.proxyControllerMatchesExpected === "boolean" ? meta.proxyControllerMatchesExpected : null,
    targetContractId: meta.proxyTargetContractId || null,
    targetContractName: meta.proxyTargetContractName || null,
    implementationAddress,
    implementationName: isImplementationEntry ? entry.canonicalName : meta.proxyTargetName || null,
    implementationVersion: meta.currentImplementationVersion || null,
    implementationSource: meta.proxyImplementationSource || null,
    expectedImplementationAddress: meta.expectedProxyImplementationAddress || null,
    expectedImplementationSource: meta.expectedProxyImplementationSource || null,
    implementationMatchesExpected: typeof meta.proxyImplementationMatchesExpected === "boolean"
      ? meta.proxyImplementationMatchesExpected
      : (meta.expectedProxyImplementationAddress && implementationAddress
        ? addressesMatch(meta.expectedProxyImplementationAddress, implementationAddress)
        : null),
    controllerCurrentProxyMatches: proxyAddress && meta.controllerResolvedAddress
      ? addressesMatch(proxyAddress, meta.controllerResolvedAddress)
      : null,
  };

  return {
    ...entry,
    controllerRegistered,
    verification: {
      status: buildVerificationStatus(entry, controllerRegistered, proxyVerification),
      lastVerifiedAt: entry.verifiedAtISO || null,
      explorer: {
        ...getExplorerProfile(entry.chain),
        addressUrl: entry.blockchainHref || null,
      },
      controller: {
        applicable: entry.runtimeAuthority === "controller",
        controllerAddress: entry.runtimeAuthority === "controller" ? CONTROLLERS[entry.chain] || null : null,
        controllerSlot: meta.controllerSlot || null,
        registrationState: meta.registrationState || null,
        controllerRegistered,
        resolvedAddress: meta.controllerResolvedAddress || null,
        currentAddressMatches: meta.controllerResolvedAddress ? addressesMatch(entry.address, meta.controllerResolvedAddress) : null,
      },
      proxy: proxyVerification,
    },
    meta,
  };
}

function buildChainPayload(entries, currentImplementations = [], historical = [], governorSha = null) {
  const decorate = (item) => {
    const entry = decorateEntryForOutput(item);
    if (entry.addressSource?.kind === "governor-manifest" && !entry.addressSource.resolvedCommit) {
      entry.addressSource.resolvedCommit = governorSha || null;
    }
    return entry;
  };
  const inventory = [...entries.map(decorate), ...currentImplementations.map(decorate)];
  const sortByCategoryThenName = (left, right) =>
    String(left.category || "").localeCompare(String(right.category || ""))
    || String(left.name || "").localeCompare(String(right.name || ""))
    || String(left.address || "").localeCompare(String(right.address || ""));
  const active = inventory.filter((entry) => entry.lifecycle === "active").sort(sortByCategoryThenName);
  const paused = inventory.filter((entry) => entry.lifecycle === "paused").sort(sortByCategoryThenName);
  const migrationResidual = inventory.filter((entry) => entry.lifecycle === "migration_residual").sort(sortByCategoryThenName);
  const legacyOperational = inventory.filter((entry) => entry.lifecycle === "legacy_operational").sort(sortByCategoryThenName);
  const historicalEntries = Array.isArray(historical) ? historical : [];
  return {
    inventory,
    current: active,
    active,
    paused,
    migration_residual: migrationResidual,
    legacy_operational: legacyOperational,
    historical: historicalEntries.map(decorate).sort(sortByCategoryThenName),
    currentImplementations: currentImplementations.map(decorate).sort(sortByCategoryThenName),
  };
}

function validateExplorerLink(entry) {
  if (!entry.blockchainHref) return null;
  const expectedHost = entry.chain === "arbitrumOne" ? "arbiscan.io" : "etherscan.io";
  const match = entry.blockchainHref.match(/^https:\/\/([^/]+)\/address\/(0x[a-fA-F0-9]{40})$/);
  if (!match) {
    return `${entry.name} has malformed explorer link ${entry.blockchainHref}`;
  }
  if (match[1] !== expectedHost) {
    return `${entry.name} uses ${match[1]} instead of ${expectedHost}`;
  }
  if (!addressesMatch(match[2], entry.address)) {
    return `${entry.name} explorer link address does not match entry address`;
  }
  return null;
}

function summarizeVerification(chainPayload) {
  const published = [
    ...chainPayload.active,
    ...chainPayload.paused,
    ...chainPayload.migration_residual,
    ...chainPayload.legacy_operational,
  ];
  return {
    total: published.length,
    bytecode: published.filter((entry) => entry.hasBytecode === true).length,
    verified: published.filter((entry) => entry.sourceVerified === true).length,
  };
}

function writeHealthChecks(checks, dryRun = false) {
  if (dryRun) return;
  fs.mkdirSync(path.dirname(HEALTH_CHECK_PATH), { recursive: true });
  fs.writeFileSync(HEALTH_CHECK_PATH, JSON.stringify({
    timestamp: new Date().toISOString(),
    checks,
  }, null, 2));
}

function writeDataFiles(data, governorSha, catalog, dryRun = false) {
  const now = new Date();
  const nowISO = now.toISOString();
  const nowFormatted = now.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  const arbSummary = summarizeVerification(data.arbitrumOne);
  const ethSummary = summarizeVerification(data.ethereumMainnet);
  const payload = {
    arbitrumOne: data.arbitrumOne,
    ethereumMainnet: data.ethereumMainnet,
    meta: {
      lastUpdated: nowISO,
      lastVerified: nowFormatted,
      sourceRepo: GOVERNOR_REPO,
      sourceCommit: governorSha,
      verificationSummary: `${arbSummary.verified}/${arbSummary.total} Arbitrum source-verified, ${ethSummary.verified}/${ethSummary.total} Mainnet source-verified`,
      bytecodeSummary: `${arbSummary.bytecode}/${arbSummary.total} Arbitrum with bytecode, ${ethSummary.bytecode}/${ethSummary.total} Mainnet with bytecode`,
      explorerUrls: EXPLORER_URLS,
      rpcUrls: DEFAULT_RPC_URLS,
      verificationModel: "contracts-proof-v2",
      watchedRepos: catalog._meta.watchedRepos,
      latestResolutionPolicy: catalog._meta.latestResolutionPolicy,
    },
  };

  if (dryRun) return payload;

  const header = `/**\n * Auto-generated by fetch-contract-addresses.js\n * Source: ${GOVERNOR_REPO} (${governorSha})\n * Last updated: ${nowISO}\n * DO NOT EDIT MANUALLY\n */\n\n`;
  const jsx = `${header}export const contractAddresses = ${JSON.stringify(payload, null, 2)};\n`;
  const jsonPayload = {
    _generated: {
      by: "fetch-contract-addresses.js",
      at: nowISO,
      source: `${GOVERNOR_REPO} (${governorSha})`,
    },
    ...payload,
  };

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.mkdirSync(path.dirname(OUTPUT_JSON_PATH), { recursive: true });
  fs.mkdirSync(path.dirname(PUBLIC_COMPANION_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, jsx);
  fs.writeFileSync(OUTPUT_JSON_PATH, JSON.stringify(jsonPayload, null, 2));
  fs.writeFileSync(PUBLIC_COMPANION_PATH, JSON.stringify(jsonPayload, null, 2));

  return payload;
}

function buildValidationReport({
  catalog,
  payload,
  branchDiffs,
  resolutions,
}) {
  const failures = [];
  const warnings = [];
  const publishedEntries = [
    ...payload.arbitrumOne.inventory,
    ...payload.ethereumMainnet.inventory,
  ];

  for (const resolution of resolutions) {
    const entry = resolution.entry;
    if (!entry.address) {
      failures.push({
        failureClass: FAILURE_CLASSES.truth,
        endpoint: "address-resolution",
        chain: entry.chain,
        contract: entry.name,
        detail: `${resolution.definition.id} did not resolve a publishable address`,
      });
    }
    if (!PUBLISHED_LIFECYCLES.has(entry.lifecycle)) {
      failures.push({
        failureClass: FAILURE_CLASSES.output,
        endpoint: "lifecycle-classification",
        chain: entry.chain,
        contract: entry.name,
        detail: `${entry.lifecycle} is not a supported lifecycle`,
      });
    }
    if (entry.codeSource && !entry.codeSource.resolvedCommit) {
      failures.push({
        failureClass: FAILURE_CLASSES.provenance,
        endpoint: "code-provenance",
        chain: entry.chain,
        contract: entry.name,
        detail: `Missing commit-specific provenance for ${entry.codeSource.repo}:${entry.codeSource.path}`,
      });
    }
  }

  const activeTargets = publishedEntries.filter((entry) => entry.lifecycle === "active" && (entry.type || entry.deploymentKind) === "target");
  if (activeTargets.length) {
    failures.push({
      failureClass: FAILURE_CLASSES.output,
      endpoint: "active-surface-leak",
      chain: "multi",
      contract: "active-output",
      detail: `Found ${activeTargets.length} target rows in the active publish surface`,
    });
  }

  for (const entry of publishedEntries) {
    if (ACTIVE_LIFECYCLES.has(entry.lifecycle) && entry.runtimeAuthority === "controller" && entry.verification?.controller?.controllerRegistered !== true) {
      failures.push({
        failureClass: FAILURE_CLASSES.truth,
        endpoint: "controller-reconciliation",
        chain: entry.chain,
        contract: entry.name,
        detail: `Controller current address does not match the published row`,
      });
    }
    if ((entry.type || entry.deploymentKind) === "proxy" && entry.lifecycle === "active" && !entry.verification?.proxy?.implementationAddress) {
      failures.push({
        failureClass: FAILURE_CLASSES.truth,
        endpoint: "proxy-runtime",
        chain: entry.chain,
        contract: entry.name,
        detail: "Active proxy row is missing a runtime-resolved implementation address",
      });
    }
    const explorerIssue = validateExplorerLink(entry);
    if (explorerIssue) {
      failures.push({
        failureClass: FAILURE_CLASSES.link,
        endpoint: "explorer-link",
        chain: entry.chain,
        contract: entry.name,
        detail: explorerIssue,
      });
    }
  }

  for (const diff of branchDiffs) {
    warnings.push({
      failureClass: FAILURE_CLASSES.branch,
      endpoint: diff.type,
      chain: null,
      contract: diff.repo,
      detail: diff.detail,
    });
  }

  return { failures, warnings, catalog, payload };
}

async function runContractsPipeline(options = {}) {
  const { dryRun = false, skipVerify = false } = options;
  const catalog = buildContractProofCatalog();
  const { addresses, sha } = await fetchGovernorAddresses();
  addresses._sha = sha;

  const previousBranchState = loadBranchWatchState();
  const nextBranchState = {
    generatedAt: new Date().toISOString(),
    repos: [],
  };
  for (const repo of WATCHED_REPOS) {
    nextBranchState.repos.push(await fetchRepoInventory(repo));
  }
  const branchDiffs = diffBranchWatchState(previousBranchState, nextBranchState);

  const resolutions = [];
  for (const definition of catalog.deployments) {
    const resolution = await resolveDeployment(definition, addresses);
    const entry = buildBaseEntry(definition, resolution);
    resolutions.push({ definition, entry, resolution });
  }

  const byChain = {
    arbitrumOne: resolutions.filter((item) => item.entry.chain === "arbitrumOne"),
    ethereumMainnet: resolutions.filter((item) => item.entry.chain === "ethereumMainnet"),
  };

  const arbVerified = await verifyAddresses(byChain.arbitrumOne.map((item) => item.entry), "arbitrumOne", skipVerify);
  const ethVerified = await verifyAddresses(byChain.ethereumMainnet.map((item) => item.entry), "ethereumMainnet", skipVerify);
  byChain.arbitrumOne = byChain.arbitrumOne.map((item, index) => ({ ...item, entry: arbVerified[index] }));
  byChain.ethereumMainnet = byChain.ethereumMainnet.map((item, index) => ({ ...item, entry: ethVerified[index] }));

  const arbEnriched = await enrichMetadata(byChain.arbitrumOne.map((item) => item.entry), skipVerify);
  const ethEnriched = await enrichMetadata(byChain.ethereumMainnet.map((item) => item.entry), skipVerify);
  byChain.arbitrumOne = byChain.arbitrumOne.map((item, index) => ({ ...item, entry: arbEnriched[index] }));
  byChain.ethereumMainnet = byChain.ethereumMainnet.map((item, index) => ({ ...item, entry: ethEnriched[index] }));

  const arbImplementations = await verifyAddresses(
    buildImplementationEntries(byChain.arbitrumOne, addresses),
    "arbitrumOne",
    skipVerify
  );
  const ethImplementations = await verifyAddresses(
    buildImplementationEntries(byChain.ethereumMainnet, addresses),
    "ethereumMainnet",
    skipVerify
  );

  const payload = {
    arbitrumOne: buildChainPayload(arbEnriched, arbImplementations, [], sha),
    ethereumMainnet: buildChainPayload(ethEnriched, ethImplementations, [], sha),
  };

  const validation = buildValidationReport({
    catalog,
    payload,
    branchDiffs,
    resolutions: [...byChain.arbitrumOne, ...byChain.ethereumMainnet],
  });
  const checks = [
    ...validation.failures.map((failure) => ({
      endpoint: failure.endpoint,
      status: "FAIL",
      detail: failure.detail,
      affects: failure.contract || failure.chain || "contracts-pipeline",
    })),
    ...validation.warnings.map((warning) => ({
      endpoint: warning.endpoint,
      status: "WARN",
      detail: warning.detail,
      affects: warning.contract || warning.chain || "contracts-pipeline",
    })),
  ];
  writeHealthChecks(checks, dryRun);

  if (validation.failures.length) {
    writeIncidentArtifacts({
      incidents: validation.failures,
      summary: {
        verificationModel: "contracts-proof-v2",
        branchWatchStatePath: path.relative(REPO_ROOT, BRANCH_WATCH_STATE_PATH),
      },
      dryRun,
    });
    const error = new Error(`${validation.failures.length} blocking validation failure(s)`);
    error.failures = validation.failures;
    throw error;
  }

  const writtenPayload = writeDataFiles(payload, sha, catalog, dryRun);
  writeBranchWatchState(nextBranchState, dryRun);
  return {
    payload: writtenPayload || payload,
    branchWatch: nextBranchState,
    warnings: validation.warnings,
    sourceCommit: sha,
  };
}

module.exports = {
  buildChainPayload,
  buildContractProofCatalog,
  computeIncidentFingerprint,
  diffBranchWatchState,
  resolveAuthority,
  resolveGovernorSeries,
  runContractsPipeline,
};
