'use client'

import classNames from 'classnames'
import Map from './Map'
import { Title } from './components'

import styles from './styles/ContainersMap.module.scss'

export default function ContainersMap() {
  return (
    <div
      className={classNames(styles.module, 'containers-map')}
      id="containers-map"
    >
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <Title>География наших контейнеров</Title>
          <Map />
        </div>
      </div>
    </div>
  )
}
export { ContainersMap }
