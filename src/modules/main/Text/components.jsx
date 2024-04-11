'use client'

import Image from '@/ui/Image'
import classNames from 'classnames'
import Slider from '@/ui/Slider'
import Button from '@/ui/Button'

import styles from './Text.module.scss'

export function Div({ children }) {
  return <div className={styles.div}>{children}</div>
}

export function H1({ children }) {
  return <h1 className={styles.h1}>{children}</h1>
}
export function H2({ children }) {
  return <h2 className={styles.h2}>{children}</h2>
}
export function H3({ children }) {
  return <h3 className={styles.h3}>{children}</h3>
}
export function H4({ children }) {
  return <h4 className={styles.h4}>{children}</h4>
}

export function P({ children }) {
  return <p className={styles.p}>{children}</p>
}

export function Link({ params, children }) {
  const { href } = params
  return <a href={href || '#'}>{children}</a>
}

export function Buttons({ children }) {
  return (
    <div className={classNames(styles.div, styles.buttons)}>{children}</div>
  )
}

function TextButton({ params, children }) {
  const { color } = params
  return <Button styleClass={color}>{children}</Button>
}
export { TextButton as Button }

export function UL({ children }) {
  return <ul className={classNames(styles.ul)}>{children}</ul>
}

export function OL({ children }) {
  return <ol className={classNames(styles.ol)}>{children}</ol>
}

export function LI({ children }) {
  return (
    <li>
      <p>{children}</p>
    </li>
  )
}

function CustomImage({ src, remote = true }) {
  return (
    <div className={classNames(styles.div, styles.imgBox)}>
      <Image
        src={src}
        remote={remote}
        style={{ objectFit: 'cover' }}
        alt={'news'}
        sizes="100%"
      />
    </div>
  )
}
export { CustomImage as Image }

function TextSlider({ params }) {
  const { sliders } = params
  return (
    <div className={classNames(styles.div, styles.slider)}>
      <div className={styles.sliderBox}>
        <Slider sliderButtonsClassName={styles.sliderButtons}>
          {sliders.map((data, i) => (
            <div className={styles.slideImgBox} key={i}>
              <Image
                src={data?.img?.src || '#'}
                fill
                priority
                style={{ objectFit: 'contain' }}
                alt={'slide-' + i}
                sizes="100%"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}
export { TextSlider as Slider }

export function Table({ params }) {
  const {
    // ['rows-number']: rowsNum,
    // ['columns-number']: colsNum,
    titles,
    rows,
  } = params
  return (
    <div className={classNames(styles.div, styles.table)}>
      <div className={classNames(styles.tableFrame)}>
        <div className={classNames(styles.tableRow, styles.titleRow)}>
          {titles.map((title, i) => (
            <div className={classNames(styles.tableCell)} key={i}>
              <p>{title}</p>
            </div>
          ))}
        </div>

        {rows.map((row, i) => (
          <div className={classNames(styles.tableRow)} key={i}>
            {row.map((cell, i) => (
              <div className={classNames(styles.tableCell)} key={i}>
                <p>{cell}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
