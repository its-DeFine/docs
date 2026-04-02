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

export const historicalCategoryTitle = (category) =>
  historicalCategoryConfig[category]?.title ||
  String(category || 'Historical')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())

export const historicalCategoryDescription = (category) =>
  historicalCategoryConfig[category]?.description || 'Historical contract versions grouped by generator-owned contract series'

export const historicalCategoryIconName = (category) =>
  historicalCategoryConfig[category]?.icon || 'clock-rotate-left'
