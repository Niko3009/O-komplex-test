import classNames from 'classnames'

import styles from './Select.module.scss'

export default function Select({
  children,
  name,
  value,
  onChange = () => {},
  styleClass = false,
  isError = false,
}) {
  return (
    <div
      className={classNames(styles.selectBox, {
        [styles[`style-${styleClass}`]]: !!styleClass,
        [styles.error]: isError,
      })}
    >
      <select name={name} value={value} onChange={onChange}>
        {children}
      </select>
    </div>
  )
}
