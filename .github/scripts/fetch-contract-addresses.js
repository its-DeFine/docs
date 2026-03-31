/**
 * @script            fetch-contract-addresses
 * @type              automation
 * @concern           content
 * @niche             data/blockchain
 * @purpose           infrastructure:data-feeds
 * @description       Builds the canonical Livepeer contract registry from governor-scripts,
 *                    a governed authority catalog, on-chain/runtime verification, and
 *                    explorer enrichment. Emits grouped lifecycle data for docs pages and
 *                    widget consumers.
 * @mode              generate
 * @scope             .github/scripts, snippets/data/contract-addresses/, snippets/composables/pages/canonical/
 * @usage             node .github/scripts/fetch-contract-addresses.js [--dry-run] [--skip-verify]
 * @policy            Do not infer latest branches or current deployments from naming patterns alone.
 */

const https = require("https");
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { keccak256 } = require("js-sha3");

const REPO_ROOT = path.resolve(__dirname, "../..");
const AUTHORITY_PATH = path.join(REPO_ROOT, "operations/scripts/config/contract-addresses-authority.json");
const OUTPUT_PATH = path.join(REPO_ROOT, "snippets/data/contract-addresses/contractAddressesData.jsx");
const OUTPUT_JSON_PATH = path.join(REPO_ROOT, "snippets/data/contract-addresses/contractAddressesData.json");
const PUBLIC_COMPANION_PATH = path.join(REPO_ROOT, "snippets/composables/pages/canonical/livepeer-contract-addresses-data.json");
const HEALTH_CHECK_PATH = path.join(REPO_ROOT, "snippets/data/contract-addresses/_health-checks.json");

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";
const ARBISCAN_API_KEY = process.env.ARBISCAN_API_KEY || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
const ETHERSCAN_API_KEY_2 = process.env.ETHERSCAN_API_KEY_2 || "";
const DRY_RUN = process.argv.includes("--dry-run");
const SKIP_VERIFY = process.argv.includes("--skip-verify");
const DEBUG_PROGRESS = process.env.CONTRACTS_DEBUG_PROGRESS === "1";

const GOVERNOR_REPO = "livepeer/governor-scripts";
const GOVERNOR_FILE = "updates/addresses.js";
const CONTROLLERS = {
  arbitrumOne: "0xD8E8328501E9645d16Cf49539efC04f734606ee4",
  ethereumMainnet: "0xf96d54e490317c557a967abfa5d6e33006be69b3",
};
const EXPLORER_URLS = {
  arbiscan: "https://arbiscan.io",
  arbiscanAddress: "https://arbiscan.io/address/",
  etherscan: "https://etherscan.io",
  etherscanAddress: "https://etherscan.io/address/",
  blockscoutArbitrum: "https://arbitrum.blockscout.com",
  blockscoutEthereum: "https://eth.blockscout.com",
};
const RPC_URLS = {
  arbitrumOne: [
    "https://arb1.arbitrum.io/rpc",
    "https://arbitrum-one-rpc.publicnode.com",
    "https://arbitrum.drpc.org",
  ],
  ethereumMainnet: [
    "https://eth.llamarpc.com",
    "https://ethereum-rpc.publicnode.com",
    "https://eth.drpc.org",
  ],
};
const SOURCE_REPOS = [
  { repo: "livepeer/protocol", branch: "delta" },
  { repo: "livepeer/protocol", branch: "streamflow" },
  { repo: "livepeer/protocol", branch: "master" },
  { repo: "livepeer/arbitrum-lpt-bridge", branch: "main" },
];
const REQUEST_TIMEOUT_MS = Number.parseInt(process.env.CONTRACTS_HTTP_TIMEOUT_MS || "15000", 10) || 15000;

const ACTIVE_LIFECYCLES = new Set(["active"]);
const PUBLISHED_LIFECYCLES = new Set(["active", "paused", "migration_residual", "legacy_operational"]);

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
        "User-Agent": "livepeer-docs-bot",
        ...headers,
      },
    }, (response) => {
      let data = "";
      response.on("data", (chunk) => { data += chunk; });
      response.on("end", () => resolve({ status: response.statusCode, data }));
    });
    request.on("error", reject);
    request.on("timeout", () => {
      request.destroy(new Error(`Request timed out after ${REQUEST_TIMEOUT_MS}ms: ${url}`));
    });
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
      response.on("data", (chunk) => { data += chunk; });
      response.on("end", () => resolve({ status: response.statusCode, data }));
    });
    request.on("error", reject);
    request.on("timeout", () => {
      request.destroy(new Error(`Request timed out after ${REQUEST_TIMEOUT_MS}ms: ${url}`));
    });
    request.write(postData);
    request.end();
  });
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
  const headers = { Accept: "application/vnd.github+json" };
  if (GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
  }
  if (GITHUB_TOKEN) {
    let response = null;
    for (let attempt = 0; attempt < 3; attempt += 1) {
      response = await httpsGet(`https://api.github.com${endpoint}`, headers);
      if (response.status === 200) return response;
      if (![500, 502, 503, 504].includes(response.status)) break;
      await sleep((attempt + 1) * 250);
    }
    if (response && ![401, 403, 404, 500, 502, 503, 504].includes(response.status)) {
      return response;
    }
  }
  return githubCliGet(endpoint);
}

function loadAuthorityCatalog() {
  return JSON.parse(fs.readFileSync(AUTHORITY_PATH, "utf8"));
}

function getGovernorChain(governorAddresses, chain) {
  return chain === "arbitrumOne"
    ? (governorAddresses.arbitrumMainnet || {})
    : (governorAddresses.mainnet || {});
}

function compareVersions(left, right) {
  const l = Number(String(left || "").replace(/^V/i, "")) || 0;
  const r = Number(String(right || "").replace(/^V/i, "")) || 0;
  return l - r;
}

function resolveGovernorSeries(governorChain, prefix) {
  return Object.entries(governorChain)
    .filter(([key]) => key.startsWith(prefix))
    .map(([key, address]) => {
      const version = key.slice(prefix.length);
      if (!/^(\d+)$/.test(version)) return null;
      return { key, address, version: `V${version}` };
    })
    .filter(Boolean)
    .sort((a, b) => compareVersions(a.version, b.version));
}

