import { LinkIcon } from '/snippets/components/elements/links/Links.jsx'
import { CopyText } from '/snippets/components/elements/text/Text.jsx'
import { ArbitrumIcon, LivepeerIcon } from '/snippets/components/elements/icons/Icons.jsx'

export const buildCategoryAccordionRows = (
  items = [],
  { includeType = true, includeVersion = false, showSeparators = true } = {},
) => {
  const categoryOrder = ['bridge', 'core', 'governance', 'token', 'migration', 'genesis', 'utility', 'other']

  const sortContractsForDisplay = (tableItems = []) =>
    [...tableItems].sort((left, right) => {
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

  const renderAddressCell = (address, href) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.35rem',
        width: '100%',
        minWidth: 0,
      }}
    >
      <CopyText text={address} style={{ flex: 1 }} />
      {href ? <LinkIcon href={href} color="var(--accent)" /> : null}
    </div>
  )

  const renderChainCell = (chainKey) => (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.35rem',
      }}
    >
      {chainKey === 'ethereumMainnet' ? (
        <>
          <Icon icon="ethereum" color="var(--hero-text)" size={13} />
          Ethereum Mainnet
        </>
      ) : (
        <>
          <ArbitrumIcon color="var(--arbitrum)" />
          Arbitrum One
        </>
      )}
    </span>
  )

  const renderTypeBadge = (type) => {
    const colorMap = {
      standalone: 'blue',
      target: 'surface-destructive',
      proxy: 'surface',
    }

    return <Badge color={colorMap[type] || 'surface'}>{type}</Badge>
  }

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
      Name: <strong>{item.Name}</strong>,
      Address: renderAddressCell(item.Address, item._addressHref),
      Chain: renderChainCell(item._chainKey),
    }

    if (includeVersion) {
      row.Version = item.Version || '—'
    }

    if (includeType) {
      row.Type = renderTypeBadge(item._typeKey || item.Type)
    }

    rows.push(row)
  })

  return rows
}

export const getEthereumActiveNameList = (sourceData = {}) =>
  (sourceData?.ethereumMainnet?.active || sourceData?.ethereumMainnet?.current || [])
    .map((contract) => contract.name)
    .join(', ')

export const getActiveTableItems = (sourceData = {}) => {
  const chainLabel = {
    arbitrumOne: 'Arbitrum One',
    ethereumMainnet: 'Ethereum Mainnet',
  }

  const lifecycleLabel = {
    active: 'Active',
    historical: 'Historical',
  }

  const getExplorerBase = (chain) => {
    const urls = sourceData?.meta?.explorerUrls || {}
    if (chain === 'arbitrumOne') {
      return urls.arbiscanAddress || `${urls.arbiscan || 'https://arbiscan.io'}/address/`
    }

    return urls.etherscanAddress || `${urls.etherscan || 'https://etherscan.io'}/address/`
  }

  const normalizeContractsForTable = (entries, chain, fallbackLifecycle = 'active') =>
    (entries || []).map((contract) => {
      const type = contract.type || contract.deploymentKind || 'standalone'
      const lifecycle = contract.lifecycle || fallbackLifecycle
      const proxyAddress = contract.meta?.proxyAddress || contract.meta?.historicalProxyAddress || null

      return {
        Name: contract.name,
        Address: contract.address,
        _addressHref: contract.blockchainHref || `${getExplorerBase(chain)}${contract.address}`,
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
        _proxyHref: proxyAddress ? `${getExplorerBase(chain)}${proxyAddress}` : null,
      }
    })

  const activeEntries = [
    ...normalizeContractsForTable(sourceData?.arbitrumOne?.active || sourceData?.arbitrumOne?.current, 'arbitrumOne'),
    ...normalizeContractsForTable(
      sourceData?.ethereumMainnet?.active || sourceData?.ethereumMainnet?.current,
      'ethereumMainnet',
    ),
  ]

  const implementationTableItems = [
    ...normalizeContractsForTable(sourceData?.arbitrumOne?.currentImplementations, 'arbitrumOne', 'historical'),
    ...normalizeContractsForTable(
      sourceData?.ethereumMainnet?.currentImplementations,
      'ethereumMainnet',
      'historical',
    ),
  ]

  return [
    ...activeEntries.filter(({ Type }) => Type === 'standalone'),
    ...implementationTableItems,
  ]
}

