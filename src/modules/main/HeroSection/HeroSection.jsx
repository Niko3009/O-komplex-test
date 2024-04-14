'use client'

import { useSelector } from 'react-redux'
import { getModulesData } from '@/store/selectors/page'
import Animation from '@/containers/Animation'
import { Title } from './components'

import styles from './HeroSection.module.scss'

export default function HeroSection() {
  const modulesData = useSelector(getModulesData)

  const heading = modulesData?.['heading']?.data
  const title = heading?.title
  const description = heading?.description

  return (
    <div className={styles.module}>
      <div className={styles.wrapper}>
        <Animation
          delay={500}
          duration={1000}
          animation={'custom-shutter-hor-left'}
          anchor={`body`}
          anchorPlacement={'top-center'}
        >
          <div className={styles.content}>
            <Title {...{ title, description }} />
          </div>
        </Animation>
      </div>
    </div>
  )
}
export { HeroSection }
