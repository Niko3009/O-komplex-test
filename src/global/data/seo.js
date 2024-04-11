import { PATH, apiAxios } from '@/global/data/api'
import createRoute from '@/global/funcs/createRoute'

export async function getSeo(pageDataPath) {
  const url = createRoute([PATH.page, pageDataPath])
  const responseData = (await apiAxios.get(url))?.data || {}
  const seoData = responseData?.data
  const { seo, og, modules } = seoData
  return { seo, og, modules }
}
