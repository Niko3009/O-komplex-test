export default function handleLocationValue({
  location,
  checked,
  locations,
  type,
}) {
  const array = [...locations[type]]
  if (checked) array.push(location)
  else array.splice(array.indexOf(location), 1)
  locations[type] = array
  return locations
}
export { handleLocationValue }
