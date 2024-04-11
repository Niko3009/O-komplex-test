'use client'

import classNames from 'classnames'
import { createContext, useContext } from 'react'
import routes from '@/global/routes'
import Animation from '@/containers/Animation'
import { useRedirect } from '@/hooks/useRedirect'
import ArrowIcon from '@/shared/icons/Arrow'
import Button from '@/ui/Button'
import SVG from '@/ui/SVG'

import createRoute from '@/global/funcs/createRoute'

import styles from './ProposedServices.module.scss'

export function AllServices({ children }) {
  const moduleData = useContext(Context)
  const maxServices = 4
  const array = Array.isArray(moduleData) ? [...moduleData] : []
  const list = [...new Array(maxServices)].map((item, i) => array[i] || {})
  return (
    <div className={styles.allServicesBox}>
      {list.map((data, i) => (
        <Service {...{ data }} key={i} />
      ))}
      {children}
    </div>
  )
}

function StyledButton({ children }) {
  const redirect = useRedirect()
  return (
    <div className={styles.buttonBox}>
      <ServicesAnimation animation={'custom-shutter-ver-bottom'}>
        <ServicesAnimation animation={'custom-fade-in'}>
          <Button
            styleClass={'white'}
            onClick={() => redirect(routes.services)}
          >
            {children}
          </Button>
        </ServicesAnimation>
      </ServicesAnimation>
    </div>
  )
}
export { StyledButton as Button }

export function Service({ data }) {
  const { slug, title, icon: iconPath } = data

  const redirect = useRedirect()
  const servicePageRoute = createRoute([routes.services, slug])

  return (
    <ServicesAnimation animation={'custom-shutter-ver-bottom'}>
      <ServicesAnimation animation={'custom-fade-in'}>
        <div
          className={styles.serviceBox}
          onClick={() => redirect(servicePageRoute)}
        >
          <Arrow />
          <Icon src={iconPath} {...{ slug }} />
          <Text>{title || 'Услуга'}</Text>
          <div className={styles.serviceBG} />
        </div>
      </ServicesAnimation>
    </ServicesAnimation>
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

function ServicesAnimation({ children, animation }) {
  return (
    <Animation
      duration={1000}
      animation={animation}
      anchorPlacement={'center-bottom'}
    >
      {children}
    </Animation>
  )
}

export const Context = createContext()
