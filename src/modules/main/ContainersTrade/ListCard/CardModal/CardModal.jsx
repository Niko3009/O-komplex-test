import { useState, useEffect } from 'react'
import { createContext } from 'react'
import Modal from '@/modules/Modal'
import Cover, { coverHidingDurationInMS } from '@/containers/CoverBox'
import useMediaQuery from '@/hooks/useMediaQuery'
import { Success, Form, Fail, Card } from './Modals'

import styles from './styles/CardModal.module.scss'

export default function CardModal({
  isModalOpen,
  setModalOpen,
  cardData,
  filters,
  onRequest,
}) {
  const [window, setWindow] = useState('form')
  const isTabletMode = useMediaQuery('tablet')

  const windows = ['card', 'form', 'success', 'fail']
  const initWindow = isTabletMode ? 'form' : 'card'

  const [modalControl, setModalControl] = useState({})
  const closeModal = modalControl?.closeModal
  const isWindow = (name) => window === name
  const openWindow = (name) => setWindow(name)
  const closeWindow = () => closeModal()
  const windowControl = { window, windows, isWindow, openWindow, closeWindow }

  useEffect(() => {
    const modalResetDelay = coverHidingDurationInMS
    if (!isModalOpen) setTimeout(() => openWindow(initWindow), modalResetDelay)
  }, [isModalOpen, openWindow, initWindow])

  return (
    <Modal
      {...{ isModalOpen, setModalOpen }}
      type={isTabletMode ? 'window' : 'swipe'}
      callbackControl={(control) => setModalControl(control)}
    >
      <div className={styles.modalContent}>
        <Cover isCovered={!isWindow('card')}>
          <Card {...{ windowControl, cardData, filters, onRequest }} />
        </Cover>

        <Cover isCovered={!isWindow('form')}>
          <Form {...{ windowControl, cardData, filters }} />
        </Cover>

        <Cover isCovered={!isWindow('success')}>
          <Success {...{ windowControl }} />
        </Cover>

        <Cover isCovered={!isWindow('fail')}>
          <Fail {...{ windowControl }} />
        </Cover>
      </div>
    </Modal>
  )
}
export { CardModal }

export const CardModalContext = createContext()
