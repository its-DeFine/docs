import blockchainContractsPageData from '/snippets/data/contract-addresses/blockchainContractsPageData.json'

const getContract = (slug) => blockchainContractsPageData?.contracts?.[slug] || null
const getCurrentOrProxyAddress = (slug) =>
  getContract(slug)?.proxyAddress || getContract(slug)?.currentAddress || null

export const controller = getContract('controller')?.currentAddress || null
export const bondingManagerProxy = getCurrentOrProxyAddress('bonding-manager')
export const ticketBrokerProxy = getCurrentOrProxyAddress('ticket-broker')
export const roundsManagerProxy = getCurrentOrProxyAddress('rounds-manager')
export const minter = getContract('minter')?.currentAddress || null
export const serviceRegistryProxy = getCurrentOrProxyAddress('service-registry')
export const aiServiceRegistry = getContract('ai-service-registry')?.currentAddress || null
export const lptArb = getContract('livepeer-token-arbitrum')?.currentAddress || null
export const lptEth = getContract('livepeer-token-ethereum')?.currentAddress || null
export const bridgeMinter = getContract('bridge-minter')?.currentAddress || null
export const l2Gateway = getContract('l2-lpt-gateway')?.currentAddress || null
export const l1Gateway = getContract('l1-lpt-gateway')?.currentAddress || null
export const l1Escrow = getContract('l1-escrow')?.currentAddress || null
export const bondingVotesProxy = getCurrentOrProxyAddress('bonding-votes')
export const governor = getContract('governor')?.currentAddress || null
export const livepeerGovernorProxy = getCurrentOrProxyAddress('livepeer-governor')
export const treasury = getContract('treasury')?.currentAddress || null
export const l2Migrator = getCurrentOrProxyAddress('l2-migrator')
export const merkleSnapshot = getContract('merkle-snapshot')?.currentAddress || null
