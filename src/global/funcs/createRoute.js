const createRoute = (partsArray) => {
  if (!Array.isArray(partsArray)) return ''
  const path = partsArray.join('/')
  return path
}
export { createRoute }
export default createRoute
