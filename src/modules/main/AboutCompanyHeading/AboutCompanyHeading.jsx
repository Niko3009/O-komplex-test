import Provider from '@/containers/ModuleContextProvider'
import { Title, Image, Context } from './components'
import { UpperText, LowerText, WhiteSqure } from './components'

import styles from './AboutCompanyHeading.module.scss'

export default function AboutCompanyHeading() {
  const moduleName = 'heading'
  return (
    <Provider {...{ Context, moduleName }}>
      <div className={styles.module}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <Title title={'О компании'} />
            <div className={styles['info-box']}>
              <UpperText />
              <Image />
              <LowerText />
              <WhiteSqure />
            </div>
          </div>
        </div>
      </div>
    </Provider>
  )
}
export { AboutCompanyHeading }
