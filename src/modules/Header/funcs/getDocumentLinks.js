import { storageUrl } from '@/global/data/api'
import createRoute from '@/global/funcs/createRoute'

export default function (data = {}) {
  const object = {}
  for (const key in data) {
    try {
      const link = data?.[key]?.link
      if (link) {
        const downloadLink = JSON.parse(link || '{}')?.[0]?.['download_link']
        object[key] = {
          title: data?.[key]?.title || '',
          url: createRoute([storageUrl, downloadLink]),
        }
      }
    } catch (error) {
      console.warn(error)
    }
  }
  return object
}
