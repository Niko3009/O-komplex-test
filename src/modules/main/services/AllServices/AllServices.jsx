import Provider from '@/containers/ModuleContextProvider'
import { AllServices, Context } from './components'

import styles from './AllServices.module.scss'

export default function () {
  const moduleName = 'all-services'
  return (
    <Provider {...{ Context, moduleName }}>
      <div className={styles.module}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <AllServices />
          </div>
        </div>
      </div>
    </Provider>
  )
}
