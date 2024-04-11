'use client'

import Image from '@/ui/Image'
import { useSelector } from 'react-redux'
import { getModulesData } from '@/store/selectors/page'

import styles from './PhotoLine.module.scss'

export default function PhotoLine() {
  const modulesData = useSelector(getModulesData)
  const imagePath = modulesData?.['heading']?.data?.image
  return (
    <div className={styles.module}>
      <div className={styles.photoLine}>
        <Image
          src={imagePath}
          remote={true}
          fill
          priority
          style={{ objectFit: 'cover' }}
          alt={'PhotoLine'}
          sizes="100%"
        />
      </div>
    </div>
  )
}
