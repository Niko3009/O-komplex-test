import Image from '@/ui/Image'

import styles from './styles/Map.module.scss'

export default function CustomMap() {
  return (
    <div className={styles['map-box']}>
      <Image
        src={'/img/map-1.jpg'}
        fill
        priority
        style={{ objectFit: 'cover' }}
        alt={'map'}
        sizes="100%"
      />
    </div>
  )
}
export { CustomMap }
