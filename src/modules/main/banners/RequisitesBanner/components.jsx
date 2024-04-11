import StyledButton from '@/ui/Button'
import SVG from '@/ui/SVG'

import styles from './Requisites.module.scss'

export function Text({ src, children }) {
  return (
    <div className={styles.messageBox}>
      <div className={styles.icon}>
        <SVG src={src} />
      </div>
      <div className={styles.textBox}>
        <h3>{children}</h3>
      </div>
    </div>
  )
}

export function LicenseButton({ children, onClick }) {
  return (
    <StyledButton
      styleClass={'white'}
      hoverTransparencyStyle={true}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  )
}

export function RequisitesButton({ children, onClick }) {
  return (
    <StyledButton
      styleClass={'white'}
      hoverTransparencyStyle={true}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  )
}
