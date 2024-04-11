'use client'

import Image from '@/ui/Image'
import classNames from 'classnames'

import styles from './SVG.module.scss'

export default function SVG({ src, remote, alt = 'SVG', className = null }) {
  return (
    <div
      className={classNames(styles.wrapper, {
        [className]: !!className,
      })}
    >
      <Image
        src={src}
        remote={remote}
        fill
        priority
        style={{ objectFit: 'contain' }}
        alt={alt}
      />
    </div>
  )
}
export { SVG }
