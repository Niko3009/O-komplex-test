import classNames from 'classnames'
import { FaArrowRight } from 'react-icons/fa'

import styles from './Arrow.module.scss'

export default function LinkArrow({ styleClass = 'blue', className }) {
  const outerClassName = className
  return (
    <div className={styles.wrapper}>
      <FaArrowRight
        className={classNames([
          styles[styleClass],
          { [outerClassName]: !!outerClassName },
        ])}
      />
    </div>
  )
}
export { LinkArrow }
