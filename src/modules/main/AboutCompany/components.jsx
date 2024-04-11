'use client'

import Image from '@/ui/Image'
import Animation from '@/containers/Animation'
import * as Cells from '@/shared/patterns/graphicCells'
import routes from '@/global/routes'
import { useRedirect } from '@/hooks/useRedirect'
import Button from '@/ui/Button'

import styles from './AboutCompany.module.scss'

export function UpperText({ textN1 }) {
  return (
    <div className={styles.upperText}>
      <Animation
        duration={1500}
        animation={'custom-fade-in-bottom'}
        anchorPlacement={'center-center'}
        anchor={`.${styles.titleBox}`}
      >
        <p>{textN1}</p>
      </Animation>
    </div>
  )
}

export function RedBox({ textN2 }) {
  return (
    <div className={styles.redBox}>
      <Animation
        duration={1500}
        animation={'custom-shutter-ver-bottom'}
        anchorPlacement={'center-center'}
        anchor={`.${styles.titleBox}`}
      >
        <div className={styles.redBoxLayout}>
          <Animation
            duration={1500}
            animation={'custom-fade-in-bottom'}
            anchorPlacement={'center-center'}
            anchor={`.${styles.titleBox}`}
          >
            <div className={styles.middleText}>
              <p>{textN2}</p>
            </div>
          </Animation>
        </div>
      </Animation>
    </div>
  )
}

export function Photo({ src }) {
  return (
    <div className={styles.photoBox}>
      <Animation
        duration={1500}
        animation={'custom-shutter-ver-bottom'}
        anchorPlacement={'center-center'}
        anchor={`.${styles.wrapper}`}
      >
        <div className={styles.photoBoxLayout}>
          <Pattern />
          <div className={styles.imgBox}>
            <Image
              src={src}
              fill
              priority
              style={{ objectFit: 'cover' }}
              alt={'about-company'}
              sizes="100%"
            />
          </div>
        </div>
      </Animation>
    </div>
  )
}

export function CustomButton({ children }) {
  const redirect = useRedirect()
  return (
    <div className={styles.buttonBox}>
      <Button styleClass={'white'} onClick={() => redirect(routes.about)}>
        {children}
      </Button>
    </div>
  )
}
export { CustomButton as Button }

export default function Pattern() {
  const { StripedCell } = Cells
  return (
    <div className={styles.graphicPattern}>
      <StripedCell firstColor={'blue'} secondColor={'red'} />
      <StripedCell firstColor={'red'} secondColor={'blue'} />
    </div>
  )
}
