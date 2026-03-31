/**
 * @module contractVerifierData
 * @description Pure data helpers for ContractVerifier. Kept in plain JS so script-level tests can import them without a JSX transform.
 */

function buildContractVerifierChainData(data = {}, chainKey) {
  const chainData = (data && data[chainKey]) || {};
  const activeEntries = chainData.active || chainData.current || [];
  const inventoryEntries = chainData.inventory || [
    ...activeEntries,
    ...((chainData.currentImplementations) || []),
  ];
  const canonical = {};

  activeEntries.forEach((entry) => {
    if (!canonical[entry.name]) {
      canonical[entry.name] = entry;
    } else if ((entry.type || entry.deploymentKind) === "proxy") {
      canonical[entry.name] = entry;
    }
  });

  return { activeEntries, inventoryEntries, canonical };
}

function isContractVerifierControllerLookupEligible(entry, hasController) {
  const entryMeta = (entry && entry.meta) || {};
  const hash = entryMeta.keccakHash || null;
  const registrationState = entryMeta.registrationState || null;
  const isRegistered = registrationState === "registered"
    ? true
    : (registrationState && registrationState !== "unknown"
      ? false
      : (typeof entryMeta.registeredInController === "boolean" ? entryMeta.registeredInController : null));

  return Boolean(hasController && hash && isRegistered === true);
}

module.exports = {
  buildContractVerifierChainData,
  isContractVerifierControllerLookupEligible,
};
