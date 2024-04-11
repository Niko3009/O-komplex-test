import Provider from '@/containers/ModuleContextProvider'
import { Items, Context } from './components'

import styles from './styles/Reasons.module.scss'

export default function Reasons() {
  const moduleName = 'reasons'
  return (
    <Provider {...{ Context, moduleName }}>
      <div className={styles.module}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <div className={styles.titleBox}>
              <h2>Причины выбрать нас</h2>
            </div>
            <Items />
          </div>
        </div>
      </div>
    </Provider>
  )
}
export { Reasons }