function resolveAuthority(authority, governorChain) {
  if (!authority) return { address: null, version: null, authorityKind: "unknown", sourceKey: null };

  if (authority.kind === "fixed") {
    return {
      address: authority.address || null,
      version: authority.version || null,
      authorityKind: "authority-catalog",
      sourceKey: null,
    };
  }

  if (authority.kind === "governor-key") {
    const address = governorChain[authority.key] || null;
    return {
      address,
      version: authority.version || null,
      authorityKind: "governor-scripts",
      sourceKey: authority.key,
    };
  }

  if (authority.kind === "governor-versioned-latest") {
    const candidates = [];
    if (authority.baseKey && governorChain[authority.baseKey]) {
      candidates.push({
        key: authority.baseKey,
        address: governorChain[authority.baseKey],
        version: authority.baseVersion || "V1",
      });
    }
    candidates.push(...resolveGovernorSeries(governorChain, authority.prefix || ""));
    if (!candidates.length) {
      return { address: null, version: null, authorityKind: "governor-scripts", sourceKey: null };
    }
    const latest = candidates.sort((a, b) => compareVersions(a.version, b.version)).slice(-1)[0];
    return {
      address: latest.address,
      version: latest.version,
      authorityKind: "governor-scripts",
      sourceKey: latest.key,
    };
  }

  return { address: null, version: null, authorityKind: "unknown", sourceKey: null };
}

function buildRepoSrc(codeAuthority) {
  if (!codeAuthority) return null;
  return `${codeAuthority.repo}@${codeAuthority.branch}`;
}

function buildContractCodeHref(codeAuthority) {
  if (!codeAuthority) return null;
  return `https://github.com/${codeAuthority.repo}/blob/${codeAuthority.branch}/${codeAuthority.path}`;
}

function getExplorerAddressBase(chain) {
  return chain === "arbitrumOne" ? EXPLORER_URLS.arbiscanAddress : EXPLORER_URLS.etherscanAddress;
}

function getBlockscoutBase(chain) {
  return chain === "arbitrumOne" ? EXPLORER_URLS.blockscoutArbitrum : EXPLORER_URLS.blockscoutEthereum;
}

function getChainId(chain) {
  return chain === "arbitrumOne" ? 42161 : 1;
}

function keccak256Hex(value) {
  return `0x${keccak256(value)}`;
}

function buildBaseEntry(definition, resolved) {
  const blockchainHref = resolved.address ? `${getExplorerAddressBase(definition.chain)}${resolved.address}` : null;
  const runtimeKind = definition.runtimeAuthority?.kind || "explorer";
  const registrationState = runtimeKind === "controller" ? "unknown" : "not_applicable";

  return {
    id: definition.id,
    name: definition.canonicalName,
    canonicalName: definition.canonicalName,
    address: resolved.address,
    type: definition.deploymentKind,
    deploymentKind: definition.deploymentKind,
    category: definition.category,
    lifecycle: definition.lifecycle,
    chain: definition.chain,
    version: resolved.version || null,
    addressAuthority: resolved.authorityKind,
    runtimeAuthority: runtimeKind,
    repoSrc: buildRepoSrc(definition.codeAuthority),
    contractCodeHref: buildContractCodeHref(definition.codeAuthority),
    blockchainHref,
    hasBytecode: null,
    sourceVerified: null,
    verified: null,
    verifiedAt: null,
    verifiedAtISO: null,
    isHistorical: false,
    meta: {
      statusLabel: definition.statusLabel || null,
      deployedBy: null,
      notes: definition.notes || null,
      holderCount: null,
      transactionCount: null,
      deployedAt: null,
      lastActiveDate: null,
      blockscoutLabel: null,
      keccakHash: keccak256Hex(definition.canonicalName),
      registrationState,
      registeredInController: runtimeKind === "controller" ? null : false,
      controllerSlot: definition.runtimeAuthority?.controllerSlot || null,
      controllerResolvedAddress: null,
      addressAuthority: resolved.authorityKind,
      governorKey: resolved.sourceKey || null,
      currentImplementation: false,
      currentImplementationVersion: null,
      proxyTarget: null,
      repoIsPrivate: null,
    },
  };
}

async function fetchGovernorAddresses() {
  const response = await githubGet(`/repos/${GOVERNOR_REPO}/contents/${GOVERNOR_FILE}`);
  if (response.status !== 200) {
    throw new Error(`Unable to fetch ${GOVERNOR_REPO}/${GOVERNOR_FILE}: ${String(response.data).slice(0, 200)}`);
  }

  const json = JSON.parse(response.data);
  const content = Buffer.from(json.content, "base64").toString("utf8");
  const sha = json.sha.substring(0, 7);
  const match = content.match(/const ADDRESSES\s*=\s*(\{[\s\S]*?\});/);
  if (!match) throw new Error("Could not parse ADDRESSES from governor-scripts");

  let addresses;
  try {
    addresses = new Function(`return ${match[1]}`)();
  } catch (error) {
    throw new Error(`Failed to evaluate governor ADDRESSES: ${error.message}`);
  }

  return { addresses, sha };
}

function resolveDeployments(catalog, governorAddresses) {
  return catalog.deployments.map((definition) => {
    const governorChain = getGovernorChain(governorAddresses, definition.chain);
    const resolved = resolveAuthority(definition.addressAuthority, governorChain);
    return {
      definition,
      resolved,
      entry: buildBaseEntry(definition, resolved),
    };
  });
}

async function verifyAddresses(entries, chain) {
  if (SKIP_VERIFY) {
    return entries.map((entry) => ({
      ...entry,
      hasBytecode: null,
      sourceVerified: null,
      verified: null,
      verifiedAt: null,
      verifiedAtISO: null,
    }));
  }

  const isArbitrum = chain === "arbitrumOne";
  const baseUrl = isArbitrum ? "https://api.arbiscan.io" : "https://api.etherscan.io";
  const apiKey = isArbitrum ? ARBISCAN_API_KEY : ETHERSCAN_API_KEY;
  const now = new Date();
  const nowFormatted = now.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  const nowISO = now.toISOString();

  const results = [];
  for (const entry of entries) {
    if (!entry.address) {
      results.push(entry);
      continue;
    }

    let url = `${baseUrl}/api?module=proxy&action=eth_getCode&address=${entry.address}&tag=latest`;
    if (apiKey) url += `&apikey=${apiKey}`;

    try {
      const response = await httpsGet(url);
      const data = JSON.parse(response.data);
      const hasBytecode = Boolean(data.result && data.result !== "0x" && data.result.length > 2);
      results.push({
        ...entry,
        hasBytecode,
        verifiedAt: nowFormatted,
        verifiedAtISO: nowISO,
      });
    } catch (_error) {
      results.push({
        ...entry,
        hasBytecode: false,
        verifiedAt: nowFormatted,
        verifiedAtISO: nowISO,
      });
    }

    await sleep(apiKey ? 100 : 250);
  }

  return results;
}

