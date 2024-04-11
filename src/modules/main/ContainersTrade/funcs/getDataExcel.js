import { PATH, apiAxios } from '@/global/data/api'
import getParamsByFilters from './getParamsByFilters'

const getDataExcel = async (filters) => {
  const url = PATH.export + '/to-excel'

  const params = getParamsByFilters(filters, false)
  const responseData = await apiAxios.get(url, { params })

  const fileData = responseData?.data
  const file = fileData?.file || null
  const status = fileData && fileData?.status && file

  return { status, file }
}
export default getDataExcel
export { getDataExcel }
