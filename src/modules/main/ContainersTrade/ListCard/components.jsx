import LinkArrow from '@/shared/icons/Arrow'

import styles from './styles/ListCard.module.scss'

export function LocationTable({ cardData, filters }) {
  const mode = filters?.mode
  const isRent = mode === 'rent'

  const departureCountry = cardData?.['country_pick'] || cardData?.['country']
  const departureCity = cardData?.['city_pick'] || cardData?.['city']
  let departurePoint = departureCity
  if (departureCountry) departurePoint += ` (${departureCountry})`

  const arrivalCountry = cardData?.['country_drop']
  const arrivalCity = cardData?.['city_drop']
  let arrivalPoint = arrivalCity
  if (arrivalCountry) arrivalPoint += ` (${arrivalCountry})`

  return (
    <div className={styles.locationsBox}>
      {isRent && (
        <>
          <div className={styles.departurePointBox}>
            <p className={styles.pointTitle}>Локация выдачи</p>
            <p className={styles.point}>{departurePoint || '-'}</p>
          </div>

          <div className={styles.arrivalPointBox}>
            <p className={styles.pointTitle}>Локация сдачи</p>
            <p className={styles.point}>{arrivalPoint || '-'}</p>
          </div>
        </>
      )}

      {!isRent && (
        <>
          <div className={styles.departurePointBox}>
            <p className={styles.pointTitle}>Локация</p>
            <p className={styles.point}>{departurePoint || '-'}</p>
          </div>
        </>
      )}
    </div>
  )
}

export function InfoTable({ cardData, filters, onRequest }) {
  const mode = filters?.mode
  const isRent = mode === 'rent'

  const container = cardData?.container
  const count = cardData?.count
  const tax = cardData?.tax || cardData?.['price_tax']
  const day = cardData?.day
  const quality = cardData?.type

  return (
    <div className={styles.infoTableBox}>
      <div className={styles.infoTableTitles}>
        <p>{'Тип контейнера'}</p>
        {!onRequest && (
          <>
            <p>{'Стоимость'}</p>
          </>
        )}
        {isRent && (
          <>
            <p>{'В наличии'}</p>
            <p>{'В пути (дни)'}</p>
          </>
        )}
        {!isRent && (
          <>
            <p>{'Состояние'}</p>
          </>
        )}
      </div>

      <div className={styles.infoTableRow}>
        <p>{container || '-'}</p>
        {!onRequest && (
          <>
            <p>{tax ? tax + ' $' : '-'}</p>
          </>
        )}

        {isRent && (
          <>
            <p>{count || '-'}</p>
            <p>{day || '-'}</p>
          </>
        )}
        {!isRent && (
          <>
            <p>{quality || '-'}</p>
          </>
        )}
      </div>

      {/* <div className={styles.infoTableRow}>
        <p>40HC</p>
        <p>{cnt40HC?.cost}</p>
        <p>{cnt40HC?.conditions}</p>
        <p>{cnt40HC?.available}</p>
      </div> */}
    </div>
  )
}

export function ArrowIcon() {
  return (
    <div className={styles.arrowBox}>
      <div className={styles.iconBox}>
        <LinkArrow styleClass={'blue'} />
      </div>
    </div>
  )
}
