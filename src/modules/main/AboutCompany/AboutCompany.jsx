import { UpperText, RedBox, Photo, Button } from './components'

import styles from './AboutCompany.module.scss'

import localDataFile from './data'
const localData = localDataFile?.data

export default function AboutCompany() {
  const { ['text-1']: textN1, ['text-2']: textN2, img } = localData
  return (
    <div className={styles.module}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.titleBox}>
            <h2>О компании</h2>
            <UpperText {...{ textN1 }} />
          </div>
          <RedBox {...{ textN2 }} />
          <Photo src={img?.src} />
          <Button>Подробнее</Button>
        </div>
      </div>
    </div>
  )
}
export { AboutCompany }
