import classNames from 'classnames'
import Loader from '@/ui/Loader'

import styles from './styles/ContainersTrade.module.scss'

export function ListLoader({ isActive }) {
  const loaderColor = styles['blue-color']
  return (
    <div
      className={classNames(styles['loader-wrapper'], {
        [styles.disable]: !isActive,
      })}
    >
      <Loader isActive={isActive} color={loaderColor} />
    </div>
  )
}
