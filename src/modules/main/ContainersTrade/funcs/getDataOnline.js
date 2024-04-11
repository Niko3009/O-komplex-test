import { PATH, apiAxios } from '@/global/data/api'
import getParamsByFilters from './getParamsByFilters'

const getDataOnline = async (filters, onRequest, requestPage = 1) => {
  let returnData = { list: [], page: 0, pages: 0 }

  const url = PATH.page + '/trade'

  const params = getParamsByFilters(filters, onRequest)
  if (requestPage > 1) params.page = requestPage
  const response = await apiAxios.get(url, { params })
  const responseData = response?.data

  const resultDataTypeSection = onRequest
    ? responseData?.['on_request']
    : responseData?.data?.modules
  const resultData = resultDataTypeSection?.[params?.type]?.data

  returnData.list = resultData?.data
  returnData.page = resultData?.['current_page']
  returnData.pages = resultData?.['last_page']
  return returnData
}
export default getDataOnline
export { getDataOnline }
