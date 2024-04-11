import { apiAxios } from '@/global/data/api'
import { getPointDataBySearch } from './getPointDataBySearch'

const getPointsData = async (ymaps) => {
  const url = '/api/map'
  const responseData = (await apiAxios.get(url))?.data || []

  let dataList = []
  for (const item of responseData) {
    const address = `${item?.['city_pick']}, ${item?.['country_pick'] || ''}`
    const givenPoint = JSON.parse(item?.['coords'] || '{}')?.['coordinates']
    const containerCount = Number(item?.['container_count']) || 0

    const pointDataBySearch = await getPointDataBySearch(ymaps, address)
    const searchedPoint = pointDataBySearch.point || [0, 0]

    dataList.push({ address, givenPoint, searchedPoint, containerCount })
  }
  return dataList
}
export default getPointsData
export { getPointsData }
