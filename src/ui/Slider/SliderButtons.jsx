import classNames from 'classnames'
import {
  IoIosArrowBack as ArrowBack,
  IoIosArrowForward as ArrowForward,
} from 'react-icons/io'

import styles from './styles/SliderButtons.module.scss'

export default function SliderButtons({
  slider,
  isDesktopPaginationEnable,
  className,
  slides,
  slide,
  slidesPerView,
}) {
  const slidesNum = Array.isArray(slides) ? slides.length : 0
  const isBeginning = slide === 1
  const isEnd = slide === slidesNum - slidesPerView + 1
  return (
    <div
      className={classNames(styles.wrapper, {
        [styles.disable]: !isDesktopPaginationEnable || slidesNum <= 1,
        [className]: !!className,
      })}
    >
      <div
        onClick={() => slider?.slidePrev()}
        className={classNames(styles['slider-button'], {
          [styles.inactive]: isBeginning,
        })}
      >
        <ArrowBack className={classNames(styles.arrow)} />
      </div>

      <div
        onClick={() => slider?.slideNext()}
        className={classNames(styles['slider-button'], {
          [styles.inactive]: isEnd,
        })}
      >
        <ArrowForward className={classNames(styles.arrow)} />
      </div>
    </div>
  )
}
export { SliderButtons }
