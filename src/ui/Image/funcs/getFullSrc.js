import { storageUrl } from '@/global/data/api'
import createRoute from '@/global/funcs/createRoute'

import { plugSrc } from '@/ui/Image'

const getFullSrc = (src, isRemote) => {
  let fullSrc
  if (!src) {
    fullSrc = plugSrc
  } else {
    if (isRemote) {
      fullSrc = createRoute([storageUrl, src])
    } else {
      fullSrc = src
      if (src[0] !== '/') fullSrc = '/' + fullSrc
    }
  }
  return fullSrc
}
export { getFullSrc }
export default getFullSrc
