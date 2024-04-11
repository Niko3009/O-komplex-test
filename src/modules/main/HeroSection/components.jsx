'use client'

import Image from '@/ui/Image'
import Slider from '@/ui/Slider'
import useMediaQuery from '@/hooks/useMediaQuery'

import styles from './HeroSection.module.scss'

export function Title({ title, description }) {
  return (
    <div className={styles.titleBox}>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  )
}

function CustomSlider({ slides = [] }) {
  return (
    <div className={styles.sliderBox}>
      <Slider sliderButtonsClassName={styles.sliderButtons}>
        {slides.map((data, i) => (
          <Slide {...{ data }} key={i} id={i + 1} />
        ))}
      </Slider>
    </div>
  )
}
export { CustomSlider as Slider }

export function Slide({ data = {}, id }) {
  const isDesktopMode = useMediaQuery('desktop')

  const { image: imagePath, title } = data
  return (
    <div className={styles.imgBox}>
      <Image
        src={imagePath}
        remote={true}
        fill
        priority
        style={{ objectFit: isDesktopMode ? 'cover' : 'contain' }}
        alt={title || `Slide ${id}`}
        sizes="100%"
      />
    </div>
  )
}
