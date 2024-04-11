'use client'

import { useSelector } from 'react-redux'
import { getModulesData } from '@/store/selectors/page'
import { List } from './components'
import Pattern from './Pattern'

import styles from './styles/FAQ.module.scss'

export default function FAQ() {
  const modulesData = useSelector(getModulesData)
  const moduleData = modulesData?.['faqs']
  if (!moduleData) return <></>

  return (
    <div className={styles.module}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.titleBox}>
            <h2>Частые вопросы</h2>
          </div>
          <List />
          <Pattern />
        </div>
      </div>
    </div>
  )
}
export { FAQ }
