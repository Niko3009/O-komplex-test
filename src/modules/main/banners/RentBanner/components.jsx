'use client'

import SVG from '@/ui/SVG'
import Button from '@/ui/Button'

import styles from './RentBanner.module.scss'

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

function StyledButton({ children }) {
  return (
    <div className={styles.buttonBox}>
      <div className={styles.buttonLayout}>
        <Button styleClass={'white'} hoverTransparencyStyle={true}>
          {children}
        </Button>
      </div>
    </div>
  )
}
export { StyledButton as Button }
