const test = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");

const {
  resolveAuthority,
  resolveDeployments,
  buildHistoricalGroups,
  buildChainPayload,
} = require(path.join(process.cwd(), ".github/scripts/fetch-contract-addresses.js"));

const addr = (hex) => `0x${hex.repeat(40)}`;

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

test("resolveDeployments uses the authority catalog instead of naming heuristics", () => {
  const catalog = {
    deployments: [
      {
        id: "arbitrumOne.minter",
        canonicalName: "Minter",
        chain: "arbitrumOne",
        category: "core",
        deploymentKind: "standalone",
        lifecycle: "active",
        addressAuthority: {
          kind: "governor-versioned-latest",
          baseKey: "minter",
          baseVersion: "V1",
          prefix: "minterV",
        },
        runtimeAuthority: { kind: "controller", controllerSlot: "Minter" },
        codeAuthority: { repo: "livepeer/protocol", branch: "delta", path: "contracts/token/Minter.sol" },
        statusLabel: "Active",
        notes: null,
      },
    ],
  };

  const resolved = resolveDeployments(catalog, {
    arbitrumMainnet: {
      minter: addr("1"),
      minterV2: addr("2"),
    },
    mainnet: {},
  });

  assert.equal(resolved[0].entry.address, addr("2"));
  assert.equal(resolved[0].entry.version, "V2");
  assert.equal(resolved[0].entry.meta.governorKey, "minterV2");
});

test("buildHistoricalGroups excludes the current active address and current implementation", () => {
  const history = buildHistoricalGroups(
    { historicalOnlyGroups: [] },
    [
      {
        definition: {
          id: "arbitrumOne.minter",
          chain: "arbitrumOne",
          historyStrategy: {
            group: "Minter",
            sources: [
              { kind: "governor-key", key: "minter", version: "V1" },
              { kind: "governor-series", prefix: "minterV" },
            ],
            excludeResolvedCurrent: true,
          },
        },
        entry: { address: addr("3") },
      },
    ],
    [
      {
        definition: { id: "arbitrumOne.minter" },
        entry: { address: addr("4") },
      },
    ],
    {
      arbitrumMainnet: {
        minter: addr("1"),
        minterV2: addr("2"),
        minterV3: addr("3"),
        minterV4: addr("4"),
      },
      mainnet: {},
    }
  );

  assert.deepEqual(
    history.arbitrumOne.Minter.entries.map((entry) => ({ version: entry.version, address: entry.address })),
    [
      { version: "V1", address: addr("1") },
      { version: "V2", address: addr("2") },
    ]
  );
});

test("buildChainPayload groups lifecycle outputs and preserves current as the active alias", () => {
  const payload = buildChainPayload(
    [
      { name: "Controller", category: "core", lifecycle: "active", address: addr("1"), type: "standalone" },
      { name: "BondingManager", category: "core", lifecycle: "active", address: addr("2"), type: "proxy" },
      { name: "L1Escrow", category: "bridge", lifecycle: "paused", address: addr("3"), type: "standalone" },
      { name: "L2Migrator", category: "migration", lifecycle: "migration_residual", address: addr("4"), type: "proxy" },
      { name: "GenesisManager", category: "utility", lifecycle: "legacy_operational", address: addr("5"), type: "standalone" },
    ],
    [
      { name: "BondingManager", category: "core", lifecycle: "historical", address: addr("6"), type: "target" },
    ],
    {}
  );

  assert.strictEqual(payload.current, payload.active);
  assert.deepEqual(payload.active.map((entry) => entry.type), ["proxy", "standalone"]);
  assert.deepEqual(payload.paused.map((entry) => entry.name), ["L1Escrow"]);
  assert.deepEqual(payload.migration_residual.map((entry) => entry.name), ["L2Migrator"]);
  assert.deepEqual(payload.legacy_operational.map((entry) => entry.name), ["GenesisManager"]);
  assert.deepEqual(payload.currentImplementations.map((entry) => entry.type), ["target"]);
});
