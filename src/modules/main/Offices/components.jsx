'use client'

import classNames from 'classnames'
import parse from 'html-react-parser'
import { createContext, useContext } from 'react'
import Plus from '@/shared/icons/Plus'
import Minus from '@/shared/icons/Minus'

import styles from './Offices.module.scss'

export function List({ activeItemNum, setActiveItemNum }) {
  const moduleData = useContext(ModuleContext)
  const list = Array.isArray(moduleData) ? [...moduleData] : []
  return (
    <div className={styles.officesListBox}>
      {list.map((data, i) => (
        <Item
          data={data}
          num={i + 1}
          {...{ activeItemNum, setActiveItemNum }}
          key={i}
        />
      ))}
    </div>
  )
}

export function Item({ data, num, activeItemNum, setActiveItemNum }) {
  const isActive = activeItemNum === num

  const city = data?.name
  const address = data?.address
  const worktime = data?.worktime
  const phone = data?.phone
  const email = data?.email

  return (
    <div
      className={classNames(styles.itemBox, {
        [styles.active]: isActive,
      })}
    >
      <ItemContext.Provider value={{ num, isActive, setActiveItemNum }}>
        <Address>
          <h3> {city} </h3>
          <h4> {address} </h4>
          <p> {worktime} </p>
        </Address>
        {phone && (
          <Details>
            <p>Телефоны</p>
            <h4>{parse(phone || '')}</h4>
          </Details>
        )}
        {email && (
          <Details>
            <p>Email</p>
            <h4>{parse(email || '')}</h4>
          </Details>
        )}
      </ItemContext.Provider>
    </div>
  )
}

export function Address({ children }) {
  const { num, isActive, setActiveItemNum } = useContext(ItemContext)
  const changeActiveItemNum = () => {
    const newActiveItemNum = isActive ? 0 : num
    setActiveItemNum(newActiveItemNum)
  }
  return (
    <div className={styles.officeBox} onClick={() => changeActiveItemNum()}>
      <div className={styles.office}>{children}</div>
      <PlusIcon />
    </div>
  )
}

export function Details({ children }) {
  return <div className={styles.detailsBox}>{children}</div>
}

function PlusIcon() {
  const { isActive } = useContext(ItemContext)
  const Icon = isActive ? Minus : Plus
  return (
    <div className={styles.iconBox}>
      <Icon className={styles.icon} />
    </div>
  )
}

const ItemContext = createContext()
const ModuleContext = createContext()
export { ModuleContext as Context }
