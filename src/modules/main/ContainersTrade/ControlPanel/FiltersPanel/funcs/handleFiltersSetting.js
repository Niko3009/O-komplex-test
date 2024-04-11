export const extractFiltersSettings = (tradeMode, filtersSetting) => {
  const settingPrice = filtersSetting?.price

  const isRent = tradeMode === 'rent'
  const maxCost = settingPrice?.[isRent ? 'max_price' : 'max_price_tax']
  const minCost = settingPrice?.[isRent ? 'min_price' : 'min_price_tax']

  const containerTypes = filtersSetting?.['container_type'] || {}
  const containerQuals = filtersSetting?.['qualities'] || {}

  const availableLocs = filtersSetting?.locations?.[tradeMode] || []
  const availableLocsFrom = availableLocs?.['pick_count'] || []
  const availableLocsTo = availableLocs?.['drop_count'] || []

  return {
    maxCost,
    minCost,
    containerTypes,
    containerQuals,
    availableLocs,
    availableLocsFrom,
    availableLocsTo,
  }
}

export const getInitFilters = (tradeMode, filtersSetting) => {
  const { minCost, maxCost } = extractFiltersSettings(tradeMode, filtersSetting)

  const initFilters = { mode: tradeMode }
  initFilters.container = { num: null, type: 'all' }
  initFilters.quality = { num: null, type: 'all' }
  initFilters.cost = { from: minCost || 0, to: maxCost || 0 }
  initFilters.locations = { from: [], to: [] }

  return initFilters
}
