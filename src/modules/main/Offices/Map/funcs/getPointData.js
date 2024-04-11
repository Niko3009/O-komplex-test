import { getPointDataBySearch } from './getPointDataBySearch'

const getPointData = async (ymaps, office) => {
  const address = office?.address
  const pointDataBySearch = await getPointDataBySearch(ymaps, address)
  const searchedPoint = pointDataBySearch.point
  return searchedPoint
}
export default getPointData
export { getPointData }