async function checkApiHealth(blockscoutBase, etherscanV2Base) {
  const health = { blockscout: false, etherscan: false, apiVersions: {} };

  try {
    const probe = await httpsGet(`${blockscoutBase}/api/v2/addresses/${CONTROLLERS.arbitrumOne}`);
    if (probe.status === 200) {
      health.blockscout = true;
      health.apiVersions.blockscout = "v2";
    }
  } catch (_error) {}

  try {
    const probe = await httpsGet(`${etherscanV2Base}?chainid=1&module=stats&action=ethprice`);
    if (probe.status === 200) {
      health.etherscan = true;
      health.apiVersions.etherscan = "v2";
    }
  } catch (_error) {}

  return health;
}

async function enrichFromBlockscout(address, blockscoutBase, apiKey, chain, entry = {}) {
  const meta = {};
  const formatFullDate = (value) => new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

  const addressResponse = await httpsGet(`${blockscoutBase}/api/v2/addresses/${address}`);
  if (addressResponse.status !== 200) {
    throw new Error(`Blockscout address lookup failed: ${addressResponse.status}`);
  }
  const addressData = JSON.parse(addressResponse.data);

  if (addressData.name) meta.blockscoutLabel = addressData.name;
  if (addressData.creator_address_hash) meta.creatorAddress = addressData.creator_address_hash;
  if (addressData.is_verified !== undefined) meta.bsVerified = addressData.is_verified;
  if (addressData.is_contract !== undefined) meta.isContract = addressData.is_contract;
  if (addressData.coin_balance) meta.balance = addressData.coin_balance;
  if (addressData.proxy_type) meta.isProxy = true;
  if (addressData.implementations?.length) {
    meta.proxyTarget = addressData.implementations[0].address;
    meta.proxyTargetName = addressData.implementations[0].name || null;
  }
  await sleep(125);

  if (addressData.creation_transaction_hash) {
    try {
      const transactionResponse = await httpsGet(`${blockscoutBase}/api/v2/transactions/${addressData.creation_transaction_hash}`);
      if (transactionResponse.status === 200) {
        const transactionData = JSON.parse(transactionResponse.data);
        if (transactionData.timestamp) {
          meta.deployedAt = formatFullDate(transactionData.timestamp);
          meta.deployedAtISO = new Date(transactionData.timestamp).toISOString();
        }
      }
    } catch (_error) {}
  }
  await sleep(125);

  if (entry.canonicalName === "LivepeerToken") {
    try {
      const tokenResponse = await httpsGet(`${blockscoutBase}/api/v2/tokens/${address}`);
      if (tokenResponse.status === 200) {
        const tokenData = JSON.parse(tokenResponse.data);
        const holders = tokenData.holders_count || tokenData.holders;
        if (holders) meta.holderCount = Number(holders).toLocaleString("en-GB");
        if (tokenData.total_supply) meta.totalSupply = tokenData.total_supply;
        if (tokenData.decimals) meta.decimals = tokenData.decimals;
        if (tokenData.symbol) meta.symbol = tokenData.symbol;
      }
    } catch (_error) {}
    await sleep(125);
  }

  if (entry.lifecycle === "active") {
    try {
      const transactionsResponse = await httpsGet(`${blockscoutBase}/api/v2/addresses/${address}/transactions`);
      if (transactionsResponse.status === 200) {
        const transactionsData = JSON.parse(transactionsResponse.data);
        const latest = transactionsData.items?.find((item) => item.timestamp);
        if (latest) {
          meta.lastActiveDate = formatFullDate(latest.timestamp);
          meta.lastActiveDateISO = new Date(latest.timestamp).toISOString();
        }
      }
    } catch (_error) {}
    await sleep(125);
  }

  try {
    const smartContractResponse = await httpsGet(`${blockscoutBase}/api/v2/smart-contracts/${address}`);
    if (smartContractResponse.status === 200) {
      const smartContractData = JSON.parse(smartContractResponse.data);
      if (smartContractData.compiler_version) meta.compilerVersion = smartContractData.compiler_version;
      if (smartContractData.optimization_enabled !== undefined) meta.optimizationEnabled = smartContractData.optimization_enabled;
      if (smartContractData.language) meta.language = smartContractData.language;
      if (smartContractData.verified_at) meta.sourceVerifiedAt = formatFullDate(smartContractData.verified_at);
    }
  } catch (_error) {}
  await sleep(125);

  return meta;
}

async function enrichFromEtherscan(address, chain, apiKey, entry) {
  if (!apiKey) return {};
  const meta = {};
  const chainId = getChainId(chain);
  const base = `https://api.etherscan.io/v2/api?chainid=${chainId}`;
  const formatMonthYear = (timestampSeconds) => {
    const ts = Number(timestampSeconds) * 1000;
    return new Date(ts).toLocaleDateString("en-GB", { month: "short", year: "numeric" });
  };

  try {
    const deployedResponse = await httpsGet(`${base}&module=account&action=txlist&address=${address}&page=1&offset=1&sort=asc&startblock=0&endblock=99999999&apikey=${apiKey}`);
    const deployedData = JSON.parse(deployedResponse.data);
    if (deployedData.status === "1" && deployedData.result?.[0]?.timeStamp) {
      meta.deployedAt = formatMonthYear(deployedData.result[0].timeStamp);
    }
  } catch (_error) {}
  await sleep(150);

  try {
    const lastActiveResponse = await httpsGet(`${base}&module=account&action=txlist&address=${address}&page=1&offset=1&sort=desc&startblock=0&endblock=99999999&apikey=${apiKey}`);
    const lastActiveData = JSON.parse(lastActiveResponse.data);
    if (lastActiveData.status === "1" && lastActiveData.result?.[0]?.timeStamp) {
      meta.lastActiveDate = formatMonthYear(lastActiveData.result[0].timeStamp);
    }
  } catch (_error) {}
  await sleep(150);

  try {
    const transactionCountResponse = await httpsGet(`${base}&module=proxy&action=eth_getTransactionCount&address=${address}&tag=latest&apikey=${apiKey}`);
    const transactionCountData = JSON.parse(transactionCountResponse.data);
    if (transactionCountData.result) {
      meta.transactionCount = parseInt(transactionCountData.result, 16);
    }
  } catch (_error) {}
  await sleep(150);

  if (entry.canonicalName === "LivepeerToken") {
    try {
      const tokenInfoResponse = await httpsGet(`${base}&module=token&action=tokeninfo&contractaddress=${address}&apikey=${apiKey}`);
      const tokenInfoData = JSON.parse(tokenInfoResponse.data);
      if (tokenInfoData.status === "1" && tokenInfoData.result?.[0]) {
        const holders = tokenInfoData.result[0].holdersCount || tokenInfoData.result[0].holders;
        if (holders) meta.holderCount = Number(holders).toLocaleString("en-GB");
      }
    } catch (_error) {}
    await sleep(150);
  }

  try {
    const sourceCodeResponse = await httpsGet(`${base}&module=contract&action=getsourcecode&address=${address}&apikey=${apiKey}`);
    const sourceCodeData = JSON.parse(sourceCodeResponse.data);
    if (sourceCodeData.status === "1" && sourceCodeData.result?.[0]) {
      const contractData = sourceCodeData.result[0];
      if (contractData.Proxy === "1" && contractData.Implementation) meta.proxyTarget = contractData.Implementation;
      if (contractData.CompilerVersion) meta.compilerVersion = contractData.CompilerVersion;
      if (contractData.ContractName) meta.blockscoutLabel = contractData.ContractName;
      meta.esVerified = Boolean(contractData.SourceCode);
    }
  } catch (_error) {}
  await sleep(150);

  return meta;
}

