import Image from 'next/image'
import { useState } from 'react'

import getFullSrc from './funcs/getFullSrc.js'

export const plugSrc = '/next-image-plug.svg'

export default function CustomImage({
  src = '',
  remote = false,
  style,
  alt,
  sizes,
  // onLoading = () => {},
}) {
  const fullSrc = getFullSrc(src, remote)
  const [isError, setError] = useState(false)
  return (
    <Image
      src={!isError ? fullSrc : plugSrc}
      width={20}
      height={30}
      // fill
      priority
      style={style}
      alt={alt}
      sizes={sizes}
      onError={() => {
        setError(true)
      }}
      // onLoading={onLoading}
      placeholder="blur"
      blurDataURL={!remote ? fullSrc : plugSrc}
    />
  )
}
export { CustomImage as Image }
