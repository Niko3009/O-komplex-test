'use client'

import { useSelector } from 'react-redux'
import parse from 'html-react-parser'
import { getModulesData } from '@/store/selectors/page'

import styles from './Heading.module.scss'

export default function Heading() {
  const modulesData = useSelector(getModulesData)
  const heading = modulesData?.['heading']?.data
  const title = heading?.title
  const description = heading?.description

  return (
    <div className={styles.module}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.titleBox}>
            <h1>{parse(title || 'Text')}</h1>
            {!!description && <p>{parse(description || 'Text')}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
export { Heading }