export const getProxyTableItems = (sourceData = {}) => {
  const chainLabel = {
    arbitrumOne: 'Arbitrum One',
    ethereumMainnet: 'Ethereum Mainnet',
  }

  const lifecycleLabel = {
    active: 'Active',
    historical: 'Historical',
  }

  const getExplorerBase = (chain) => {
    const urls = sourceData?.meta?.explorerUrls || {}
    if (chain === 'arbitrumOne') {
      return urls.arbiscanAddress || `${urls.arbiscan || 'https://arbiscan.io'}/address/`
    }

    return urls.etherscanAddress || `${urls.etherscan || 'https://etherscan.io'}/address/`
  }

  const normalizeContractsForTable = (entries, chain, fallbackLifecycle = 'active') =>
    (entries || []).map((contract) => {
      const type = contract.type || contract.deploymentKind || 'standalone'
      const lifecycle = contract.lifecycle || fallbackLifecycle
      const proxyAddress = contract.meta?.proxyAddress || contract.meta?.historicalProxyAddress || null

      return {
        Name: contract.name,
        Address: contract.address,
        _addressHref: contract.blockchainHref || `${getExplorerBase(chain)}${contract.address}`,
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
        _proxyHref: proxyAddress ? `${getExplorerBase(chain)}${proxyAddress}` : null,
      }
    })

  const activeEntries = [
    ...normalizeContractsForTable(sourceData?.arbitrumOne?.active || sourceData?.arbitrumOne?.current, 'arbitrumOne'),
    ...normalizeContractsForTable(
      sourceData?.ethereumMainnet?.active || sourceData?.ethereumMainnet?.current,
      'ethereumMainnet',
    ),
  ]

  const implementationTableItems = [
    ...normalizeContractsForTable(sourceData?.arbitrumOne?.currentImplementations, 'arbitrumOne', 'historical'),
    ...normalizeContractsForTable(
      sourceData?.ethereumMainnet?.currentImplementations,
      'ethereumMainnet',
      'historical',
    ),
  ]

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

export const getPausedTableItems = (sourceData = {}) => {
  const chainLabel = {
    arbitrumOne: 'Arbitrum One',
    ethereumMainnet: 'Ethereum Mainnet',
  }

  const lifecycleLabel = {
    paused: 'Paused',
  }

  const getExplorerBase = (chain) => {
    const urls = sourceData?.meta?.explorerUrls || {}
    if (chain === 'arbitrumOne') {
      return urls.arbiscanAddress || `${urls.arbiscan || 'https://arbiscan.io'}/address/`
    }

    return urls.etherscanAddress || `${urls.etherscan || 'https://etherscan.io'}/address/`
  }

  const normalizeContractsForTable = (entries, chain, fallbackLifecycle = 'paused') =>
    (entries || []).map((contract) => {
      const type = contract.type || contract.deploymentKind || 'standalone'
      const lifecycle = contract.lifecycle || fallbackLifecycle
      const proxyAddress = contract.meta?.proxyAddress || contract.meta?.historicalProxyAddress || null

      return {
        Name: contract.name,
        Address: contract.address,
        _addressHref: contract.blockchainHref || `${getExplorerBase(chain)}${contract.address}`,
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
        _proxyHref: proxyAddress ? `${getExplorerBase(chain)}${proxyAddress}` : null,
      }
    })

  return [
    ...normalizeContractsForTable(sourceData?.arbitrumOne?.paused, 'arbitrumOne', 'paused'),
    ...normalizeContractsForTable(sourceData?.ethereumMainnet?.paused, 'ethereumMainnet', 'paused'),
  ]
}

export const getMigrationResidualTableItems = (sourceData = {}) => {
  const chainLabel = {
    arbitrumOne: 'Arbitrum One',
    ethereumMainnet: 'Ethereum Mainnet',
  }

  const lifecycleLabel = {
    migration_residual: 'Migration',
  }

  const getExplorerBase = (chain) => {
    const urls = sourceData?.meta?.explorerUrls || {}
    if (chain === 'arbitrumOne') {
      return urls.arbiscanAddress || `${urls.arbiscan || 'https://arbiscan.io'}/address/`
    }

    return urls.etherscanAddress || `${urls.etherscan || 'https://etherscan.io'}/address/`
  }

  const normalizeContractsForTable = (entries, chain, fallbackLifecycle = 'migration_residual') =>
    (entries || []).map((contract) => {
      const type = contract.type || contract.deploymentKind || 'standalone'
      const lifecycle = contract.lifecycle || fallbackLifecycle
      const proxyAddress = contract.meta?.proxyAddress || contract.meta?.historicalProxyAddress || null

      return {
        Name: contract.name,
        Address: contract.address,
        _addressHref: contract.blockchainHref || `${getExplorerBase(chain)}${contract.address}`,
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
        _proxyHref: proxyAddress ? `${getExplorerBase(chain)}${proxyAddress}` : null,
      }
    })

  return [
    ...normalizeContractsForTable(sourceData?.arbitrumOne?.migration_residual, 'arbitrumOne', 'migration_residual'),
    ...normalizeContractsForTable(
      sourceData?.ethereumMainnet?.migration_residual,
      'ethereumMainnet',
      'migration_residual',
    ),
  ]
}

export const getLegacyOperationalTableItems = (sourceData = {}) => {
  const chainLabel = {
    arbitrumOne: 'Arbitrum One',
    ethereumMainnet: 'Ethereum Mainnet',
  }

  const lifecycleLabel = {
    legacy_operational: 'Legacy operational',
  }

  const getExplorerBase = (chain) => {
    const urls = sourceData?.meta?.explorerUrls || {}
    if (chain === 'arbitrumOne') {
      return urls.arbiscanAddress || `${urls.arbiscan || 'https://arbiscan.io'}/address/`
    }

    return urls.etherscanAddress || `${urls.etherscan || 'https://etherscan.io'}/address/`
  }

  const normalizeContractsForTable = (entries, chain, fallbackLifecycle = 'legacy_operational') =>
    (entries || []).map((contract) => {
      const type = contract.type || contract.deploymentKind || 'standalone'
      const lifecycle = contract.lifecycle || fallbackLifecycle
      const proxyAddress = contract.meta?.proxyAddress || contract.meta?.historicalProxyAddress || null

      return {
        Name: contract.name,
        Address: contract.address,
        _addressHref: contract.blockchainHref || `${getExplorerBase(chain)}${contract.address}`,
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
        _proxyHref: proxyAddress ? `${getExplorerBase(chain)}${proxyAddress}` : null,
      }
    })

  return [
    ...normalizeContractsForTable(sourceData?.arbitrumOne?.legacy_operational, 'arbitrumOne', 'legacy_operational'),
    ...normalizeContractsForTable(
      sourceData?.ethereumMainnet?.legacy_operational,
      'ethereumMainnet',
      'legacy_operational',
    ),
  ]
}

export const historicalCategoryTitle = (category) => {
  const historicalCategoryConfig = {
    core: {
      title: 'Core',
    },
    governance: {
      title: 'Governance',
    },
    migration: {
      title: 'Migration',
    },
    genesis: {
      title: 'Genesis',
    },
  }

  return historicalCategoryConfig[category]?.title ||
    String(category || 'Historical')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase())
}

export const historicalCategoryDescription = (category) => {
  const historicalCategoryConfig = {
    core: {
      description: 'Historical staking, payments, round progression, and service discovery contracts',
    },
    governance: {
      description: 'Historical voting and proposal contracts',
    },
    migration: {
      description: 'Historical Confluence upgrade contracts',
    },
    genesis: {
      description: 'Historical libraries and helper contracts from the 2018 launch',
    },
  }

  return historicalCategoryConfig[category]?.description ||
    'Historical contract versions grouped by generator-owned contract series'
}

export const historicalCategoryIcon = (category) => {
  const historicalCategoryConfig = {
    core: { icon: 'gear' },
    governance: { icon: 'landmark' },
    migration: { icon: 'bridge' },
    genesis: { icon: 'livepeer' },
  }

  return historicalCategoryConfig[category]?.icon === 'livepeer'
    ? <LivepeerIcon color="var(--accent)" size={16} />
    : <Icon icon={historicalCategoryConfig[category]?.icon || 'clock-rotate-left'} color="var(--accent)" />
}
