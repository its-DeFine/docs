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

const categoryOrder = ['bridge', 'core', 'governance', 'token', 'migration', 'genesis', 'utility', 'other']

const historicalCategoryConfig = {
  core: {
    title: 'Core',
    description: 'Historical staking, payments, round progression, and service discovery contracts',
    icon: 'gear',
  },
  governance: {
    title: 'Governance',
    description: 'Historical voting and proposal contracts',
    icon: 'landmark',
  },
  migration: {
    title: 'Migration',
    description: 'Historical Confluence upgrade contracts',
    icon: 'bridge',
  },
  genesis: {
    title: 'Genesis',
    description: 'Historical libraries and helper contracts from the 2018 launch',
    icon: 'livepeer',
  },
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

const sortContractsForDisplay = (items = []) =>
  [...items].sort((left, right) => {
    const categoryA = categoryOrder.indexOf((left._categoryKey || left.Category || 'other').toLowerCase())
    const categoryB = categoryOrder.indexOf((right._categoryKey || right.Category || 'other').toLowerCase())
    if (categoryA !== categoryB) return categoryA - categoryB

    const nameCompare = String(left.Name || '').localeCompare(String(right.Name || ''), 'en', {
      sensitivity: 'base',
    })
    if (nameCompare !== 0) return nameCompare

    const chainCompare = String(left.Chain || '').localeCompare(String(right.Chain || ''), 'en', {
      sensitivity: 'base',
    })
    if (chainCompare !== 0) return chainCompare

    const versionA = Number(String(left.Version || '').replace(/^V/i, '')) || 0
    const versionB = Number(String(right.Version || '').replace(/^V/i, '')) || 0
    return versionA - versionB
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

export const buildCategoryAccordionRows = (
  items = [],
  { includeType = true, includeVersion = false, showSeparators = true } = {},
) => {
  const rows = []
  let lastCategory = null

  sortContractsForDisplay(items).forEach((item) => {
    if (showSeparators && item.Category && item.Category !== lastCategory) {
      rows.push({
        __separator: true,
        Name: String(item.Category).toUpperCase(),
      })
      lastCategory = item.Category
    }

    const row = {
      Name: item.Name,
      Address: item.Address,
      Chain: item.Chain,
      _addressHref: item._addressHref,
      _chainKey: item._chainKey,
      _typeKey: item._typeKey || item.Type,
      Category: item.Category,
    }

    if (includeVersion) {
      row.Version = item.Version || '—'
    }

    if (includeType) {
      row.Type = item._typeKey || item.Type
    }

    rows.push(row)
  })

  return rows
}

export const getEthereumActiveNameList = (sourceData = {}) =>
  (sourceData?.ethereumMainnet?.active || sourceData?.ethereumMainnet?.current || [])
    .map((contract) => contract.name)
    .join(', ')

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

export const getActiveTableItems = (sourceData = {}) => {
  const activeEntries = getActiveEntries(sourceData)
  return [
    ...activeEntries.filter(({ Type }) => Type === 'standalone'),
    ...getImplementationTableItems(sourceData),
  ]
}

export const getPausedTableItems = (sourceData = {}) => [
  ...normalizeContractsForTable(sourceData, sourceData?.arbitrumOne?.paused, 'arbitrumOne', 'paused'),
  ...normalizeContractsForTable(sourceData, sourceData?.ethereumMainnet?.paused, 'ethereumMainnet', 'paused'),
]

export const getMigrationResidualTableItems = (sourceData = {}) => [
  ...normalizeContractsForTable(
    sourceData,
    sourceData?.arbitrumOne?.migration_residual,
    'arbitrumOne',
    'migration_residual',
  ),
  ...normalizeContractsForTable(
    sourceData,
    sourceData?.ethereumMainnet?.migration_residual,
    'ethereumMainnet',
    'migration_residual',
  ),
]

export const getLegacyOperationalTableItems = (sourceData = {}) => [
  ...normalizeContractsForTable(
    sourceData,
    sourceData?.arbitrumOne?.legacy_operational,
    'arbitrumOne',
    'legacy_operational',
  ),
  ...normalizeContractsForTable(
    sourceData,
    sourceData?.ethereumMainnet?.legacy_operational,
    'ethereumMainnet',
    'legacy_operational',
  ),
]

export const historicalCategoryTitle = (category) =>
  historicalCategoryConfig[category]?.title ||
  String(category || 'Historical')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())

export const historicalCategoryDescription = (category) =>
  historicalCategoryConfig[category]?.description || 'Historical contract versions grouped by generator-owned contract series'

export const historicalCategoryIconName = (category) =>
  historicalCategoryConfig[category]?.icon || 'clock-rotate-left'
