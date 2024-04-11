const getPointDataBySearch = (ymaps, place) => {
  return ymaps
    .geocode(place, { results: 1 })
    .then((r) => {
      let geo = r.geoObjects.toArray()[0]
      let data = geo.properties.get('metaDataProperty').GeocoderMetaData
      let point = geo.geometry.getCoordinates()
      let result = {
        point: point,
        place: place,
        kind: data.kind,
        precision: data.precision,
        text: data.text,
      }
      // console.log(result)
      return result
    })
    .catch(() => {
      // console.log(e)
      let result = {
        place: place,
        point: 'geocoding error',
        text: null,
        kind: null,
        precision: null,
      }
      return result
    })
}
export default getPointDataBySearch
export { getPointDataBySearch }
