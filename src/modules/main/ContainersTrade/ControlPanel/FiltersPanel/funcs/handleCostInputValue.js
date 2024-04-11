export default function handleCostInputValue(newValue, oldValue) {
  let cost = newValue
  if (cost.indexOf('$') < 0) {
    if (oldValue !== 0) cost = cost.substring(0, cost.length - 1)
  }
  if (cost.indexOf('$') === cost.length - 1) {
    cost = cost.substring(0, cost.length - 1)
  }
  if (cost.indexOf('$') === cost.length - 2) {
    cost =
      cost.substring(0, cost.length - 2) +
      cost.substring(cost.length - 1, cost.length)
  }

  if (cost === '') return 0
  if (isNaN(cost)) return NaN
  return Number(cost)
}
export { handleCostInputValue }
