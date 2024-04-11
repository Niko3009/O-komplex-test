'use client'

import { useState } from 'react'
import { useGetURL } from '@/hooks/useGetURL'
import Cover from '@/containers/CoverBox'
import Input, { PhoneInput, mask as phoneMask } from '@/ui/Input'
import { FormBox, FormContent, ServicesTabs, Tab } from './components'
import { Contacts, SubmitButton } from './components'
import { SuccessMessage, ErrorMessage } from './components'

import { postData, checkName, checkPhone, checkEmail } from './funcs'

export default function Form({
  isExtended,
  allServices = [],
  successLogo,
  pageName,
}) {
  const currentPageURL = useGetURL()

  const [isSuccess, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const isError = !!error

  const [name, setName] = useState({ value: '', error: false })
  const [phone, setPhone] = useState({ value: '', error: false })
  const [email, setEmail] = useState({ value: '', error: false })
  const formData = { name: name.value, phone: phone.value, email: email.value }

  const [services, setServices] = useState([])
  if (isExtended) formData.data = JSON.stringify(services)

  const backToForm = () => setSuccess(false)
  const submitForm = async () => {
    const checkResult =
      checkName(name, setName) &&
      checkPhone(phone, setPhone, phoneMask) &&
      checkEmail(email, setEmail)
    if (!checkResult) return
    try {
      const response = await postData(formData, currentPageURL, pageName)
      if (response.result) setSuccess(true)
      else setError(response.msg)
    } catch (error) {
      setError(`Неизвестная ошибка (${error.message})`)
    }
  }

  return (
    <FormBox>
      <Cover isCovered={isSuccess || isError}>
        <FormContent>
          <Cover isCovered={!isExtended}>
            <ServicesTabs>
              {allServices.map((data, i) => (
                <Tab {...{ data, services, setServices }} key={i} />
              ))}
            </ServicesTabs>
          </Cover>

          <Contacts>
            <Input
              placeholder={'Имя'}
              value={name.value}
              error={name.error}
              onChange={({ target }) =>
                setName({ value: target.value, error: false })
              }
            />

            <PhoneInput
              placeholder={'Телефон'}
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
              value={email.value}
              error={email.error}
              onBlur={() => {
                if (email.value) checkEmail(email, setEmail)
              }}
              onChange={({ target }) =>
                setEmail({ value: target.value, error: false })
              }
            />

            <SubmitButton onClick={() => submitForm()}>Отправить</SubmitButton>
          </Contacts>
        </FormContent>
      </Cover>

      <Cover isCovered={!isSuccess}>
        <SuccessMessage {...{ successLogo, backToForm }} />
      </Cover>

      <Cover isCovered={!isError}>
        <ErrorMessage {...{ error, setError }} />
      </Cover>
    </FormBox>
  )
}
export { Form }
