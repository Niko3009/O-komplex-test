import classNames from 'classnames'
import { ImCheckmark } from 'react-icons/im'

import styles from './Checkmark.module.scss'

export default function Checkmark({ styleClass = 'blue', className }) {
  const outerClassName = className
  return (
    <div className={styles.wrapper}>
      <ImCheckmark
        className={classNames([
          styles[styleClass],
          { [outerClassName]: !!outerClassName },
        ])}
      />
    </div>
  )
}
export { Checkmark }