function loadPreviousData() {
  const backupPath = `${OUTPUT_PATH}.bak`;
  try {
    if (!fs.existsSync(backupPath)) return null;
    const content = fs.readFileSync(backupPath, "utf8");
    const match = content.match(/export const contractAddresses\s*=\s*(\{[\s\S]*\});?\s*$/);
    if (!match) return null;
    return new Function(`return ${match[1]}`)();
  } catch (_error) {
    return null;
  }
}

async function enrichMetadata(resolvedDeployments, chain) {
  const isArbitrum = chain === "arbitrumOne";
  const label = isArbitrum ? "Arbitrum" : "Ethereum";
  const blockscoutBase = getBlockscoutBase(chain);
  const etherscanBase = "https://api.etherscan.io/v2/api";
  const apiKey = ETHERSCAN_API_KEY || ETHERSCAN_API_KEY_2 || ARBISCAN_API_KEY || "";
  const shouldUseExplorers = !SKIP_VERIFY;
  const previousData = loadPreviousData();
  const previousEntries = previousData?.[chain]?.inventory || previousData?.[chain]?.current || [];
  const previousByAddress = new Map(previousEntries.map((entry) => [String(entry.address || "").toLowerCase(), entry]));

  const health = shouldUseExplorers
    ? await checkApiHealth(blockscoutBase, etherscanBase)
    : { blockscout: false, etherscan: false, apiVersions: null };
  console.log(
    shouldUseExplorers
      ? `  ${label} enrichment: Blockscout ${health.blockscout ? "UP" : "DOWN"}, Etherscan ${health.etherscan ? "UP" : "DOWN"}`
      : `  ${label} enrichment: explorer verification skipped, controller reconciliation only`
  );

  const results = [];
  const warnings = [];

  for (const resolved of resolvedDeployments) {
    const entry = { ...resolved.entry, meta: { ...resolved.entry.meta } };
    if (DEBUG_PROGRESS) {
      console.log(`    ${label}: ${entry.name} (${entry.address || "unresolved"})`);
    }
    if (!entry.address) {
      warnings.push({ contract: entry.name, address: null, source: "authority", error: "Missing resolved address" });
      results.push(entry);
      continue;
    }

    let blockscoutMeta = {};
    let etherscanMeta = {};

    if (shouldUseExplorers && health.blockscout) {
      try {
        blockscoutMeta = await enrichFromBlockscout(entry.address, blockscoutBase, apiKey, chain, entry);
      } catch (error) {
        warnings.push({ contract: entry.name, address: entry.address, source: "blockscout", error: error.message });
      }
    }

    if (shouldUseExplorers && !health.blockscout && health.etherscan && apiKey) {
      try {
        etherscanMeta = await enrichFromEtherscan(entry.address, chain, apiKey, resolved.definition);
      } catch (error) {
        warnings.push({ contract: entry.name, address: entry.address, source: "etherscan", error: error.message });
      }
    }

    const mergedMeta = { ...entry.meta };
    for (const [key, value] of Object.entries(blockscoutMeta)) {
      if (value != null) mergedMeta[key] = value;
    }
    for (const [key, value] of Object.entries(etherscanMeta)) {
      if (value != null && mergedMeta[key] == null) mergedMeta[key] = value;
    }

    if (resolved.definition.runtimeAuthority?.kind === "controller" && resolved.definition.runtimeAuthority.controllerSlot) {
      try {
        const slotName = resolved.definition.runtimeAuthority.controllerSlot;
        const calldata = `0xe16c7d98${keccak256(slotName)}`;
        let resolvedAddress = null;
        for (const rpcUrl of RPC_URLS[chain]) {
          try {
            const rpcResponse = await httpsPost(rpcUrl, JSON.stringify({
              jsonrpc: "2.0",
              method: "eth_call",
              params: [{ to: CONTROLLERS[chain], data: calldata }, "latest"],
              id: 1,
            }));
            const rpcData = JSON.parse(rpcResponse.data);
            if (rpcData.result && rpcData.result !== "0x" && rpcData.result.length >= 42) {
              resolvedAddress = `0x${rpcData.result.slice(-40)}`;
              break;
            }
          } catch (_error) {}
        }

        mergedMeta.controllerResolvedAddress = resolvedAddress;
        const matches = Boolean(resolvedAddress && resolvedAddress.toLowerCase() === entry.address.toLowerCase());
        mergedMeta.registrationState = matches ? "registered" : "not_registered";
        mergedMeta.registeredInController = matches;
      } catch (_error) {
        mergedMeta.registrationState = "unknown";
        mergedMeta.registeredInController = null;
      }
    } else {
      mergedMeta.registrationState = "not_applicable";
      mergedMeta.registeredInController = false;
    }

    if (resolved.definition.codeAuthority) {
      mergedMeta.repoIsPrivate = false;
    } else {
      mergedMeta.repoIsPrivate = null;
    }

    const previous = previousByAddress.get(entry.address.toLowerCase());
    if (previous?.meta) {
      for (const [key, oldValue] of Object.entries(previous.meta)) {
        if (oldValue != null && mergedMeta[key] == null) {
          mergedMeta[key] = oldValue;
          mergedMeta._stale = mergedMeta._stale || [];
          if (!mergedMeta._stale.includes(key)) mergedMeta._stale.push(key);
        }
      }
    }

    const sourceVerified = typeof mergedMeta.bsVerified === "boolean"
      ? mergedMeta.bsVerified
      : Boolean(mergedMeta.esVerified);
    const hasBytecode = entry.hasBytecode != null
      ? entry.hasBytecode
      : (typeof mergedMeta.isContract === "boolean" ? mergedMeta.isContract : null);

    results.push({
      ...entry,
      hasBytecode,
      sourceVerified,
      verified: sourceVerified,
      meta: mergedMeta,
    });
  }

  results._warnings = warnings;
  results._apiVersions = health.apiVersions;
  return results;
}

