'use client'

import routes from '@/global/routes'
import { useRedirect } from '@/hooks/useRedirect'
import Button from '@/ui/Button'

import styles from './styles/Banner404.module.scss'

export function Banner({ children }) {
  return <div className={styles.bannerBox}>{children}</div>
}

function StyledButton({ children, href = routes.homepage }) {
  const redirect = useRedirect()
  return (
    <div className={styles.buttonBox}>
      <Button styleClass={'white'} onClick={() => redirect(href)}>
        {children}
      </Button>
    </div>
  )
}
export { StyledButton as Button }
