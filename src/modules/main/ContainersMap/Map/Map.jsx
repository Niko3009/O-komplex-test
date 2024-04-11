'use client'

import classNames from 'classnames'
import { createContext } from 'react'
import { useState, useEffect, useRef } from 'react'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps'
import { API_KEY } from '@/global/data/map'

import getPointsData from './funcs/getPointsData'

import './styles/Map.scss'
import styles from './styles/Map.module.scss'

export default function CustomMap() {
  const [ymaps, setYmaps] = useState()
  const [map, setMap] = useState()
  const mapRef = useRef()

  const [data, setData] = useState([])
  const setPointsData = async (ymaps) => setData(await getPointsData(ymaps))
  const points = data

  const query = { load: 'package.full', apikey: API_KEY }
  const controls = ['zoomControl', 'fullscreenControl']
  const mapData = { zoom: 3, center: [55.58, 37.61], controls }
  const verticalLimit = 85.05
  const options = {
    restrictMapArea: [
      [verticalLimit, 190],
      [-verticalLimit, 189.9],
    ],
  }
  // const upperMapLimit = [85.05, -178.9]
  // const lowerMapLimit = [-73.87011, 180]
  // const options = { minZoom: 1, restrictMapArea: true }
  const style = { width: '100%', height: '100%' }

  useEffect(() => {
    if (ymaps) ymaps.ready(() => setMap(mapRef.current))
  }, [ymaps])

  useEffect(() => {
    if (map) setPointsData(ymaps)
  }, [map])

  useEffect(() => {
    setMapLayer(ymaps, map)
  }, [map])

  return (
    <div className={classNames(styles['map-box'], 'containers-map__map-box')}>
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
          {points.map((data, i) => (
            <Point {...{ data }} key={i} />
          ))}
        </Map>
      </YMaps>
    </div>
  )
}
export { CustomMap as Map }

function Point({ data }) {
  const text = `${data?.address}: ${data?.containerCount} контейнеров`
  const coords = data?.searchedPoint || data?.givenPoint

  const properties = {
    hintContent: text,
    balloonContent: text,
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

function setMapLayer(ymaps, map) {
  const tilesUrl = `https://core-renderer-tiles.maps.yandex.net/tiles?%c&%l&l=map&theme=light`
  // 'http://tile.openstreetmap.org/%z/%x/%y.png'

  const layers = map?.layers
  const projection = ymaps?.projection?.sphericalMercator
  if (layers) layers.add(new ymaps.Layer(tilesUrl, { projection }))
}

const Context = createContext()
export { Context }

// const apiMapsUrl = `https://api-maps.yandex.ru/v3/?apikey=${API_KEY}&lang=ru_RU`

// import { Helmet } from 'react-helmet'
// <Helmet> <script src={apiMapsUrl} /> </Helmet>

// {
//         autoFitToViewport?: "none" | "ifNull" | "always" | undefined;
//         avoidFractionalZoom?: boolean | undefined;
//         exitFullscreenByEsc?: boolean | undefined;
//         fullscreenZIndex?: number | undefined;
//         mapAutoFocus?: boolean | undefined;
//         maxAnimationZoomDifference?: number | undefined;
//         maxZoom?: number | undefined;
//         minZoom?: number | undefined;
//         nativeFullscreen?: boolean | undefined;
//         projection?: IProjection | undefined;
//         restrictMapArea?: boolean | number[][] | undefined;
//         suppressMapOpenBlock?: boolean | undefined;
//         suppressObsoleteBrowserNotifier?: boolean | undefined;
//         yandexMapAutoSwitch?: boolean | undefined;
//         yandexMapDisablePoiInteractivity?: boolean | undefined;
// }
