'use client'

import { useState } from 'react'
import CardModal from './CardModal'
import { LocationTable, InfoTable, ArrowIcon } from './components'

import styles from './styles/ListCard.module.scss'

export default function ListCard({ cardData, filters, onRequest }) {
  const [isModalOpen, setModalOpen] = useState(false)
  const chooseCard = () => setModalOpen(true)

  return (
    <>
      <div className={styles.itemBox} onClick={() => chooseCard()}>
        <LocationTable {...{ cardData, filters }} />
        <InfoTable {...{ cardData, filters, onRequest }} />
        <ArrowIcon />
      </div>

      <CardModal
        {...{ isModalOpen, setModalOpen, cardData, filters, onRequest }}
      />
    </>
  )
}
export { ListCard }
