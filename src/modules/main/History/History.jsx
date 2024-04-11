import Provider from '@/containers/ModuleContextProvider'
import { Title, HistorySlider, Context } from './components'
import { BG } from './BG'

import styles from './styles/History.module.scss'

export default function History() {
  const moduleName = 'company-history'
  return (
    <Provider {...{ Context, moduleName }}>
      <div className={styles.module}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <Title>История Zhendong</Title>
            <HistorySlider />
          </div>
          <BG />
        </div>
      </div>
    </Provider>
  )
}
export { History }
