import { Banner, Button } from './components'
import StripedPattern from './Pattern'

import styles from './styles/Banner404.module.scss'

export default function Banner404() {
  return (
    <div className={styles.module}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <Banner>
            <h1>404</h1>
            <h2>Станица не найдена</h2>
          </Banner>
          <Button href={'/'}>Вернуться на главную</Button>
        </div>

        <StripedPattern />
      </div>
    </div>
  )
}
export { Banner404 }
