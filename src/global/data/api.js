import axios from 'axios'

export const DOMAIN =
  process.env.NEXT_PUBLIC_API_URL || 'https://api.zhendong.rgtest.ru'
export const PATH = {
  page: `/api/page`,
  options: '/api/options',
  callback: '/api/callback',
  export: '/api/export',
  storage: '/storage',
}

export const storageUrl = new URL(PATH.storage, DOMAIN)

export const headers = {
  Accept: 'application/json',
}

export const apiAxios = axios.create({
  withCredentials: false,
  baseURL: DOMAIN,
  headers,
})

export const apiFetch = async (path, { method = 'GET', body = {} }) => {
  const response = await fetch(new URL(path, DOMAIN), { method, body, headers })
  const responseData = await response.json()
  return responseData
}
