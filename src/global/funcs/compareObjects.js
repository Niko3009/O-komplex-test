const compareObjects = (obj1, obj2) => {
  const areObjectsSame = JSON.stringify(obj1) === JSON.stringify(obj2)
  return areObjectsSame
}
export { compareObjects }
export default compareObjects
