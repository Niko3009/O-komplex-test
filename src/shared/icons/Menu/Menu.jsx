import classNames from 'classnames'
import { VscMenu } from 'react-icons/vsc'

import styles from './Menu.module.scss'

export default function Menu({ styleClass = 'blue', className }) {
  const outerClassName = className
  return (
    <div className={styles.wrapper}>
      <VscMenu
        className={classNames([
          styles[styleClass],
          { [outerClassName]: !!outerClassName },
        ])}
        style={{ height: '24px' }}
      />
    </div>
  )
}
export { Menu }
