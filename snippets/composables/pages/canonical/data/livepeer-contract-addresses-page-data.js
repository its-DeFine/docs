import { getActiveTableItems } from './livepeer-contract-addresses-active-table.js'
import { getProxyTableItems } from './livepeer-contract-addresses-proxy-table.js'
import {
  buildCategoryAccordionRows,
  getLegacyOperationalTableItems,
  getMigrationResidualTableItems,
  getPausedTableItems,
} from './livepeer-contract-addresses-history-tables.js'
import {
  historicalCategoryDescription,
  historicalCategoryIconName,
  historicalCategoryTitle,
} from './livepeer-contract-addresses-history-labels.js'

export const getEthereumActiveNameList = (sourceData = {}) =>
  (sourceData?.ethereumMainnet?.active || sourceData?.ethereumMainnet?.current || [])
    .map((contract) => contract.name)
    .join(', ')

export {
  buildCategoryAccordionRows,
  getProxyTableItems,
  getActiveTableItems,
  getPausedTableItems,
  getMigrationResidualTableItems,
  getLegacyOperationalTableItems,
  historicalCategoryTitle,
  historicalCategoryDescription,
  historicalCategoryIconName,
}

export default {
  buildCategoryAccordionRows,
  getEthereumActiveNameList,
  getProxyTableItems,
  getActiveTableItems,
  getPausedTableItems,
  getMigrationResidualTableItems,
  getLegacyOperationalTableItems,
  historicalCategoryTitle,
  historicalCategoryDescription,
  historicalCategoryIconName,
}
