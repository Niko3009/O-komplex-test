'use client'

import classNames from 'classnames'
import { createContext, useContext } from 'react'
import routes from '@/global/routes'
import { useRedirect } from '@/hooks/useRedirect'
import ArrowIcon from '@/shared/icons/Arrow'
import SVG from '@/ui/SVG'

import createRoute from '@/global/funcs/createRoute'

import styles from './AllServices.module.scss'

export function AllServices() {
  const moduleData = useContext(Context)
  const maxServices = 5
  const array = Array.isArray(moduleData) ? [...moduleData] : []
  const list = [...new Array(maxServices)].map((item, i) => array[i] || {})

  return (
    <div className={styles.allServicesBox}>
      {list.map((data, i) => (
        <Service {...{ data }} key={i} />
      ))}
    </div>
  )
}

export function Service({ data }) {
  const { slug, title, icon: iconPath } = data
  const src = iconPath

  const redirect = useRedirect()
  const servicePageRoute = createRoute([routes.services, slug])

  return (
    <div
      className={styles.serviceBox}
      onClick={() => redirect(servicePageRoute)}
    >
      <Arrow />
      <Icon {...{ src, slug }} />
      <Text>{title || 'Услуга'}</Text>
      <div className={styles.serviceBG} />
    </div>
  )
}

export function Icon({ src, slug }) {
  return (
    <div className={classNames(styles.icon)}>
      <SVG src={src} alt={slug} remote={true} />
    </div>
  )
}

export function Text({ children }) {
  return (
    <div className={styles.serviceNameBox}>
      <p className={styles.serviceName}>{children}</p>
      <div className={styles.serviceNameLine} />
    </div>
  )
}

function Arrow() {
  return (
    <div className={styles.arrow}>
      <div className={styles.rotationWrapper}>
        <ArrowIcon styleClass={'white'} />
      </div>
    </div>
  )
}

export const Context = createContext()
