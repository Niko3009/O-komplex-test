'use client'

import routes from '@/global/routes'
import { useRedirect } from '@/hooks/useRedirect'
import { Image, Text, Button } from './components'

import styles from './RentBanner.module.scss'

import localDataFile from './data'
const localData = localDataFile?.data

export default function RentBanner() {
  const { text, ['button-text']: buttonText, img } = localData
  const redirect = useRedirect()
  return (
    <div className={styles.upperBanner}>
      <div className={styles.module}>
        <div className={styles.wrapper}>
          <div
            className={styles.innerBox}
            onClick={() => redirect(routes.trade)}
          >
            <Image
              src={img?.src || '#'}
              style={{ objectFit: 'cover' }}
              alt={'rent-banner'}
            />
            <Text>{text}</Text>
            <Button>{buttonText}</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
export { RentBanner }