function resolveCurrentImplementationAddress(strategy, proxyEntry, governorChain) {
  if (!strategy) return { address: null, version: null, source: null };

  if (strategy.kind === "proxy-meta") {
    if (proxyEntry?.meta?.proxyTarget) {
      return {
        address: proxyEntry.meta.proxyTarget,
        version: proxyEntry.meta.currentImplementationVersion || null,
        source: "proxy-meta",
      };
    }
    if (strategy.fallbackAuthority) {
      const fallback = resolveAuthority(strategy.fallbackAuthority, governorChain);
      return {
        address: fallback.address,
        version: fallback.version || null,
        source: fallback.authorityKind,
      };
    }
    return { address: null, version: null, source: null };
  }

  const resolved = resolveAuthority(strategy, governorChain);
  return {
    address: resolved.address,
    version: resolved.version || null,
    source: resolved.authorityKind,
  };
}

function buildImplementationEntry(definition, proxyEntry, governorChain) {
  const resolved = resolveCurrentImplementationAddress(definition.currentImplementationStrategy, proxyEntry, governorChain);
  if (!resolved.address) return null;

  const codeAuthority = definition.codeAuthority;
  return {
    id: `${definition.id}.implementation`,
    name: definition.canonicalName,
    canonicalName: definition.canonicalName,
    address: resolved.address,
    type: "target",
    deploymentKind: "target",
    category: definition.category,
    lifecycle: "historical",
    chain: definition.chain,
    version: resolved.version || null,
    addressAuthority: resolved.source || "proxy-meta",
    runtimeAuthority: "explorer",
    repoSrc: buildRepoSrc(codeAuthority),
    contractCodeHref: buildContractCodeHref(codeAuthority),
    blockchainHref: `${getExplorerAddressBase(definition.chain)}${resolved.address}`,
    hasBytecode: null,
    sourceVerified: null,
    verified: null,
    verifiedAt: null,
    verifiedAtISO: null,
    isHistorical: true,
    meta: {
      statusLabel: "Current implementation",
      deployedBy: null,
      notes: "Current implementation behind the published proxy address.",
      holderCount: null,
      transactionCount: null,
      deployedAt: null,
      lastActiveDate: null,
      blockscoutLabel: null,
      keccakHash: keccak256Hex(definition.canonicalName),
      registrationState: "not_applicable",
      registeredInController: false,
      controllerSlot: definition.runtimeAuthority?.controllerSlot || null,
      controllerResolvedAddress: null,
      addressAuthority: resolved.source || "proxy-meta",
      governorKey: definition.currentImplementationStrategy?.key || null,
      currentImplementation: true,
      currentImplementationVersion: resolved.version || null,
      proxyAddress: proxyEntry.address,
      repoIsPrivate: null,
    },
  };
}

function buildImplementationDefinitions(enrichedDeployments, catalog, governorAddresses) {
  const definitionsById = new Map(catalog.deployments.map((deployment) => [deployment.id, deployment]));
  const implementations = [];

  for (const entry of enrichedDeployments) {
    const definition = definitionsById.get(entry.id);
    if (!definition?.currentImplementationStrategy) continue;

    const governorChain = getGovernorChain(governorAddresses, definition.chain);
    const implementation = buildImplementationEntry(definition, entry, governorChain);
    if (implementation) implementations.push({ definition, entry: implementation });
  }

  return implementations;
}

function resolveHistorySources(strategy, governorChain) {
  const rows = [];

  for (const source of strategy.sources || []) {
    if (source.kind === "fixed") {
      rows.push({ version: source.version || null, address: source.address });
      continue;
    }

    if (source.kind === "governor-key") {
      const address = governorChain[source.key];
      if (address) rows.push({ version: source.version || null, address });
      continue;
    }

    if (source.kind === "governor-series") {
      rows.push(...resolveGovernorSeries(governorChain, source.prefix).map((item) => ({
        version: item.version,
        address: item.address,
      })));
    }
  }

  return rows;
}

function buildHistoricalGroups(catalog, resolvedDeployments, implementationEntries, governorAddresses) {
  const byChain = { arbitrumOne: {}, ethereumMainnet: {} };
  const implementationByDefinitionId = new Map(
    implementationEntries.map(({ definition, entry }) => [definition.id, entry])
  );

  for (const resolved of resolvedDeployments) {
    const { definition, entry } = resolved;
    if (!definition.historyStrategy) continue;

    const governorChain = getGovernorChain(governorAddresses, definition.chain);
    const rows = resolveHistorySources(definition.historyStrategy, governorChain);
    const implementationEntry = implementationByDefinitionId.get(definition.id);
    const excludeAddress = definition.historyStrategy.excludeResolvedCurrent
      ? new Set([String(entry.address || "").toLowerCase(), String(implementationEntry?.address || "").toLowerCase()])
      : new Set();

    const deduped = rows
      .filter((row) => row.address)
      .filter((row) => !excludeAddress.has(String(row.address).toLowerCase()))
      .reduce((acc, row) => {
        const key = String(row.address).toLowerCase();
        if (!acc.seen.has(key)) {
          acc.seen.add(key);
          acc.rows.push(row);
        }
        return acc;
      }, { seen: new Set(), rows: [] })
      .rows
      .sort((left, right) => compareVersions(left.version, right.version));

    if (deduped.length) {
      byChain[definition.chain][definition.historyStrategy.group] = {
        note: null,
        entries: deduped,
      };
    }
  }

  for (const group of catalog.historicalOnlyGroups || []) {
    byChain[group.chain][group.group] = {
      note: null,
      entries: resolveHistorySources({ sources: group.sources || [] }, getGovernorChain(governorAddresses, group.chain))
        .filter((row) => row.address)
        .sort((left, right) => compareVersions(left.version, right.version)),
    };
  }

  return byChain;
}

