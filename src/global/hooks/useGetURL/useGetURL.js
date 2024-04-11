'use client'

import { useCurrentUrl } from 'next-current-url'

export default function useGetURL() {
  const currentURL = useCurrentUrl()
  return currentURL
}
export { useGetURL }
