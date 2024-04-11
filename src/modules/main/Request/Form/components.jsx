'use client'

import { useState, useEffect } from 'react'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { getOptionsData } from '@/store/selectors/page'
import Animation from '@/containers/Animation'
import Button from '@/ui/Button'
import SVG from '@/ui/SVG'

import styles, { formBox } from './styles/Form.module.scss'

export function FormBox({ children }) {
  return (
    <Animation
      duration={1000}
      animation={'custom-shutter-ver-top'}
      anchorPlacement={'bottom-bottom'}
      anchor={`.${formBox}`}
    >
      <div className={styles.formBox}>{children}</div>
    </Animation>
  )
}

export function FormContent({ children }) {
  return <div className={classNames(styles.formContent)}>{children}</div>
}

export function ServicesTabs({ children }) {
  return (
    <div className={classNames(styles.servicesTabsBox)}>
      <h3>Выберите, какие услуги вас интересуют</h3>
      <div className={styles.tabsBox}>{children}</div>
    </div>
  )
}

export function Tab({ data, services, setServices }) {
  const { ['title']: name } = data
  const [isActive, setActive] = useState(false)

  useEffect(() => {
    const newServices = [...services]
    let index = -1
    for (const service of services)
      if (service['title'] === name) index = services.indexOf(service)
    if (isActive && index < 0) newServices.push(data)
    else newServices.splice(index, 1)
    setServices(newServices)
  }, [isActive])

  return (
    <div
      className={classNames(styles.tab, { [styles.active]: isActive })}
      onClick={() => setActive(!isActive)}
    >
      <h5>{name}</h5>
    </div>
  )
}

export function Contacts({ children }) {
  const optionsData = useSelector(getOptionsData)
  const documents = optionsData?.documents
  const personal = documents?.['processing_personal_data']

  return (
    <div className={styles.contactsBox}>
      <h3>Как с вами связаться?</h3>
      <div className={styles.inputs}>{children}</div>
      <h4>
        Нажимая «Отправить», вы соглашаетесь на{' '}
        <a href={personal?.url} rel="nofollow" target="_blank">
          <span>обработку персональных данных</span>
        </a>
      </h4>
    </div>
  )
}

export function SubmitButton({ children, onClick }) {
  return (
    <Button styleClass={'white'} onClick={onClick}>
      {children}
    </Button>
  )
}

export function SuccessMessage({ successLogo, backToForm }) {
  return (
    <div className={classNames(styles.successMessage)}>
      <div className={styles.successMessageContent}>
        <div className={styles.successContent}>
          <div className={styles.message}>
            <div className={styles.successLogo}>
              <SVG src={successLogo?.src || '#'} />
            </div>
            <h2>Заявка успешно отправлена!</h2>
            <p>
              Спасибо, что оставили заявку. Наши специалисты свяжутся с вами в
              ближайшее время
            </p>
          </div>
          <div className={styles.successContentButton}>
            <Button styleClass={'white'} onClick={() => backToForm()}>
              Готово
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ErrorMessage({ error, setError }) {
  const backToForm = () => setError('')
  return (
    <div className={classNames(styles.successMessage)}>
      <div className={styles.successMessageContent}>
        <div className={styles.successContent}>
          <div className={styles.message}>
            <h2>Отправка неудачна</h2>
            <p>{error}</p>
          </div>
          <div className={styles.successContentButton}>
            <Button styleClass={'white'} onClick={() => backToForm()}>
              Вернуться к форме
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
