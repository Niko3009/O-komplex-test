'use client'

import { useState } from 'react'
import Button from '@/ui/Button'
import routes from '@/global/routes'
import { useRedirect } from '@/hooks/useRedirect'
import CallbackModalForm from './CallbackModalForm'

import styles from './styles/Header.module.scss'

export default function () {
  const redirect = useRedirect()

  const [isModalOpen, setModalOpen] = useState(false)
  const openModalForm = () => setModalOpen(true)

  return (
    <div className={styles.fixedNav}>
      <div>
        <Button
          styleClass={'header-white'}
          onClick={() => redirect(routes.services)}
        >
          Услуги
        </Button>

        <Button
          styleClass={'header-white'}
          onClick={() => redirect(routes.about)}
        >
          Почему мы
        </Button>

        <Button
          styleClass={'header-white'}
          onClick={() => redirect(routes.contacts)}
        >
          Контакты
        </Button>
      </div>
      <div>
        <Button styleClass={'red'} onClick={() => redirect(routes.trade)}>
          Наши контейнеры
        </Button>
      </div>
      <div>
        <Button styleClass={'blue'} onClick={() => openModalForm()}>
          Связаться с нами
        </Button>
      </div>

      <CallbackModalForm {...{ isModalOpen, setModalOpen }} />
    </div>
  )
}
