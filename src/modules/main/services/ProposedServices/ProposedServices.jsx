import Provider from '@/containers/ModuleContextProvider'
import { AllServices, Button, Context } from './components'
import BG from './BG'

import styles from './ProposedServices.module.scss'

export default function ProposedServices() {
  const moduleName = 'all-services'
  return (
    <Provider {...{ Context, moduleName }}>
      <div className={styles.module}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <h2>Услуги</h2>
            <AllServices>
              <Button>Все услуги</Button>
            </AllServices>
          </div>
          <BG />
        </div>
      </div>
    </Provider>
  )
}
export { ProposedServices }
