import { Title, Achievement } from './components'

import styles from './styles/Achievements.module.scss'

import localDataFile from './data'
const localData = localDataFile?.data

export default function Achievements() {
  const { list } = localData
  return (
    <div className={styles.module}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <Title>15 лет успешной работы</Title>
          <div className={styles.achievementsBox}>
            {list.map((data, i) => (
              <Achievement value={data?.value} num={i + 1} key={i}>
                {data?.text || 'Achievement'}
              </Achievement>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export { Achievements }
