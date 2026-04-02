const chainLabel = {
  arbitrumOne: 'Arbitrum One',
  ethereumMainnet: 'Ethereum Mainnet',
}

const lifecycleLabel = {
  active: 'Active',
  paused: 'Paused',
  migration_residual: 'Migration',
  legacy_operational: 'Legacy operational',
  historical: 'Historical',
}

const getExplorerBase = (sourceData = {}, chain) => {
  const urls = sourceData?.meta?.explorerUrls || {}
  if (chain === 'arbitrumOne') {
    return urls.arbiscanAddress || `${urls.arbiscan || 'https://arbiscan.io'}/address/`
  }

  return urls.etherscanAddress || `${urls.etherscan || 'https://etherscan.io'}/address/`
}

const normalizeContractsForTable = (sourceData = {}, entries, chain, fallbackLifecycle = 'active') =>
  (entries || []).map((contract) => {
    const type = contract.type || contract.deploymentKind || 'standalone'
    const lifecycle = contract.lifecycle || fallbackLifecycle
    const proxyAddress = contract.meta?.proxyAddress || contract.meta?.historicalProxyAddress || null

    return {
      Name: contract.name,
      Address: contract.address,
      _addressHref: contract.blockchainHref || `${getExplorerBase(sourceData, chain)}${contract.address}`,
      Type: type,
      Status: contract.meta?.statusLabel || lifecycleLabel[lifecycle] || lifecycle,
      Category: contract.category,
      Version: contract.version || contract.meta?.version || '—',
      Chain: chainLabel[chain] || chain,
      _lifecycle: lifecycle,
      _chainKey: chain,
      _typeKey: type,
      _categoryKey: contract.category || 'other',
      _proxyAddress: proxyAddress,
      _proxyHref: proxyAddress ? `${getExplorerBase(sourceData, chain)}${proxyAddress}` : null,
    }
  })

const getActiveEntries = (sourceData = {}) => [
  ...normalizeContractsForTable(
    sourceData,
    sourceData?.arbitrumOne?.active || sourceData?.arbitrumOne?.current,
    'arbitrumOne',
    'active',
  ),
  ...normalizeContractsForTable(
    sourceData,
    sourceData?.ethereumMainnet?.active || sourceData?.ethereumMainnet?.current,
    'ethereumMainnet',
    'active',
  ),
]

const getImplementationTableItems = (sourceData = {}) => [
  ...normalizeContractsForTable(
    sourceData,
    sourceData?.arbitrumOne?.currentImplementations,
    'arbitrumOne',
    'historical',
  ),
  ...normalizeContractsForTable(
    sourceData,
    sourceData?.ethereumMainnet?.currentImplementations,
    'ethereumMainnet',
    'historical',
  ),
]

export const getActiveTableItems = (sourceData = {}) => {
  const activeEntries = getActiveEntries(sourceData)
  return [
    ...activeEntries.filter(({ Type }) => Type === 'standalone'),
    ...getImplementationTableItems(sourceData),
  ]
}
