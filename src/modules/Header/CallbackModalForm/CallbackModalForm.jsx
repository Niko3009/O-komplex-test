import { useState, useEffect } from 'react'
import Modal from '@/modules/Modal'
import Cover, { coverHidingDurationInMS } from '@/containers/CoverBox'
import useMediaQuery from '@/hooks/useMediaQuery'
import { Success, Form, Fail } from './Modals'

import styles from './styles/CallbackModalForm.module.scss'

export default function CallbackModalForm({ isModalOpen, setModalOpen }) {
  const [window, setWindow] = useState('form')
  const isTabletMode = useMediaQuery('tablet')

  const windows = ['form', 'success', 'fail']
  const initWindow = 'form'

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
        <Cover isCovered={!isWindow('form')}>
          <Form {...{ windowControl }} />
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
export { CallbackModalForm }
