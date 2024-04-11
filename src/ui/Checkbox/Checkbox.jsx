'use client'

import classNames from 'classnames'
import { useState, useEffect, useRef } from 'react'
import Checkmark from '@/shared/icons/Checkmark'

import styles from './styles/Checkbox.module.scss'

export default function Checkbox({
  name,
  checked,
  onChange = () => {},
  //
  styleClass = false,
  className,
}) {
  const [defaultCheckbox, setDefaultCheckbox] = useState(null)
  const defaultBoxRef = useRef()

  const [controlledChecked, setControlledChecked] = useState(false)
  const boxChecked = checked !== undefined ? checked : controlledChecked

  const onChangeCheckbox = (event) => {
    const newChecked = !boxChecked
    event.target = defaultCheckbox
    event.target.checked = newChecked
    setControlledChecked(!newChecked)
    onChange(event)
  }

  useEffect(() => {
    setDefaultCheckbox(defaultBoxRef.current)
  }, [])

  return (
    <div
      className={classNames(styles.wrapper, {
        [styles[styleClass]]: !!styleClass,
        [className]: !!className,
      })}
    >
      <div
        className={classNames(styles.customBox, {
          [styles.checked]: boxChecked,
        })}
        onClick={(event) => onChangeCheckbox(event)}
      >
        <Checkmark
          styleClass="white"
          className={classNames(styles.checkmark)}
        />
      </div>

      <input
        name={name}
        ref={defaultBoxRef}
        type="checkbox"
        className={classNames(styles.defaultBox)}
        checked={boxChecked}
        onChange={(event) => onChange(event)}
      />
    </div>
  )
}
export { Checkbox }
