import Provider from '@/containers/ModuleContextProvider'
import { Title, Slider, Context } from './components'
import { BG } from './BG'

import styles from './styles/CompanyEvents.module.scss'

export default function CompanyEvents() {
  const moduleName = 'news'
  return (
    <Provider {...{ Context, moduleName }}>
      <div className={styles.module}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <Title>Участие в мероприятиях</Title>
            <Slider />
          </div>
          <BG />
        </div>
      </div>
    </Provider>
  )
}
export { CompanyEvents }
