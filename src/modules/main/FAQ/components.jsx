'use client'

import { useState } from 'react'
import classNames from 'classnames'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'
import { getModulesData } from '@/store/selectors/page'
import { createContext, useContext } from 'react'
import Minus from '@/shared/icons/Minus'
import Plus from '@/shared/icons/Plus'

import styles from './styles/FAQ.module.scss'

export function List() {
  const modulesData = useSelector(getModulesData)
  const moduleData = modulesData?.['faqs']
  const faqs = Array.isArray(moduleData) ? [...moduleData] : []

  const [activeItemNum, setActiveItemNum] = useState(0)

  return (
    <div className={styles.listBox}>
      {faqs.map((data, i) => (
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
  return (
    <div
      className={classNames(styles.itemBox, {
        [styles.active]: isActive,
      })}
    >
      <ItemContext.Provider value={{ num, isActive, setActiveItemNum }}>
        <Question>{parse(data?.question || '?')}</Question>
        <Answer>{parse(data?.answer || '-')}</Answer>
      </ItemContext.Provider>
    </div>
  )
}

export function Question({ children }) {
  const { num, isActive, setActiveItemNum } = useContext(ItemContext)
  const changeActiveItemNum = () => {
    const newActiveItemNum = isActive ? 0 : num
    setActiveItemNum(newActiveItemNum)
  }
  return (
    <div className={styles.questionBox} onClick={() => changeActiveItemNum()}>
      <p>{children}</p>
      <PlusIcon />
    </div>
  )
}

export function Answer({ children }) {
  return (
    <div className={styles.answerBox}>
      <p>{children}</p>
    </div>
  )
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
