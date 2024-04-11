const getInitData = (list) => {
  const newList = []
  for (const item of list) {
    const name = item?.name || ''
    const address = item?.address || ''
    const givenPoint = item?.point || null
    const searchedPoint = null
    newList.push({ name, address, givenPoint, searchedPoint })
  }
  return newList
}
export default getInitData
export { getInitData }
