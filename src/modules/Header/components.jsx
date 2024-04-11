'use client'

import Link from 'next/link'
import { useSelector } from 'react-redux'
import { getOptionsData } from '@/store/selectors/page'
import routes from '@/global/routes'
// import useRedirect from '@/hooks/useRedirect'
import SVG from '@/ui/SVG'

import styles from './styles/Header.module.scss'

export function Logo() {
  // const redirect = useRedirect()
  const optionsData = useSelector(getOptionsData)
  const logoPath = optionsData?.header?.logo
  return (
    <div className={styles.logoBox}>
      <div className={styles.logo}>
        <Link href={routes.homepage}>
          <SVG src={logoPath || '/svg/logo.svg'} remote={!!logoPath} />
        </Link>
      </div>
    </div>
  )
}
