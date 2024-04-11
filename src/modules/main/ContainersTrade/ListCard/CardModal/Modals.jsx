import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useGetURL } from '@/hooks/useGetURL'
import { getOptionsData } from '@/store/selectors/page'
import Input, { PhoneInput, mask as phoneMask } from '@/ui/Input'
import Button from '@/ui/Button'

import { postData, checkName, checkPhone, checkEmail } from './funcs'

import styles from './styles/CardModal.module.scss'

export function Form({ windowControl, cardData, filters }) {
  // const { pageName } = useContext(CardModalContext)
  const tradeMode = filters?.mode
  const isRent = tradeMode === 'rent'

  const { openWindow } = windowControl
  const currentPageURL = useGetURL()

  const [name, setName] = useState({ value: '', error: false })
  const [phone, setPhone] = useState({ value: '', error: false })
  const [email, setEmail] = useState({ value: '', error: false })
  const formData = { name: name.value, phone: phone.value, email: email.value }
  formData.data = JSON.stringify(new Array(cardData))

  const submitForm = async () => {
    const checkResult =
      checkName(name, setName) &&
      checkPhone(phone, setPhone, phoneMask) &&
      checkEmail(email, setEmail)
    if (!checkResult) return
    try {
      const response = await postData(formData, currentPageURL, tradeMode)
      if (response) openWindow('success')
      else openWindow('fail')
    } catch (error) {
      console.warn(error)
      openWindow('fail')
    }
  }

  const optionsData = useSelector(getOptionsData)
  const documents = optionsData?.documents
  const personal = documents?.['processing_personal_data']

  return (
    <div className={styles.contactsBox}>
      <h1>{`Заявка на ${isRent ? `аренду` : `продажу`}`}</h1>
      <div className={styles.inputs}>
        <Input
          placeholder={'Имя'}
          styleClass={'grey'}
          value={name.value}
          error={name.error}
          onChange={({ target }) =>
            setName({ value: target.value, error: false })
          }
        />

        <PhoneInput
          placeholder={'Телефон'}
          styleClass={'grey'}
          value={phone.value}
          error={phone.error}
          onBlur={() => {
            if (phone.value && phone.value !== '+7 ')
              checkPhone(phone, setPhone, phoneMask)
          }}
          onChange={({ target }) =>
            setPhone({ value: target.value, error: false })
          }
        />

        <Input
          placeholder={'E-mail'}
          styleClass={'grey'}
          value={email.value}
          error={email.error}
          onBlur={() => {
            if (email.value) checkEmail(email, setEmail)
          }}
          onChange={({ target }) =>
            setEmail({ value: target.value, error: false })
          }
        />

        <Button styleClass={'blue'} onClick={() => submitForm()}>
          Отправить
        </Button>
      </div>
      <h5>
        Нажимая «Отправить», вы соглашаетесь на{' '}
        <a href={personal?.url} rel="nofollow" target="_blank">
          <span>обработку персональных данных</span>
        </a>
      </h5>
    </div>
  )
}

export function Success({ windowControl }) {
  const { closeWindow } = windowControl
  return (
    <div className={styles.messageBox}>
      <div className={styles.message}>
        <h1>Заявка успешно отправлена!</h1>
        <p>
          Спасибо, что оставили заявку. Наши специалисты свяжутся с вами в
          ближайшее время
        </p>
      </div>

      <Button styleClass={'blue'} onClick={() => closeWindow()}>
        Готово
      </Button>
    </div>
  )
}

export function Fail({ windowControl }) {
  const { openWindow } = windowControl
  return (
    <div className={styles.messageBox}>
      <div className={styles.message}>
        <h1>Что-то пошло не так</h1>
        <p>
          Не получилось отправить вашу заявку. Пожалуйста, попробуйте отправить
          её ещё раз
        </p>
      </div>

      <Button styleClass={'blue'} onClick={() => openWindow('form')}>
        Попробовать ещё раз
      </Button>
    </div>
  )
}

export function Card({ windowControl, cardData, filters, onRequest }) {
  const { openWindow } = windowControl
  const openForm = () => openWindow('form')

  const mode = filters?.mode
  const isRent = mode === 'rent'

  // "container": "40HC",
  // "count": 200,
  // "tax": 800,
  // "subsidy": "субсидия",
  // "day": "70",
  // "snp": "10"

  // "country": "Россия",
  // "city": "Москва",
  // "type": "NEW",
  // "container": "40HC",
  // "price_cash": 0,
  // "price_tax": 225000,

  const departureCountry = cardData?.['country_pick'] || cardData?.['country']
  const departureCity = cardData?.['city_pick'] || cardData?.['city']
  let departurePoint = departureCity
  if (departureCountry) departurePoint += ` (${departureCountry})`

  const arrivalCountry = cardData?.['country_drop']
  const arrivalCity = cardData?.['city_drop']
  let arrivalPoint = arrivalCity
  if (arrivalCountry) arrivalPoint += ` (${arrivalCountry})`

  const container = cardData?.container
  const count = cardData?.count
  const tax = cardData?.tax || cardData?.['price_tax']
  const day = cardData?.day
  const quality = cardData?.type

  return (
    <div className={styles.cardBox}>
      <div className={styles.cardDataBox}>
        <div className={styles.locationsBox}>
          {isRent && (
            <>
              <div className={styles.tableRow}>
                <p className={styles.title}>Локация выдачи</p>
                <p className={styles.data}>{departurePoint || '-'}</p>
              </div>

              <div className={styles.tableRow}>
                <p className={styles.title}>Локация сдачи</p>
                <p className={styles.data}>{arrivalPoint || '-'}</p>
              </div>
            </>
          )}

          {!isRent && (
            <>
              <div className={styles.tableRow}>
                <p className={styles.title}>Локация выдачи</p>
                <p className={styles.data}>{departurePoint || '-'}</p>
              </div>
            </>
          )}
        </div>

        <div className={styles.tableRow}>
          <p className={styles.title}>{'Тип контейнера'}</p>
          <div className={styles.dataRow}>
            <p className={styles.data}>{container || '-'}</p>
          </div>
        </div>

        {!onRequest && (
          <div className={styles.tableRow}>
            <p className={styles.title}>{'Стоимость'}</p>
            <div className={styles.dataRow}>
              <p className={styles.data}>{tax ? tax + ' $' : '-'}</p>
            </div>
          </div>
        )}

        {isRent && (
          <>
            <div className={styles.tableRow}>
              <p className={styles.title}>{'В пути (дни)'}</p>
              <div className={styles.dataRow}>
                <p className={styles.data}>{day || '-'}</p>
              </div>
            </div>

            <div className={styles.tableRow}>
              <p className={styles.title}>{'В наличии'}</p>
              <div className={styles.dataRow}>
                <p className={styles.data}>{count || '-'}</p>
              </div>
            </div>
          </>
        )}
        {!isRent && (
          <>
            <div className={styles.tableRow}>
              <p className={styles.title}>{'Состояние'}</p>
              <div className={styles.dataRow}>
                <p className={styles.data}>{quality || '-'}</p>
              </div>
            </div>
          </>
        )}
      </div>

      <Button styleClass={'blue'} onClick={openForm}>
        Оставить заявку
      </Button>
    </div>
  )
}
