'use client'

import Provider from '@/containers/ModuleContextProvider'
import { List, Context } from './components'
import BG from './BG'

import styles from './styles/Advantages.module.scss'

import localDataFile from './data'
const localData = localDataFile?.data

export default function Advantages() {
  const moduleName = 'advantages_work'
  const localList = localData?.list
  return (
    <Provider Context={Context} {...{ moduleName }}>
      <div className={styles.module}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <h2>Преимущества работы в компании</h2>
            <List localList={localList} />
          </div>
          <BG />
        </div>
      </div>
    </Provider>
  )
}
