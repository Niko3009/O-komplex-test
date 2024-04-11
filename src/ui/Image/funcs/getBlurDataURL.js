import getPlaiceholder from './funcs/getPlaiceholder'

const getBlurDataURL = async (src) => {
  const response = await fetch(src)
  const arrayBuffer = await response.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const plaiceholderData = await getPlaiceholder(buffer)
  return plaiceholderData
}
export { getBlurDataURL }
export default getBlurDataURL
