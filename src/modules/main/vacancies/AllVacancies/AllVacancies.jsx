import Provider from '@/containers/ModuleContextProvider'
import { List, Context } from './components'

import styles from './AllVacancies.module.scss'

export default function VacanciesList() {
  const moduleName = 'all-vacancies'
  return (
    <Provider {...{ Context, moduleName }}>
      <div className={styles.module}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <List />
          </div>
        </div>
      </div>
    </Provider>
  )
}
