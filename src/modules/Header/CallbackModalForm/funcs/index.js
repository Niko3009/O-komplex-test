import { PATH, apiAxios } from '@/global/data/api'
// import validatePhone from 'react-mobile-validator'
import { validate as validateEmail } from 'react-email-validator'

export const postData = async (data, pageURL) => {
  const url = PATH.callback

  const formData = new FormData()
  for (const key in data) formData.append(key, data[key])
  formData.append('type', 'callback')
  formData.append('url', pageURL)

  const responseData = (await apiAxios.post(url, formData))?.data
  return responseData
}

export const checkName = (state, setState) => {
  const value = state.value
  const newState = { ...state }
  const isValid = value.length > 0
  newState.error = !isValid
  if (!isValid) setState(newState)
  return isValid
}

export const checkPhone = (state, setState, phoneMask) => {
  const value = state.value
  const newState = { ...state }
  const isValid = value.length === phoneMask.length - 2 // && validatePhone('RU', value)
  newState.error = !isValid
  if (!isValid) setState(newState)
  return isValid
}

export const checkEmail = (state, setState) => {
  const value = state.value
  const newState = { ...state }
  const isValid = validateEmail(value)
  newState.error = !isValid
  if (!isValid) setState(newState)
  return isValid
}