async function enrichHistoricalGroups(historical, chain) {
  if (SKIP_VERIFY || !historical || !Object.keys(historical).length) return historical;

  const blockscoutBase = getBlockscoutBase(chain);
  const explorerBase = getExplorerAddressBase(chain);
  const formatDate = (value) => new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

  for (const group of Object.values(historical)) {
    const entries = group.entries || [];
    for (let index = 0; index < entries.length; index += 1) {
      const entry = entries[index];
      if (DEBUG_PROGRESS) {
        console.log(`    ${chain} historical: ${entry.address}`);
      }
      try {
        const addressResponse = await httpsGet(`${blockscoutBase}/api/v2/addresses/${entry.address}`);
        if (addressResponse.status === 200) {
          const addressData = JSON.parse(addressResponse.data);
          entry.verified = Boolean(addressData.is_verified);
          entry.blockchainHref = `${explorerBase}${entry.address}`;
          if (addressData.name) entry.blockscoutLabel = addressData.name;
          if (addressData.creator_address_hash) entry.creatorAddress = addressData.creator_address_hash;

          if (addressData.creation_transaction_hash) {
            try {
              const transactionResponse = await httpsGet(`${blockscoutBase}/api/v2/transactions/${addressData.creation_transaction_hash}`);
              if (transactionResponse.status === 200) {
                const transactionData = JSON.parse(transactionResponse.data);
                if (transactionData.timestamp) entry.deployedAt = formatDate(transactionData.timestamp);
              }
            } catch (_error) {}
          }
        }
      } catch (_error) {}

      entry.replacedBy = index < entries.length - 1 ? entries[index + 1].version : "current";
      await sleep(175);
    }
  }

  return historical;
}

async function enrichImplementationEntries(entries, chain) {
  if (!entries.length) return entries;
  if (DEBUG_PROGRESS) {
    console.log(`  ${chain} implementations: ${entries.length}`);
  }
  const wrapped = entries.map((entry) => ({
    definition: {
      chain,
      canonicalName: entry.canonicalName,
      runtimeAuthority: { kind: "explorer" },
      codeAuthority: entry.repoSrc
        ? (() => {
            const [repo, branch] = entry.repoSrc.split("@");
            return { repo, branch, path: entry.contractCodeHref.split(`/blob/${branch}/`)[1] };
          })()
        : null,
    },
    entry,
  }));

  const verified = await verifyAddresses(entries, chain);
  const verifiedWrapped = wrapped.map((item, index) => ({ ...item, entry: verified[index] }));
  const enriched = await enrichMetadata(verifiedWrapped, chain);
  return enriched.map((entry) => ({
    ...entry,
    isHistorical: true,
    meta: {
      ...entry.meta,
      currentImplementation: true,
    },
  }));
}

function buildChainPayload(entries, currentImplementations, historical) {
  const inventory = [...entries, ...currentImplementations];
  const sortByCategoryThenName = (left, right) =>
    left.category.localeCompare(right.category) || left.name.localeCompare(right.name) || left.address.localeCompare(right.address);

  const active = inventory.filter((entry) => entry.lifecycle === "active").sort(sortByCategoryThenName);
  const paused = inventory.filter((entry) => entry.lifecycle === "paused").sort(sortByCategoryThenName);
  const migrationResidual = inventory.filter((entry) => entry.lifecycle === "migration_residual").sort(sortByCategoryThenName);
  const legacyOperational = inventory.filter((entry) => entry.lifecycle === "legacy_operational").sort(sortByCategoryThenName);

  return {
    inventory,
    current: active,
    active,
    paused,
    migration_residual: migrationResidual,
    legacy_operational: legacyOperational,
    currentImplementations: currentImplementations.sort(sortByCategoryThenName),
    historical,
  };
}

function extractWarnings(...collections) {
  return collections.flatMap((collection) => collection?._warnings || []);
}

function summarizeVerification(chainPayload) {
  const published = [
    ...chainPayload.active,
    ...chainPayload.paused,
    ...chainPayload.migration_residual,
    ...chainPayload.legacy_operational,
  ];
  const bytecode = published.filter((entry) => entry.hasBytecode === true).length;
  const verified = published.filter((entry) => entry.sourceVerified === true).length;
  return { total: published.length, bytecode, verified };
}

function writeDataFiles(data, governorSha, catalog) {
  const now = new Date();
  const nowISO = now.toISOString();
  const nowFormatted = now.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  const arbSummary = summarizeVerification(data.arbitrumOne);
  const ethSummary = summarizeVerification(data.ethereumMainnet);

  let header = "";
  if (fs.existsSync(OUTPUT_PATH)) {
    const existing = fs.readFileSync(OUTPUT_PATH, "utf8");
    const exportIndex = existing.indexOf("export const contractAddresses");
    if (exportIndex > 0) {
      header = existing.slice(0, exportIndex);
    }
  }
  if (!header.trim()) {
    header = `/**\n * Auto-generated by fetch-contract-addresses.js\n * Source: ${GOVERNOR_REPO} (commit ${governorSha})\n * Last updated: ${nowISO}\n * DO NOT EDIT MANUALLY\n */\n\n`;
  }

  const payload = {
    arbitrumOne: data.arbitrumOne,
    ethereumMainnet: data.ethereumMainnet,
    meta: {
      lastUpdated: nowISO,
      lastVerified: SKIP_VERIFY ? null : nowFormatted,
      sourceRepo: GOVERNOR_REPO,
      sourceCommit: governorSha,
      authorityCatalog: "operations/scripts/config/contract-addresses-authority.json",
      verificationSummary: SKIP_VERIFY
        ? "Verification skipped"
        : `${arbSummary.verified}/${arbSummary.total} Arbitrum source-verified, ${ethSummary.verified}/${ethSummary.total} Mainnet source-verified`,
      bytecodeSummary: `${arbSummary.bytecode}/${arbSummary.total} Arbitrum with bytecode, ${ethSummary.bytecode}/${ethSummary.total} Mainnet with bytecode`,
      explorerUrls: EXPLORER_URLS,
      rpcUrls: RPC_URLS,
      latestResolutionPolicy: catalog._meta?.latestResolutionPolicy || [],
      _warnings: extractWarnings(
        data.arbitrumOne.inventory,
        data.arbitrumOne.currentImplementations,
        data.ethereumMainnet.inventory,
        data.ethereumMainnet.currentImplementations
      ),
    },
  };

  const jsx = `${header}export const contractAddresses = ${JSON.stringify(payload, null, 2)};\n`;
  const jsonPayload = {
    _generated: {
      by: "fetch-contract-addresses.js",
      at: nowISO,
      source: `${GOVERNOR_REPO} (${governorSha})`,
    },
    ...payload,
  };

  if (DRY_RUN) {
    console.log(`\n[DRY RUN] Would write ${OUTPUT_PATH}`);
    return payload;
  }

  if (fs.existsSync(OUTPUT_PATH)) {
    fs.copyFileSync(OUTPUT_PATH, `${OUTPUT_PATH}.bak`);
  }

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.mkdirSync(path.dirname(OUTPUT_JSON_PATH), { recursive: true });
  fs.mkdirSync(path.dirname(PUBLIC_COMPANION_PATH), { recursive: true });

  fs.writeFileSync(OUTPUT_PATH, jsx);
  fs.writeFileSync(OUTPUT_JSON_PATH, JSON.stringify(jsonPayload, null, 2));
  fs.writeFileSync(PUBLIC_COMPANION_PATH, JSON.stringify(jsonPayload, null, 2));

  console.log(`\nWritten ${OUTPUT_PATH}`);
  console.log(`Written ${OUTPUT_JSON_PATH}`);
  console.log(`Written ${PUBLIC_COMPANION_PATH}`);

  return payload;
}

