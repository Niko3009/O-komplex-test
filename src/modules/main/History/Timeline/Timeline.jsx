import classNames from 'classnames'
import { useEffect, useRef } from 'react'
import * as SVGs from './SVGs'

import { getScrollX } from './funcs'

import styles from './Timeline.module.scss'

export default function Timeline({ date = 2023, dates, updateDate }) {
  const ref = useRef(null)
  const choseDate = (year) => updateDate(year)
  const isDate = (year) => date === year

  useEffect(() => {
    const TimelineContent = ref?.current
    if (TimelineContent) {
      const clientWidth = TimelineContent.clientWidth
      const scrollWidth = TimelineContent.scrollWidth
      const paddingRatio = 54 / 1360
      TimelineContent.scrollTo({
        left: getScrollX(clientWidth, scrollWidth, paddingRatio, dates, date),
        behavior: 'smooth',
      })
    }
  }, [ref, date])

  return (
    <div className={styles.timelineBox}>
      <div className={styles.timelineContent} ref={ref}>
        <Dates {...{ dates, choseDate, isDate }} />
        <DottedLine />
      </div>
    </div>
  )
}
export { Timeline }

function Dates({ dates, choseDate, isDate }) {
  return (
    <div className={styles.timelineDates}>
      {dates.map((date, i) => {
        const SVG = SVGs[`SVG${date}`]
        return (
          <div
            className={classNames(styles.timelineDate, {
              [styles.active]: isDate(date),
            })}
            onClick={() => choseDate(date)}
            key={i}
          >
            <SVG />
          </div>
        )
      })}
    </div>
  )
}

function DottedLine() {
  return (
    <div className={styles.timelineDottedLine}>
      <SVGs.DottedLine />
    </div>
  )
}
