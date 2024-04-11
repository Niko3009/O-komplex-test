import classNames from 'classnames'
import { BsDot } from 'react-icons/bs'

import styles from './Dot.module.scss'

export default function Dot({ styleClass = 'blue', className }) {
  const outerClassName = className
  return (
    <div className={styles.wrapper}>
      <BsDot
        className={classNames([
          styles[styleClass],
          { [outerClassName]: !!outerClassName },
        ])}
      />
    </div>
  )
}
export { Dot }