async function validateSourceLinks(entries) {
  const issues = [];

  for (const entry of entries) {
    if (!entry.contractCodeHref) continue;
    const match = entry.contractCodeHref.match(/github\.com\/([^/]+\/[^/]+)\/blob\/([^/]+)\/(.+)$/);
    if (!match) {
      issues.push({ type: "malformed-source-link", contract: entry.name, detail: entry.contractCodeHref });
      continue;
    }

    const [, repo, branch, filePath] = match;
    const response = await githubGet(`/repos/${repo}/contents/${filePath}?ref=${branch}`);
    if (response.status !== 200) {
      issues.push({
        type: "broken-source-link",
        contract: entry.name,
        detail: `${repo}@${branch}:${filePath} returned ${response.status}`,
      });
    }
    await sleep(75);
  }

  return issues;
}

async function validateData(resolvedDeployments, payload) {
  const failures = [];
  const warnings = [];
  const publishedEntries = [
    ...payload.arbitrumOne.inventory,
    ...payload.ethereumMainnet.inventory,
  ];

  for (const resolved of resolvedDeployments) {
    if (!resolved.entry.address) {
      failures.push({ endpoint: "Authority resolution", status: "FAIL", detail: `${resolved.definition.id} did not resolve an address`, affects: "Generator output" });
    }
    if (!PUBLISHED_LIFECYCLES.has(resolved.definition.lifecycle)) {
      failures.push({ endpoint: "Lifecycle classification", status: "FAIL", detail: `${resolved.definition.id} has unsupported lifecycle ${resolved.definition.lifecycle}`, affects: "Lifecycle grouping" });
    }
  }

  const seenActive = new Set();
  for (const entry of publishedEntries.filter((candidate) => ACTIVE_LIFECYCLES.has(candidate.lifecycle))) {
    const key = `${entry.chain}:${entry.canonicalName}:${entry.deploymentKind}`;
    if (seenActive.has(key)) {
      failures.push({ endpoint: "Duplicate active rows", status: "FAIL", detail: `${key} appears more than once`, affects: "Main searchable table and widget" });
    }
    seenActive.add(key);
  }

  for (const entry of publishedEntries) {
    if (!/^0x[a-fA-F0-9]{40}$/.test(String(entry.address || ""))) {
      failures.push({ endpoint: "Address format", status: "FAIL", detail: `${entry.name} on ${entry.chain} has invalid address ${entry.address}`, affects: "Published registry" });
    }
    if (entry.blockchainHref && !/^https:\/\/(arbiscan\.io|etherscan\.io)\/address\/0x[a-fA-F0-9]{40}$/.test(entry.blockchainHref)) {
      failures.push({ endpoint: "Explorer link", status: "FAIL", detail: `${entry.name} has malformed explorer link ${entry.blockchainHref}`, affects: "Page links and widget" });
    }
    if (entry.deploymentKind === "target" && entry.lifecycle === "active") {
      failures.push({ endpoint: "Lifecycle contract", status: "FAIL", detail: `${entry.name} target is incorrectly marked active`, affects: "Active-only table" });
    }
    if (entry.runtimeAuthority === "controller" && entry.lifecycle === "active" && entry.meta.registrationState !== "registered") {
      failures.push({
        endpoint: "Controller reconciliation",
        status: "FAIL",
        detail: `${entry.name} expected controller registration but got ${entry.meta.registrationState}`,
        affects: "Canonical current address accuracy",
      });
    }
  }

  const sourceIssues = await validateSourceLinks(publishedEntries);
  failures.push(...sourceIssues.map((issue) => ({
    endpoint: "Source validation",
    status: "FAIL",
    detail: `${issue.contract}: ${issue.detail}`,
    affects: "GitHub source links",
  })));

  const widgetActiveTargets = publishedEntries.filter((entry) => entry.lifecycle === "active" && entry.deploymentKind === "target");
  if (widgetActiveTargets.length) {
    failures.push({
      endpoint: "Widget active set",
      status: "FAIL",
      detail: `Found ${widgetActiveTargets.length} active target rows`,
      affects: "ContractVerifier lookup dropdown",
    });
  }

  return { failures, warnings };
}

