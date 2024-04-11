export function getScrollX(
  clientWidth,
  scrollWidth,
  paddingRatio,
  dates,
  date
) {
  const linePadding = scrollWidth * paddingRatio
  const lineWidth = scrollWidth - 2 * linePadding

  const index = dates.indexOf(date)
  const stepsNum = dates.length - 1

  const stepWidth = lineWidth / stepsNum

  let newScrollX = index * stepWidth - clientWidth / 2
  if (index > 0) newScrollX += linePadding

  return newScrollX
}
