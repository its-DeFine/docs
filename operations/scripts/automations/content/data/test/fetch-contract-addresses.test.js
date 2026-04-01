const test = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");

const {
  loadContractProofCatalog,
  resolveAuthority,
  buildChainPayload,
  diffBranchWatchState,
  computeIncidentFingerprint,
} = require(path.join(process.cwd(), ".github/scripts/fetch-contract-addresses.js"));

const addr = (hex) => `0x${hex.repeat(40)}`;

test("loadContractProofCatalog publishes repo watch inputs and no fixed address truth rules", () => {
  const catalog = loadContractProofCatalog();
  assert.ok(Array.isArray(catalog.deployments) && catalog.deployments.length > 0);
  assert.ok(Array.isArray(catalog._meta?.watchedRepos) && catalog._meta.watchedRepos.length === 4);
  assert.equal(
    catalog.deployments.some((deployment) => deployment.addressStrategy?.kind === "fixed"),
    false
  );
});

test("resolveAuthority picks the highest governor-managed version", () => {
  const resolved = resolveAuthority(
    {
      kind: "governor-versioned-latest",
      baseKey: "minter",
      baseVersion: "V1",
      prefix: "minterV",
    },
    {
      minter: addr("1"),
      minterV2: addr("2"),
      minterV10: addr("a"),
    }
  );

  assert.equal(resolved.address, addr("a"));
  assert.equal(resolved.version, "V10");
  assert.equal(resolved.sourceKey, "minterV10");
});

test("buildChainPayload groups lifecycle outputs and preserves current as the active alias", () => {
  const payload = buildChainPayload(
    [
      {
        name: "Controller",
        canonicalName: "Controller",
        category: "core",
        lifecycle: "active",
        chain: "arbitrumOne",
        address: addr("1"),
        type: "standalone",
        deploymentKind: "standalone",
        runtimeAuthority: "controller",
        addressAuthority: "controller-runtime",
        blockchainHref: `https://arbiscan.io/address/${addr("1")}`,
        hasBytecode: true,
        sourceVerified: true,
        meta: {
          controllerSlot: "Controller",
          registrationState: "registered",
          controllerResolvedAddress: addr("1"),
          keccakHash: `0x${"a".repeat(64)}`,
        },
        addressSource: { kind: "controller-runtime", resolvedCommit: null },
      },
      {
        name: "BondingManager",
        canonicalName: "BondingManager",
        category: "core",
        lifecycle: "active",
        chain: "arbitrumOne",
        address: addr("2"),
        type: "proxy",
        deploymentKind: "proxy",
        runtimeAuthority: "controller",
        addressAuthority: "controller-runtime",
        blockchainHref: `https://arbiscan.io/address/${addr("2")}`,
        hasBytecode: true,
        sourceVerified: true,
        meta: {
          controllerSlot: "BondingManager",
          registrationState: "registered",
          controllerResolvedAddress: addr("2"),
          proxyTarget: addr("6"),
          proxyImplementationMatchesExpected: true,
          currentImplementationVersion: "V13",
          keccakHash: `0x${"b".repeat(64)}`,
        },
        addressSource: { kind: "controller-runtime", resolvedCommit: null },
      },
      {
        name: "L1Escrow",
        category: "bridge",
        lifecycle: "paused",
        chain: "ethereumMainnet",
        address: addr("3"),
        type: "standalone",
        deploymentKind: "standalone",
        runtimeAuthority: "explorer",
        blockchainHref: `https://etherscan.io/address/${addr("3")}`,
        hasBytecode: true,
        sourceVerified: true,
        meta: { keccakHash: `0x${"c".repeat(64)}` },
        addressSource: { kind: "governor-manifest", resolvedCommit: "abc1234" },
      },
      {
        name: "L2Migrator",
        category: "migration",
        lifecycle: "migration_residual",
        chain: "arbitrumOne",
        address: addr("4"),
        type: "proxy",
        deploymentKind: "proxy",
        runtimeAuthority: "controller",
        blockchainHref: `https://arbiscan.io/address/${addr("4")}`,
        hasBytecode: true,
        sourceVerified: true,
        meta: { keccakHash: `0x${"d".repeat(64)}` },
        addressSource: { kind: "controller-runtime", resolvedCommit: null },
      },
    ],
    [
      {
        name: "BondingManager",
        canonicalName: "BondingManager",
        category: "core",
        lifecycle: "historical",
        chain: "arbitrumOne",
        address: addr("6"),
        type: "target",
        deploymentKind: "target",
        runtimeAuthority: "explorer",
        blockchainHref: `https://arbiscan.io/address/${addr("6")}`,
        hasBytecode: true,
        sourceVerified: true,
        meta: {
          currentImplementation: true,
          currentImplementationVersion: "V13",
          keccakHash: `0x${"e".repeat(64)}`,
        },
        addressSource: { kind: "governor-manifest", resolvedCommit: "abc1234" },
      },
    ],
    [],
    "abc1234"
  );

  assert.strictEqual(payload.current, payload.active);
  assert.deepEqual(payload.active.map((entry) => entry.type), ["proxy", "standalone"]);
  assert.deepEqual(payload.paused.map((entry) => entry.name), ["L1Escrow"]);
  assert.deepEqual(payload.migration_residual.map((entry) => entry.name), ["L2Migrator"]);
  assert.deepEqual(payload.currentImplementations.map((entry) => entry.type), ["target"]);
  assert.equal(payload.active.find((entry) => entry.name === "BondingManager").verification.explorer.host, "arbiscan.io");
});

test("diffBranchWatchState detects new branches and default-branch changes", () => {
  const diffs = diffBranchWatchState(
    {
      repos: [
        { repo: "livepeer/protocol", defaultBranch: "delta", branches: ["delta", "master"] },
      ],
    },
    {
      repos: [
        { repo: "livepeer/protocol", defaultBranch: "streamflow", branches: ["delta", "master", "streamflow"] },
      ],
    }
  );

  assert.deepEqual(
    diffs.map((diff) => diff.type),
    ["default-branch-change", "new-branch"]
  );
});

test("computeIncidentFingerprint is stable for the same blocking failure", () => {
  const incident = {
    failureClass: "provenance-failure",
    endpoint: "code-provenance",
    chain: "arbitrumOne",
    contract: "BondingManager",
    detail: "Missing commit-specific provenance",
  };

  assert.equal(computeIncidentFingerprint(incident), computeIncidentFingerprint(incident));
});
