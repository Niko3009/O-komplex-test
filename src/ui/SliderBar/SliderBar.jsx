import Slider from '@mui/material/Slider'
import classNames from 'classnames'

import './styles/SliderBar.scss'
import styles from './styles/SliderBar.module.scss'

export default function SliderBar({
  value,
  onChange = () => {},
  className = null,
  min,
  max,
}) {
  return (
    <div
      className={classNames(styles['wrapper'], {
        [className]: !!className,
      })}
    >
      <Slider
        className={styles['slider-bar']}
        value={value}
        onChange={(event) => onChange(event)}
        min={min}
        max={max}
      />
    </div>
  )
}
export { SliderBar }
