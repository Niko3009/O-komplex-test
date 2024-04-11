'use client'

import SVG from '@/ui/SVG'
import StyledButton from '@/ui/Button'

import styles from './HeadHunter.module.scss'

export function Image({ src }) {
  return (
    <div className={styles.imageBox}>
      <SVG src={src} />
    </div>
  )
}

export function Text({ children }) {
  return (
    <div className={styles.messageBox}>
      <div className={styles.textBox}>
        <h3>{children}</h3>
      </div>
    </div>
  )
}

export function Button({ children }) {
  return (
    <div className={styles.buttonBox}>
      <div className={styles.buttonLayout}>
        <StyledButton styleClass={'white'} hoverTransparencyStyle={true}>
          {children}
        </StyledButton>
      </div>
    </div>
  )
}
