import Provider from '@/containers/ModuleContextProvider'
import { List, Button, Context } from './components'

import styles from './ProposedVacancies.module.scss'

export default function () {
  const moduleName = 'vacancies'
  return (
    <Provider {...{ Context, moduleName }}>
      <div className={styles.module}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <div className={styles.titleBox}>
              <h2>В поиске самых лучших специалистов</h2>
            </div>
            <List />
            <Button>Все вакансии</Button>
          </div>
        </div>
      </div>
    </Provider>
  )
}
