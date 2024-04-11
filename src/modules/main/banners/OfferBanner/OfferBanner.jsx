'use client'

import { useSelector } from 'react-redux'
import { storageUrl } from '@/global/data/api'
import { getModulesData } from '@/store/selectors/page'
import { Text, Button } from './components'

import createRoute from '@/global/funcs/createRoute'

import styles from './styles/OfferBanner.module.scss'

import localDataFile from './data'
const localData = localDataFile?.data

export default function OfferBanner() {
  const moduleName = 'commercial-offer'
  const modulesData = useSelector(getModulesData)
  const moduleData = modulesData?.[moduleName]?.data

  const title = moduleData?.title || localData?.text
  const img = moduleData?.img || localData?.img

  const fileLink = JSON.parse(moduleData?.file || '{}')?.[0]?.['download_link']
  const fileURL = createRoute([storageUrl, fileLink])

  return (
    <div className={styles.module}>
      <div className={styles.wrapper}>
        <div
          className={styles.innerBox}
          onClick={() => window.open(fileURL, '_blank')}
        >
          <Text src={img?.src}>{title}</Text>
          <Button>{localData?.['button-text']}</Button>
        </div>
      </div>
    </div>
  )
}
export { OfferBanner }
