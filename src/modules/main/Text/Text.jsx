'use client'

import parse from 'html-react-parser'
import { useSelector } from 'react-redux'
import { getModulesData } from '@/store/selectors/page'
import { Div, H1, P, Image } from './components'

import styles from './Text.module.scss'

export default function Text() {
  const modulesData = useSelector(getModulesData)
  const headingData = modulesData?.heading?.data
  const imagePath = headingData?.image
  return (
    <div className={styles.module}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <Div>
            <H1>{headingData?.title}</H1>
            <P>{headingData?.description}</P>
          </Div>

          <Image src={imagePath} remote={true} />

          <Div>{parse(headingData?.text || '')}</Div>
        </div>
      </div>
    </div>
  )
}
export { Text }
