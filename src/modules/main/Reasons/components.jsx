'use client'

import { createContext, useContext } from 'react'
import Dot from '@/shared/icons/Dot'
import Animation from '@/containers/Animation'

import styles from './styles/Reasons.module.scss'

export function Items() {
  const moduleData = useContext(Context)

  const array = Array.isArray(moduleData) ? [...moduleData] : []
  const list = [...new Array(4)].map((item, i) => array[i] || {})

  return (
    <Animation
      duration={1000}
      animation={'slide-in-right'}
      anchor={`.${styles.wrapper}`}
      anchorPlacement={'bottom-bottom'}
    >
      <div className={styles.mainContent}>
        <div className={styles.middleLine} />
        <div className={styles.scrolled}>
          <div className={styles.reasonItems}>
            {list.map((data, i) => {
              const num = i + 1
              const cellNumber =
                data?.title || String(num >= 10 ? num : '0' + num)
              const text = data?.description

              return (
                <div className={styles.reasonItem} key={i}>
                  <NumCell {...{ num }}>{cellNumber}</NumCell>
                  <Reason {...{ num }}>{text}</Reason>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Animation>
  )
}

export function NumCell({ children, num }) {
  return (
    <div className={styles.numBox}>
      <div className={styles.numCell}>
        <ReasonsAnimation animation={'custom-fade-in-bottom'} num={num}>
          <div className={styles.cellContent}>
            <p>{children}</p>
          </div>
        </ReasonsAnimation>
      </div>
    </div>
  )
}

export function Reason({ num, children }) {
  return (
    <div className={styles.reasonBox}>
      <ReasonsAnimation animation={'custom-shutter-ver-top'} num={num}>
        <div className={styles.reasonContent}>
          <div className={styles.dottedLineBox}>
            <DottedLine />
          </div>
          <div className={styles.reasonText}>
            <p>{children}</p>
          </div>
        </div>
      </ReasonsAnimation>
    </div>
  )
}

function DottedLine() {
  const lineLength = 360
  const dotSize = 10
  const dotsNum = Math.round(lineLength / dotSize)
  const dots = [...new Array(dotsNum)].map((item, i) => (
    <div className={styles.dottedLineDot} key={i}>
      <Dot className={styles.icon} />
    </div>
  ))
  return <div className={styles.dottedLine}>{dots}</div>
}

function ReasonsAnimation({ animation, num, children }) {
  const baseAnimDelay = 1000
  const stepAnimDelay = 600
  const animDelay = num <= 4 ? baseAnimDelay + (num - 1) * stepAnimDelay : 0
  return (
    <Animation
      duration={1000}
      delay={animDelay}
      animation={animation}
      anchor={`.${styles.wrapper}`}
      anchorPlacement={'bottom-bottom'}
    >
      {children}
    </Animation>
  )
}

export const Context = createContext()
