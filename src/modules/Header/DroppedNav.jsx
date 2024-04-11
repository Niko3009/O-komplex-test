'use client'

import classNames from 'classnames'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import routes from '@/global/routes'
import useRedirect from '@/hooks/useRedirect'
import useDisableScroll from '@/hooks/useDisableScroll'
import useMediaQuery from '@/hooks/useMediaQuery'
import MenuIcon from '@/shared/icons/Menu'
import CrossIcon from '@/shared/icons/Cross'
import Button from '@/ui/Button'
import CallbackModalForm from './CallbackModalForm'
import Pattern from './Pattern'

import styles from './styles/Header.module.scss'

export default function DroppedNav() {
  const [isInitialized, setInitialized] = useState(false)

  const [isActive, setActive] = useState(false)
  const closeDropDownWindow = () => setActive(false)

  const isDesktopMode = useMediaQuery('desktop')
  const disableScroll = useDisableScroll()

  const Icon = isActive ? CrossIcon : MenuIcon

  useEffect(() => {
    setInitialized(true)
  }, [])

  useEffect(() => {
    if (isInitialized) disableScroll(isActive)
    return () => {
      if (isInitialized) disableScroll(false)
    }
  }, [isActive])

  useEffect(() => {
    if (isDesktopMode) closeDropDownWindow()
  }, [isDesktopMode])

  return (
    <div className={styles.droppedNav}>
      <div className={styles.iconBox} onClick={() => setActive(!isActive)}>
        <Icon className={styles.icon} />
      </div>

      <DropDownWindow {...{ isActive, closeDropDownWindow }} />
    </div>
  )
}
export { DroppedNav }

function DropDownWindow({ isActive, closeDropDownWindow }) {
  const closeWindowDuration = dropDownWindowTransitionDurationInMS
  const [isModalOpen, setModalOpen] = useState(false)
  const openModalForm = () => setModalOpen(true)

  const redirect = useRedirect()
  const path = usePathname()

  const selectSection = (href) => {
    closeDropDownWindow()
    setTimeout(() => redirect(href), closeWindowDuration)
  }

  const openCallbackForm = () => {
    closeDropDownWindow()
    setTimeout(() => openModalForm(), closeWindowDuration)
  }

  useEffect(() => {
    closeDropDownWindow()
  }, [path])

  return (
    <div
      className={classNames(styles.droppedWindow, {
        [styles.inactive]: !isActive,
      })}
    >
      <div className={styles.buttonsBox}>
        <div className={styles.buttonsContent}>
          <Button
            styleClass={'white'}
            onClick={() => selectSection(routes.services)}
          >
            Услуги
          </Button>

          <Button
            styleClass={'white'}
            onClick={() => selectSection(routes.about)}
          >
            Почему мы
          </Button>

          <Button
            styleClass={'white'}
            onClick={() => selectSection(routes.contacts)}
          >
            Контакты
          </Button>

          <div>
            <Button
              styleClass={'red'}
              onClick={() => selectSection(routes.trade)}
            >
              Наши контейнеры
            </Button>

            <Button styleClass={'blue'} onClick={() => openCallbackForm()}>
              Связаться с нами
            </Button>
          </div>
        </div>
      </div>

      <CallbackModalForm {...{ isModalOpen, setModalOpen }} />

      <Pattern onClick={() => closeDropDownWindow()} />
    </div>
  )
}

export const dropDownWindowTransitionDurationInMS =
  styles['drop-down-window-transition-duration-ms']
