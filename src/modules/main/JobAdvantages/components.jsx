'use client'

import parse from 'html-react-parser'
import { createContext, useContext } from 'react'
import SVG from '@/ui/SVG'

import styles from './styles/Advantages.module.scss'

export function List() {
  const moduleData = useContext(Context)
  const remoteList = Array.isArray(moduleData) ? [...moduleData] : []
  const list = remoteList
  return (
    <div className={styles['advantages-list-box']}>
      {list.map((data, i) => (
        <Item {...{ data }} key={i} />
      ))}
    </div>
  )
}

export function Item({ data }) {
  const title = data?.title || 'Advantage'
  const description = data?.description || 'Description'
  const iconLink = JSON.parse(data?.icon || '{}')?.[0]?.['download_link']
  return (
    <div className={styles.advantageBox}>
      <Icon src={iconLink} />

      <div className={styles.advantageText}>
        <h3>{parse(title)}</h3>
        <p>{parse(description)}</p>
      </div>
    </div>
  )
}

export function Icon({ src }) {
  return (
    <div className={styles.serviceIcon}>
      <SVG src={src} remote={true} />
    </div>
  )
}

export const Context = createContext()
