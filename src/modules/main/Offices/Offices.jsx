'use client'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { getModulesData } from '@/store/selectors/page'
import Provider from '@/containers/ModuleContextProvider'
import Map, { Context as MapContext } from './Map'
import { List, Context as ListContext } from './components'

import styles from './Offices.module.scss'

export default function Offices() {
  const moduleName = 'offices'

  const modulesData = useSelector(getModulesData)
  const moduleData = modulesData?.[moduleName]?.data
  const list = Array.isArray(moduleData) ? [...moduleData] : []

  const [activeItemNum, setActiveItemNum] = useState(1)

  return (
    <Provider Context={ListContext} {...{ moduleName }}>
      <Provider Context={MapContext} {...{ moduleName }}>
        <div className={styles.module}>
          <div className={styles.wrapper}>
            <div className={styles.content}>
              <Map {...{ list, activeItemNum }} />
              <List {...{ activeItemNum, setActiveItemNum }} />
            </div>
          </div>
        </div>
      </Provider>
    </Provider>
  )
}
export { Offices }
