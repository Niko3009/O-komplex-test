import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useGetURL } from '@/hooks/useGetURL'
import { getOptionsData } from '@/store/selectors/page'
import Input, { PhoneInput, mask as phoneMask } from '@/ui/Input'
import Button from '@/ui/Button'

import { postData, checkName, checkPhone, checkEmail } from './funcs'

import styles from './styles/CallbackModalForm.module.scss'

export function Form({ windowControl }) {
  const { openWindow } = windowControl
  const currentPageURL = useGetURL()

  const [name, setName] = useState({ value: '', error: false })
  const [phone, setPhone] = useState({ value: '', error: false })
  const [email, setEmail] = useState({ value: '', error: false })
  const formData = { name: name.value, phone: phone.value, email: email.value }

  const submitForm = async () => {
    const checkResult =
      checkName(name, setName) &&
      checkPhone(phone, setPhone, phoneMask) &&
      checkEmail(email, setEmail)
    if (!checkResult) return
    try {
      const response = await postData(formData, currentPageURL)
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
      <h1>{`Связаться с нами`}</h1>
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
