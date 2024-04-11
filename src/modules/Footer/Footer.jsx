'use client'

import { useSelector } from 'react-redux'
import { getOptionsData } from '@/store/selectors/page'
import CopyrightIcon from './CopyrightIcon'

import styles from './Footer.module.scss'

export default function () {
  const optionsData = useSelector(getOptionsData)
  const footerData = optionsData?.footer
  const copyright = footerData?.copyright
  const documents = optionsData?.documents
  const policy = documents?.policy

  return (
    <div className={styles.module}>
      <footer className={styles.wrapper}>
        <div className={styles.leftBox}>
          <p>{copyright}</p>
          <a href={policy?.url} rel="nofollow" target="_blank">
            <p>{policy?.title}</p>
          </a>
        </div>

        <div className={styles.rightBox}>
          <div className={styles.copyrightIcon}>
            <a href="https://rosogroup.ru" rel="nofollow" target="_blank">
              <CopyrightIcon />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
