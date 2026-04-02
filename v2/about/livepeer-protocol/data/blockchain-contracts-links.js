import blockchainContractsPageData from '/snippets/data/contract-addresses/blockchainContractsPageData.json'

const getContract = (slug) => blockchainContractsPageData?.contracts?.[slug] || null

const getNamedContract = (chain, name) => {
  if (chain === 'arbitrumOne') {
    if (name === 'Controller') return getContract('controller')
    if (name === 'BondingManager') return getContract('bonding-manager')
    if (name === 'TicketBroker') return getContract('ticket-broker')
    if (name === 'RoundsManager') return getContract('rounds-manager')
    if (name === 'Minter') return getContract('minter')
    if (name === 'ServiceRegistry') return getContract('service-registry')
    if (name === 'AIServiceRegistry') return getContract('ai-service-registry')
    if (name === 'LivepeerToken') return getContract('livepeer-token-arbitrum')
    if (name === 'L2LPTGateway') return getContract('l2-lpt-gateway')
    if (name === 'BondingVotes') return getContract('bonding-votes')
    if (name === 'Governor') return getContract('governor')
    if (name === 'LivepeerGovernor') return getContract('livepeer-governor')
    if (name === 'Treasury') return getContract('treasury')
    if (name === 'L2Migrator') return getContract('l2-migrator')
    if (name === 'MerkleSnapshot') return getContract('merkle-snapshot')
  }

  if (chain === 'ethereumMainnet') {
    if (name === 'LivepeerToken') return getContract('livepeer-token-ethereum')
    if (name === 'BridgeMinter') return getContract('bridge-minter')
    if (name === 'L1LPTGateway') return getContract('l1-lpt-gateway')
    if (name === 'L1Escrow') return getContract('l1-escrow')
  }

  return null
}

const getExplorerBase = (chain) => {
  const meta = blockchainContractsPageData?.meta || {}

  if (chain === 'arbitrumOne') {
    return meta?.explorerUrls?.arbiscanAddress
      || `${meta?.explorerUrls?.arbiscan || 'https://arbiscan.io'}/address/`
  }

  if (chain === 'ethereumMainnet') {
    return meta?.explorerUrls?.etherscanAddress
      || `${meta?.explorerUrls?.etherscan || 'https://etherscan.io'}/address/`
  }

  return ''
}

export const codeHref = (chain, name, type = null) => {
  const contract = getNamedContract(chain, name)
  if (!contract) return null
  if (type === 'proxy') return contract.proxyContractCodeHref || contract.contractCodeHref || null
  if (type === 'target') return contract.targetContractCodeHref || contract.contractCodeHref || null
  return contract.contractCodeHref || null
}

export const explorerHref = (chain, name, type = null) => {
  const contract = getNamedContract(chain, name)
  if (!contract) return null
  if (type === 'proxy') return contract.proxyBlockchainHref || contract.blockchainHref || null
  if (type === 'target') return contract.targetBlockchainHref || contract.blockchainHref || null

  const address = contract.currentAddress || contract.proxyAddress || contract.targetAddress || null
  return contract.blockchainHref || (address ? `${getExplorerBase(chain)}${address}` : null)
}
