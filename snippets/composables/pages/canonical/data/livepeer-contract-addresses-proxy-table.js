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

export const getProxyTableItems = (sourceData = {}) => {
  const activeEntries = getActiveEntries(sourceData)
  const implementationTableItems = getImplementationTableItems(sourceData)
  const implementationLookup = implementationTableItems.reduce((lookup, item) => {
    lookup.set(`${item.Name}:${item._chainKey}`, item)
    return lookup
  }, new Map())

  return activeEntries
    .filter(({ Type }) => Type === 'proxy')
    .map((item) => {
      const target = implementationLookup.get(`${item.Name}:${item._chainKey}`)
      return {
        ...item,
        Proxy: 'proxy',
        'Proxy Address': item.Address,
        '_Proxy AddressHref': item._addressHref,
        Target: target?._typeKey || 'target',
        'Target Address': target?.Address || '—',
        '_Target AddressHref': target?._addressHref,
      }
    })
}
