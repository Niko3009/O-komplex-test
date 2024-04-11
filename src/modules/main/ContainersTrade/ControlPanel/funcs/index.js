import { PATH, apiAxios } from '@/global/data/api'

export const getFiltersSettings = async (mode) => {
  const url = PATH.page + '/trade'

  const params = { type: mode }
  const responseData = (await apiAxios.get(url, { params }))?.data

  const filtersSetting = responseData?.data?.modules?.filters?.data

  return filtersSetting
}
