'use client'

import Image from '@/ui/Image'
import { createContext, useContext } from 'react'
import Slider from '@/ui/Slider'
import routes from '@/global/routes'
import { useRedirect } from '@/hooks/useRedirect'
import useMediaQuery from '@/hooks/useMediaQuery'

import createRoute from '@/global/funcs/createRoute'

import styles from './styles/CompanyEvents.module.scss'

export function Title({ children }) {
  return (
    <div className={styles.titleBox}>
      <h2>{children}</h2>
    </div>
  )
}

function EventSlider() {
  const moduleData = useContext(Context)
  const slides = Array.isArray(moduleData) ? [...moduleData] : []

  const isTabletMode = useMediaQuery('tablet')
  const isDesktopMode = useMediaQuery('desktop')
  const slidesPerView = isDesktopMode ? 3 : isTabletMode ? 2 : 1

  return (
    <div className={styles.sliderBox}>
      <Slider
        slidesPerView={slidesPerView}
        spaceBetween={24}
        sliderButtonsClassName={styles.sliderButtons}
      >
        {slides.map((data, i) => (
          <Slide data={data} key={i} />
        ))}
      </Slider>
    </div>
  )
}
export { EventSlider as Slider }

export function Slide({ data }) {
  const date = data?.date || 'date'
  const event = data?.title || 'event'
  const slug = data?.slug || 'event'
  const imagePath = data?.poster

  const redirect = useRedirect()
  const articlePageRoute = createRoute([routes.article, slug])

  return (
    <div
      className={styles.slideContent}
      onClick={() => redirect(articlePageRoute)}
    >
      <div className={styles.imgBox}>
        <p className={styles.date}>{date}</p>
        <div className={styles.img}>
          <Image
            src={imagePath}
            remote={true}
            fill
            priority
            style={{ objectFit: 'cover' }}
            alt={date}
            sizes="100%"
          />
        </div>
      </div>
      <p className={styles.dateEvent}>{event}</p>
    </div>
  )
}

export const Context = createContext()
