'use client'

import { createContext, useContext } from 'react'
import StyledButton from '@/ui/Button'
import LinkArrow from '@/shared/icons/Arrow'
import routes from '@/global/routes'
import { useRedirect } from '@/hooks/useRedirect'

import styles from './ProposedVacancies.module.scss'

export function List() {
  const moduleData = useContext(Context)

  const array = Array.isArray(moduleData) ? [...moduleData] : []
  const list = [...new Array(1)].map((item, i) => array[i] || {})

  return (
    <div className={styles.listBox}>
      {list.map((data, i) => (
        <Career data={data} key={i} />
      ))}
    </div>
  )
}

export function Career({ data }) {
  const url = data?.url || '#'
  return (
    <a href={url} rel="nofollow" target="_blank">
      <div className={styles.careerBox}>
        <div className={styles.careerData}>
          <p className={styles.careerName}>{data?.name || 'Career'}</p>
          <p className={styles.careerConditions}>
            {data?.city || 'city'} / {data?.salary || 'salary'}
          </p>
        </div>
        <Arrow />
      </div>
    </a>
  )
}

export function Button({ children }) {
  const redirect = useRedirect()
  return (
    <div className={styles.buttonBox}>
      <StyledButton
        styleClass={'grey'}
        onClick={() => redirect(routes.vacancies)}
      >
        {children}
      </StyledButton>
    </div>
  )
}

export function Arrow() {
  return (
    <div className={styles.arrowBox}>
      <LinkArrow styleClass={'blue'} className={styles.arrow} />
    </div>
  )
}

export const Context = createContext()
