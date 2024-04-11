'use client'

import classNames from 'classnames'
import { useEffect, useRef } from 'react'
import getXPath from '@/global/funcs/getXPath'

import styles from './ScrollBox.module.scss'

export default function Scroll({
  isHorizontalScrolling = false,
  isVerticalScrolling = false,
  className = null,
  children,
}) {
  const ref = useRef(null)

  useEffect(() => {
    const target = ref.current
    const scrollKey = `scrollbox: ${getXPath(target)}`
    const scrollTop = localStorage.getItem(scrollKey)
    if (scrollTop) target.scrollTo({ top: scrollTop, behavior: 'smooth' })

    const makeScrollMark = () =>
      localStorage.setItem(scrollKey, target.scrollTop)
    target.addEventListener('scroll', makeScrollMark, false)

    return () => {
      localStorage.removeItem(scrollKey)
    }
  }, [ref])

  return (
    <div
      className={classNames(styles.wrapper, {
        [styles['x-scroll']]: isHorizontalScrolling,
        [styles['y-scroll']]: isVerticalScrolling,
        [styles['default']]: !className,
        [className]: !!className,
      })}
      ref={ref}
    >
      {children}
    </div>
  )
}
export { Scroll }
