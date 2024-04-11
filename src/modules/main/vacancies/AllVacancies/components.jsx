'use client'

import { createContext, useContext, useState } from 'react'
import Button from '@/ui/Button'
import Arrow from '@/shared/icons/Arrow'

import styles from './AllVacancies.module.scss'

export function List() {
  const moduleData = useContext(Context)
  const list = Array.isArray(moduleData) ? [...moduleData] : []

  const [page, setPage] = useState(1)

  const itemPerPage = 6
  const shownItemsCount = page * itemPerPage
  const isLastPage = shownItemsCount >= list.length
  const shownItemsList = [...new Array(shownItemsCount)].map(
    (item, i) => list[i] || null
  )

  return (
    <div className={styles.dataBox}>
      <div className={styles.listBox}>
        {shownItemsList.map((data, i) => {
          if (data) return <Career {...{ data }} key={i} />
        })}
      </div>
      {!isLastPage && (
        <Button onClick={() => setPage(page + 1)} styleClass="grey">
          Показать ещё
        </Button>
      )}
    </div>
  )
}

export function Career({ data }) {
  return (
    <a href={data?.url || '#'} rel="nofollow" target="_blank">
      <div className={styles.careerBox}>
        <div className={styles.careerData}>
          <p className={styles.careerName}>{data?.name}</p>
          <p className={styles.careerConditions}>
            {data?.city || 'город не уточнен'}
            {' / '}
            {data.salary || 'з/п не уточнена'}
          </p>
        </div>
        <ArrowIcon />
      </div>
    </a>
  )
}

function StyledButton({ children }) {
  return (
    <div className={styles.buttonBox}>
      <Button styleClass={'grey'}>{children}</Button>
    </div>
  )
}
export { StyledButton as Button }

function ArrowIcon() {
  return (
    <div className={styles.arrowBox}>
      <Arrow styleClass={'blue'} className={styles.arrow} />
    </div>
  )
}
export { ArrowIcon as Arrow }

export const Context = createContext()
