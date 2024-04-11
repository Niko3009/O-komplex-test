export default function handleCostValue({ cost, maxCost, minCost }) {
  if (cost.from > cost.to) cost.to = cost.from
  for (let key in cost) {
    if (cost[key] <= minCost) cost[key] = minCost
    if (cost[key] >= maxCost) cost[key] = maxCost
  }

  return cost
}
export { handleCostValue }
