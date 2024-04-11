'use client'

import { useEffect, Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { useGetOptionsDataQuery } from '@/store/api/page'
import { setOptionsData } from '@/store/slices/page'
import FixedNav from './FixedNav'
import DroppedNav from './DroppedNav'
import { Logo } from './components'

import getDocumentLinks from './funcs/getDocumentLinks'

import styles from './styles/Header.module.scss'

export default function () {
  const response = useGetOptionsDataQuery()
  const dispatch = useDispatch()
  const { data } = response

  useEffect(() => {
    if (data) {
      const documents = getDocumentLinks(data?.footer)
      dispatch(setOptionsData({ ...data, documents }))
    }
  })

  return (
    <div className={styles.module}>
      <header className={styles.wrapper}>
        <div className={styles.content}>
          <Logo />
          <Nav />
        </div>
      </header>
    </div>
  )
}

function Nav() {
  return (
    <Fragment>
      <FixedNav />
      <DroppedNav />
    </Fragment>
  )
}
