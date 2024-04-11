'use client'

import parse from 'html-react-parser'
import { useSelector } from 'react-redux'
import Image from '@/ui/Image'
import { getModulesData } from '@/store/selectors/page'
import { createContext, useContext } from 'react'

import styles from './AboutCompanyHeading.module.scss'

export function Title() {
  const moduleData = useContext(Context)
  return (
    <div className={styles.titleBox}>
      <h1>{moduleData?.title || 'Title'}</h1>
    </div>
  )
}

function CustomImage() {
  const moduleData = useContext(Context)
  const { image: imagePath } = moduleData
  return (
    <div className={styles.imgBox}>
      <div className={styles.img}>
        <Image
          src={imagePath}
          remote={true}
          fill
          priority
          style={{ objectFit: 'cover' }}
          alt={'company-info'}
          sizes="100%"
        />
      </div>
    </div>
  )
}
export { CustomImage as Image }

export function UpperText() {
  const moduleData = useContext(Context)
  const text = moduleData?.description
  return (
    <div className={styles.upperTextBox}>
      <p>{parse(text || 'Text')}</p>
    </div>
  )
}

export function LowerText() {
  const moduleData = useSelector(getModulesData)?.['text-block']
  const text = moduleData?.text
  return <div className={styles.lowerTextBox}>{parse(text || 'Text')}</div>
}

export function WhiteSqure() {
  return (
    <div className={styles.whiteSqureBox}>
      <div className={styles.whiteSqure} />
    </div>
  )
}

export const Context = createContext()
