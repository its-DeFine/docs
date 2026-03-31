const test = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");

const {
  buildContractVerifierChainData,
  isContractVerifierControllerLookupEligible,
} = require(path.join(process.cwd(), "snippets/components/integrators/feeds/contractVerifierData.js"));

const addr = (hex) => `0x${hex.repeat(40)}`;

test("buildContractVerifierChainData keeps lookup options active-only and prefers proxy entries", () => {
  const proxy = { name: "BondingManager", type: "proxy", address: addr("1"), category: "core" };
  const standalone = { name: "BondingManager", type: "standalone", address: addr("2"), category: "core" };
  const controller = { name: "Controller", type: "standalone", address: addr("3"), category: "core" };
  const implementation = { name: "BondingManager", type: "target", address: addr("4"), category: "core" };

  const result = buildContractVerifierChainData(
    {
      arbitrumOne: {
        active: [standalone, proxy, controller],
        inventory: [standalone, proxy, controller, implementation],
        currentImplementations: [implementation],
      },
    },
    "arbitrumOne"
  );

  assert.deepEqual(Object.keys(result.canonical).sort(), ["BondingManager", "Controller"]);
  assert.equal(result.canonical.BondingManager.address, proxy.address);
  assert.equal(result.activeEntries.some((entry) => entry.address === implementation.address), false);
  assert.equal(result.inventoryEntries.some((entry) => entry.address === implementation.address), true);
});

test("isContractVerifierControllerLookupEligible prefers explicit registrationState over deprecated boolean", () => {
  const keccakHash = `0x${"a".repeat(64)}`;

  assert.equal(
    isContractVerifierControllerLookupEligible(
      { meta: { keccakHash, registrationState: "not_registered", registeredInController: true } },
      true
    ),
    false
  );

  assert.equal(
    isContractVerifierControllerLookupEligible(
      { meta: { keccakHash, registrationState: "registered", registeredInController: false } },
      true
    ),
    true
  );

  assert.equal(
    isContractVerifierControllerLookupEligible(
      { meta: { keccakHash, registeredInController: true } },
      true
    ),
    true
  );
});
