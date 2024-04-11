'use client'

import { useSelector } from 'react-redux'
import { getModulesData } from '@/store/selectors/page'
import { Image, Text, Button } from './components'

import styles from './HeadHunter.module.scss'

import localDataFile from './data'
const localData = localDataFile?.data

export default function () {
  const moduleName = 'hh-page'
  const modulesData = useSelector(getModulesData)
  const moduleData = modulesData?.[moduleName]?.data

  const { img } = localData
  const { ['button-text']: buttonText } = localData
  const text = moduleData?.title || localData?.text
  const url = moduleData?.url || localData?.url

  return (
    <div className={styles.module}>
      <div className={styles.wrapper}>
        <div
          className={styles.innerBox}
          onClick={() => window.open(url, '_blank')}
        >
          <Image
            src={img?.src}
            style={{ objectFit: 'cover' }}
            alt="head-hunter"
          />
          <Text>{text}</Text>
          <Button>{buttonText}</Button>
        </div>
      </div>
    </div>
  )
}
