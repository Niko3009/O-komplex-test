import classNames from 'classnames'
import { useState } from 'react'
import { createContext, useContext } from 'react'
import Input from '@/ui/Input/FiltersInput'
import Button from '@/ui/Button'
import Dropdown from '@/ui/Dropdown'
import SliderBar from '@/ui/SliderBar'
import Checkbox from '@/ui/Checkbox'

import handleCostInputValue from './funcs/handleCostInputValue'

import styles from './styles/FiltersPanel.module.scss'

export function Section({ title, className, children }) {
  return (
    <div className={classNames({ [className]: className })}>
      {title && <p>{title}</p>}
      {children}
    </div>
  )
}

function LocationSelectDropdown({
  name,
  placeholder,
  checkedLocs = [],
  children,
}) {
  let label = ''
  for (const data of checkedLocs) {
    const city =
      data?.['city_pick'] || data?.['city_drop'] || data?.['city_name']
    const country =
      data?.['country_pick'] || data?.['country_drop'] || data?.['country_name']
    const point = city + (country ? ` (${country})` : '')
    if (label === '') label = point
    else label += `, ${point}`
  }
  return (
    <Dropdown name={name} placeholder={placeholder} value={label}>
      {children}
    </Dropdown>
  )
}
export { LocationSelectDropdown as Dropdown }

export function LocationItem({ location, checkedLocs = [], type }) {
  const data = location
  const { updateLocations } = useContext(Context)
  const city = data?.['city_pick'] || data?.['city_drop'] || data?.['city_name']
  const country =
    data?.['country_pick'] || data?.['country_drop'] || data?.['country_name']
  const count = location?.['container_count'] || location?.['location_count']

  const key =
    type === 'to'
      ? 'city_drop_id'
      : location?.['city_pick_id']
      ? 'city_pick_id'
      : 'city_id'
  const locationsIDs = checkedLocs.map((loc) => loc?.[key])
  const currenLocID = location?.[key]
  const found = locationsIDs.find((id) => id === currenLocID)
  const checked = found !== undefined

  return (
    <div
      className={styles.locationItem}
      onClick={() => {
        const newChecked = !checked
        updateLocations({ location, checked: newChecked, type })
      }}
    >
      <Checkbox checked={checked} className={styles.checkbox} />
      <p className={styles.location}>
        {city + (country ? ` (${country})` : '')}
      </p>
      <p>{count || ''}</p>
    </div>
  )
}

export function ContainerTypeBtn({ children, container, num }) {
  const { container: activeContainer, updateСontainer } = useContext(Context)
  return (
    <Button
      onClick={() => updateСontainer({ container, num })}
      className={styles.contTypeButton}
      styleClass={
        activeContainer?.type === container && !!container ? 'blue' : 'grey'
      }
      checkboxButton={true}
    >
      {children}
    </Button>
  )
}

export function ContainerQualBtn({ children, quality, num }) {
  const { quality: activeQuality, updateQuality } = useContext(Context)
  return (
    <Button
      onClick={() => updateQuality({ quality, num })}
      className={styles.contTypeButton}
      styleClass={
        activeQuality?.type === quality && !!quality ? 'blue' : 'grey'
      }
      checkboxButton={true}
    >
      {children}
    </Button>
  )
}

export function CostInput({ type, placeholder }) {
  const { cost, updateCost } = useContext(Context)
  const [isOnFocus, setOnFocus] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const value = isOnFocus ? inputValue : cost?.[type]

  const updateInputValue = (inputValue) => {
    const newValue = handleCostInputValue(inputValue, value)
    if (!isNaN(newValue)) setInputValue(newValue)
  }
  const updateCostValue = (inputValue) => {
    const newValue = handleCostInputValue(inputValue, value)
    if (!isNaN(newValue)) {
      cost[type] = newValue
      updateCost({ cost })
    }
    setInputValue('')
  }
  return (
    <Input
      name={type}
      placeholder={placeholder}
      styleClass={'white'}
      value={value > 0 ? `${value}$` : ''}
      onFocus={() => setOnFocus(true)}
      onChange={({ target }) => updateInputValue(target.value)}
      onBlur={({ target }) => {
        setOnFocus(false)
        updateCostValue(target.value)
      }}
    />
  )
}

export function CostSliderBar() {
  const { cost, updateCost, minCost, maxCost } = useContext(Context)
  const updateValue = (newValue) => {
    const newCost = { ...cost }
    newCost.from = newValue[0]
    newCost.to = newValue[1]
    updateCost({ cost: newCost })
  }
  return (
    <div className={styles['cost-slider-box']}>
      <SliderBar
        value={[cost?.from, cost?.to]}
        onChange={({ target }) => updateValue(target.value)}
        min={minCost}
        max={maxCost}
      />
    </div>
  )
}

export function OnRequestСheckbox() {
  const { onRequest, updateOnRequest } = useContext(Context)
  return (
    <div
      className={styles.onRequestBox}
      onClick={() => updateOnRequest({ checked: !onRequest })}
    >
      <input
        type="checkbox"
        checked={onRequest}
        onChange={() => updateOnRequest({ checked: !onRequest })}
      />
      <p className={styles.location}>{'По запросу'}</p>
    </div>
  )
}

export const Context = createContext()
