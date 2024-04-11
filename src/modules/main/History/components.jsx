'use client'

import { useState } from 'react'
import Image from '@/ui/Image'
import { createContext, useContext } from 'react'
import Slider from '@/ui/Slider'
import Timeline from './Timeline'

import styles from './styles/History.module.scss'

export function Title({ children }) {
  return (
    <div className={styles.titleBox}>
      <h2>{children}</h2>
    </div>
  )
}

export function HistorySlider() {
  const sliderSpaceBetween = styles['slider-space-between']
  const moduleData = useContext(Context)
  const slides = Array.isArray(moduleData) ? [...moduleData] : []

  const [state, setState] = useState({ slide: 1, date: 2023 })
  const { slide, date } = state

  const dates = [2023, 2022, 2021, 2019, 2018, 2017, 2008, 2007]
  const reverseSlidesArray = slides.reverse()
  reverseSlidesArray.unshift(null)
  reverseSlidesArray.push(null)

  const updateDate = (newDate) => {
    const newSlide = dates.indexOf(newDate) + 1
    setState({ slide: newSlide, date: newDate })
  }
  const updateDateBySlide = (newSlide) => {
    setState({ slide: newSlide, date: dates[newSlide - 1] })
  }

  return (
    <div className={styles.historySliderBox}>
      <div className={styles.sliderBox}>
        <div className={styles.sliderSubBox}>
          <div className={styles.sliderContent}>
            <Slider
              slide={slide}
              slidesPerView={3}
              spaceBetween={sliderSpaceBetween}
              onSlideChange={updateDateBySlide}
              isMobilePaginationEnable={false}
              sliderButtonsClassName={styles.sliderButtonsClassName}
            >
              {reverseSlidesArray.map((data, i) => (
                <HistorySlide {...{ data }} key={i} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
      <Timeline {...{ date, dates, updateDate }} />
    </div>
  )
}

export function HistorySlide({ data }) {
  const isThereData = !!data
  if (!isThereData) return null

  const title = data?.title || 'title'
  const text = data?.text
  const imagePath = data?.images
  return (
    <div className={styles.slideContent}>
      <div className={styles.imgBox}>
        {imagePath && (
          <Image
            src={imagePath}
            remote={true}
            fill
            priority
            style={{ objectFit: 'cover' }}
            alt={title}
            sizes="100%"
          />
        )}
      </div>
      <div className={styles.textBox}>
        <h2 className={styles.date}>{title}</h2>
        <p className={styles.dateEvent}>{text}</p>
      </div>
    </div>
  )
}

export const Context = createContext()
