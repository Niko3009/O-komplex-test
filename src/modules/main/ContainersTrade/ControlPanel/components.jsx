import classNames from 'classnames'
import Loader from '@/ui/Loader'
import Button from '@/ui/Button'
import SVG from '@/ui/SVG'

import styles from './styles/ControlPanel.module.scss'

export function FiltersLoader({ isActive }) {
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

export function Icon({ src }) {
  return (
    <div className={styles.buttonIcon}>
      <SVG src={src} />
    </div>
  )
}

export function TradeModeButton({ name, control, children }) {
  const { isActiveMode, updateTradeMode } = control
  return (
    <Button
      styleClass={isActiveMode(name) ? 'blue' : 'grey'}
      className={styles.tradeModeButton}
      onClick={() => updateTradeMode(name)}
      checkboxButton={true}
    >
      {children}
    </Button>
  )
}

export function FiltersPanelButton({ setModalOpen, children }) {
  return (
    <Button styleClass={'grey'} onClick={() => setModalOpen(true)}>
      {children}
    </Button>
  )
}
