export const getParamsByFilters = (filters, onRequest) => {
  const { mode, cost, container, locations, quality } = filters

  if (!mode) return
  const priceMin = cost?.from
  const priceMax = cost?.to
  const containerType = container?.num
  const containerQuality = quality?.num

  const from = locations?.from?.map(
    (loc) => loc?.[mode === 'rent' ? 'city_pick_id' : 'city_id']
  )
  const to = locations?.to?.map((loc) => loc?.['city_drop_id'])

  const params = { type: mode }
  if (priceMin) params['price_min'] = priceMin
  if (priceMax) params['price_max'] = priceMax
  if (containerType) params['container_type'] = containerType
  if (onRequest) params['on_request'] = 1

  if (mode === 'rent') {
    if (from.length > 0) params['cities_pick_id'] = from
    if (to.length > 0) params['cities_drop_id'] = to
  } else {
    if (from.length > 0) params['cities_id'] = from
    if (containerQuality) params['quality'] = containerQuality
  }

  return params
}
export default getParamsByFilters
