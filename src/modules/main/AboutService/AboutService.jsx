'use client'

import parse from 'html-react-parser'
import { useSelector } from 'react-redux'
import { getModulesData } from '@/store/selectors/page'

import styles from './AboutService.module.scss'

export default function AboutService() {
  const modulesData = useSelector(getModulesData)
  const text = modulesData?.['heading']?.data?.['text_description']
  return (
    <div className={styles.module}>
      <div className={styles.wrapper}>
        <h2>Об услуге</h2>
        <div className={styles.about}>
          <p>{parse(text || '')}</p>
        </div>
      </div>
    </div>
  )
}
export { AboutService }
