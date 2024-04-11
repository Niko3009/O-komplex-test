'use client'

import classNames from 'classnames'
import { createContext } from 'react'
import { useState, useEffect, useRef } from 'react'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps' // SearchControl, TypeSelector
import { API_KEY } from '@/global/data/map'
import useDebounce from '@/hooks/useDebounce'

import getPointData from './funcs/getPointData'
import getInitData from './funcs/getInitData'

import styles from './styles/Map.module.scss'

export default function CustomMap({ list, activeItemNum }) {
  const [ymaps, setYmaps] = useState()
  const [map, setMap] = useState()
  const mapRef = useRef()

  const [data, setData] = useState([])

  const getData = useDebounce(
    async (ymaps, data, office) => {
      try {
        const searchedPointData = await getPointData(ymaps, office)
        console.log(structuredClone(office))
        if (Array.isArray(searchedPointData)) {
          data[activeItemNum - 1].searchedPoint = searchedPointData
          setData([...data])
        }
      } catch (error) {
        console.warn(error)
      }
    },
    1000,
    [activeItemNum]
  )

  const office = data?.[activeItemNum - 1]
  const officeName = office?.name || 'Офис'
  const officePoint = office?.givenPoint || office?.searchedPoint
  const centerPoint = officePoint || [0, 0]

  const query = { load: 'package.full', apikey: API_KEY }
  const controls = ['zoomControl', 'fullscreenControl']
  const mapData = { center: centerPoint, zoom: 15, controls }
  // const verticalLimit = 85.05
  const options = {
    restrictMapArea: [
      [80, 190],
      [-80, 189.9],
    ],
  }
  const style = { width: '100%', height: '100%' }

  useEffect(() => {
    if (ymaps) ymaps.ready(() => setMap(mapRef.current))
  }, [ymaps])

  useEffect(() => {
    if (list?.length !== data?.length) {
      const initListData = getInitData(list)
      setData(initListData)
    }
  }, [list])

  useEffect(() => {
    const isSearchedPointRequired = !office?.searchedPoint
    if (map && isSearchedPointRequired) getData(ymaps, data, office)
  }, [map, ymaps, data, office])

  return (
    <div className={classNames(styles['map-box'], 'offices-map__map-box')}>
      <YMaps query={query}>
        <Map
          state={mapData}
          defaultState={mapData}
          instanceRef={mapRef}
          modules={['geocode']}
          options={options}
          style={style}
          onLoad={(ymaps) => setYmaps(ymaps)}
        >
          <Point data={{ coords: officePoint, name: officeName }} />
        </Map>
      </YMaps>
    </div>
  )
}
export { CustomMap as Map }

function Point({ data }) {
  const { coords, name } = data

  const properties = {
    hintContent: name,
    balloonContent: name,
  }
  const options = {
    iconLayout: 'default#image',
    iconImageHref: '/svg/pin-logo.svg',
    iconImageSize: [60, 60],
  }

  return (
    <Placemark geometry={coords} options={options} properties={properties} />
  )
}

const Context = createContext()
export { Context }
