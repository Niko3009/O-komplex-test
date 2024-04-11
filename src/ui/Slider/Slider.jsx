'use client'

import 'swiper/css'
import 'swiper/css/bundle'
import classNames from 'classnames'
import { useState, useEffect } from 'react'

import { Swiper, SwiperSlide as Slide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import SliderButtons from './SliderButtons'

import './styles/Slider.scss'
import styles from './styles/Slider.module.scss'

export default function Slider({
  children,
  ['slide']: propsSlide,
  onSlideChange = () => {},
  //
  slidesPerView = 1,
  spaceBetween = 0,
  loop = false,
  className = styles['default-slider-name'],
  sliderButtonsClassName = styles['default-slider-buttons-name'],
  //
  isDesktopPaginationEnable = true,
  isMobilePaginationEnable = true,
}) {
  const slides = children
  const [slider, setSlider] = useState(null)
  const [controlledSlide, setControlledSlide] = useState(1)
  const slide = propsSlide !== undefined ? propsSlide : controlledSlide

  useEffect(() => {
    slider?.slideTo(slide - 1)
  })

  return (
    <div className={styles.wrapper}>
      <Swiper
        className={classNames(styles.slider, {
          ['swiper-mobile-pagination-disable']: !isMobilePaginationEnable,
          [className]: !!className,
        })}
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{ clickable: true }}
        {...{ slidesPerView, spaceBetween, loop }}
        onInit={(swiper) => setSlider(swiper)}
        onSlideChange={(swiper) => {
          onSlideChange(swiper.activeIndex + 1)
          setControlledSlide(swiper.activeIndex + 1)
        }}
      >
        {children.map((slideContent, i) => (
          <Slide key={i}>{slideContent}</Slide>
        ))}
      </Swiper>

      <SliderButtons
        className={classNames(styles['slider-buttons'], {
          [sliderButtonsClassName]: !!sliderButtonsClassName,
        })}
        {...{ slider, slides, slide, slidesPerView, isDesktopPaginationEnable }}
      />
    </div>
  )
}
export { Slider }
