'use client'

import { useEffect, useCallback } from 'react'

export default function useClickInside(wrapper, callback) {
  const onClick = useCallback(
    ({ target }) => {
      const isClickOnWrapper = wrapper === target
      const isClickInside = wrapper?.contains(target)
      if (!(isClickOnWrapper || isClickInside)) callback()
    },
    [wrapper]
  )

  useEffect(() => {
    if (wrapper) document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
    }
  }, [onClick])

  return { wrapper, callback }
}
export { useClickInside }