async function runHealthCheck(payload) {
  const checks = [];
  const lpt = payload.arbitrumOne.active.find((entry) => entry.canonicalName === "LivepeerToken");
  const bondingManager = payload.arbitrumOne.active.find((entry) => entry.canonicalName === "BondingManager" && entry.deploymentKind === "proxy");

  try {
    const response = await httpsGet(`${EXPLORER_URLS.blockscoutArbitrum}/api/v2/addresses/${lpt.address}`);
    if (response.status === 200) {
      const data = JSON.parse(response.data);
      const required = ["is_contract", "is_verified", "name", "creator_address_hash"];
      const missing = required.filter((field) => !(field in data));
      if (missing.length) {
        checks.push({ endpoint: "Blockscout API shape", status: "FAIL", detail: `Missing fields: ${missing.join(", ")}`, affects: "Explorer enrichment and widget verify mode" });
      }
    } else {
      checks.push({ endpoint: "Blockscout API shape", status: "FAIL", detail: `HTTP ${response.status}`, affects: "Explorer enrichment and widget verify mode" });
    }
  } catch (error) {
    checks.push({ endpoint: "Blockscout API shape", status: "FAIL", detail: error.message, affects: "Explorer enrichment and widget verify mode" });
  }

  try {
    const calldata = `0xe16c7d98${keccak256("BondingManager")}`;
    const rpcResponse = await httpsPost(RPC_URLS.arbitrumOne[0], JSON.stringify({
      jsonrpc: "2.0",
      method: "eth_call",
      params: [{ to: CONTROLLERS.arbitrumOne, data: calldata }, "latest"],
      id: 1,
    }));
    const rpcData = JSON.parse(rpcResponse.data);
    const returned = rpcData.result && rpcData.result.length >= 42 ? `0x${rpcData.result.slice(-40)}` : null;
    if (!returned || returned.toLowerCase() !== bondingManager.address.toLowerCase()) {
      checks.push({ endpoint: "Controller eth_call", status: "FAIL", detail: `Controller returned ${returned || "null"} for BondingManager`, affects: "Current controller-managed addresses" });
    }
  } catch (error) {
    checks.push({ endpoint: "Controller eth_call", status: "FAIL", detail: error.message, affects: "Current controller-managed addresses" });
  }

  const activeEntries = [...payload.arbitrumOne.active, ...payload.ethereumMainnet.active];
  const missingHashes = activeEntries.filter((entry) => !entry.meta?.keccakHash);
  if (missingHashes.length) {
    checks.push({ endpoint: "Widget lookup fields", status: "FAIL", detail: `${missingHashes.length} active entries missing keccakHash`, affects: "ContractVerifier lookup mode" });
  }

  const unresolvedControllerRows = payload.arbitrumOne.active.filter((entry) => entry.runtimeAuthority === "controller" && entry.meta.registrationState !== "registered");
  if (unresolvedControllerRows.length) {
    checks.push({ endpoint: "Controller registration", status: "FAIL", detail: `${unresolvedControllerRows.length} controller-managed active rows not registered`, affects: "Main table accuracy and widget lookup" });
  }

  fs.mkdirSync(path.dirname(HEALTH_CHECK_PATH), { recursive: true });
  fs.writeFileSync(HEALTH_CHECK_PATH, JSON.stringify({ timestamp: new Date().toISOString(), checks }, null, 2));

  return checks;
}

async function main() {
  const catalog = loadAuthorityCatalog();
  const { addresses: governorAddresses, sha } = await fetchGovernorAddresses();

  const resolvedDeployments = resolveDeployments(catalog, governorAddresses);
  const byChain = {
    arbitrumOne: resolvedDeployments.filter((resolved) => resolved.definition.chain === "arbitrumOne"),
    ethereumMainnet: resolvedDeployments.filter((resolved) => resolved.definition.chain === "ethereumMainnet"),
  };

  console.log("Verifying published deployments...");
  const arbVerified = await verifyAddresses(byChain.arbitrumOne.map((resolved) => resolved.entry), "arbitrumOne");
  const ethVerified = await verifyAddresses(byChain.ethereumMainnet.map((resolved) => resolved.entry), "ethereumMainnet");
  byChain.arbitrumOne = byChain.arbitrumOne.map((resolved, index) => ({ ...resolved, entry: arbVerified[index] }));
  byChain.ethereumMainnet = byChain.ethereumMainnet.map((resolved, index) => ({ ...resolved, entry: ethVerified[index] }));

  console.log("Enriching published deployments...");
  const arbEnriched = await enrichMetadata(byChain.arbitrumOne, "arbitrumOne");
  const ethEnriched = await enrichMetadata(byChain.ethereumMainnet, "ethereumMainnet");

  const arbResolvedEnriched = byChain.arbitrumOne.map((resolved, index) => ({ ...resolved, entry: arbEnriched[index] }));
  const ethResolvedEnriched = byChain.ethereumMainnet.map((resolved, index) => ({ ...resolved, entry: ethEnriched[index] }));

  console.log("Building current implementations...");
  const arbImplementationDefs = buildImplementationDefinitions(arbEnriched, catalog, governorAddresses);
  const ethImplementationDefs = buildImplementationDefinitions(ethEnriched, catalog, governorAddresses);
  const arbImplementations = await enrichImplementationEntries(arbImplementationDefs.map((item) => item.entry), "arbitrumOne");
  const ethImplementations = await enrichImplementationEntries(ethImplementationDefs.map((item) => item.entry), "ethereumMainnet");

  console.log("Building historical groups...");
  const historical = buildHistoricalGroups(
    catalog,
    [...arbResolvedEnriched, ...ethResolvedEnriched],
    [...arbImplementationDefs, ...ethImplementationDefs],
    governorAddresses
  );
  await enrichHistoricalGroups(historical.arbitrumOne, "arbitrumOne");
  await enrichHistoricalGroups(historical.ethereumMainnet, "ethereumMainnet");

  const payload = {
    arbitrumOne: buildChainPayload(arbEnriched, arbImplementations, historical.arbitrumOne),
    ethereumMainnet: buildChainPayload(ethEnriched, ethImplementations, historical.ethereumMainnet),
  };

  const validation = await validateData([...arbResolvedEnriched, ...ethResolvedEnriched], payload);
  const healthChecks = await runHealthCheck(payload);
  const failedHealthChecks = healthChecks.filter((check) => check.status === "FAIL");

  if (validation.failures.length || failedHealthChecks.length) {
    const combined = [...validation.failures, ...failedHealthChecks];
    console.error("\nContract registry validation failed:");
    for (const failure of combined) {
      console.error(`- ${failure.endpoint}: ${failure.detail}`);
    }
    if (!DRY_RUN) {
      fs.mkdirSync(path.dirname(HEALTH_CHECK_PATH), { recursive: true });
      fs.writeFileSync(HEALTH_CHECK_PATH, JSON.stringify({
        timestamp: new Date().toISOString(),
        checks: [...healthChecks, ...validation.failures],
      }, null, 2));
    }
    throw new Error(`${combined.length} blocking validation failure(s)`);
  }

  writeDataFiles(payload, sha, catalog);
}

if (require.main === module) {
  main().catch((error) => {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  });
}

module.exports = {
  loadAuthorityCatalog,
  resolveAuthority,
  resolveGovernorSeries,
  resolveDeployments,
  buildHistoricalGroups,
  buildChainPayload,
};
