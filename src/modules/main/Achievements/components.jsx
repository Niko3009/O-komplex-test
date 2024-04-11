import Animation from '@/containers/Animation'

import styles from './styles/Achievements.module.scss'

export function Title({ children }) {
  return (
    <div className={styles.titleBox}>
      <h2>{children}</h2>
    </div>
  )
}

export function Achievement({ children, value, num }) {
  const animDelays = [100, 100, 0, 0, 200, 200]
  return (
    <div className={styles.achievementBox}>
      <Animation
        duration={500}
        delay={animDelays[num - 1]}
        animation={'custom-fade-in-bottom'}
        anchorPlacement={'center-center'}
        anchor={`.${styles.wrapper}`}
      >
        <div className={styles.achievementContent}>
          <h3>{value}</h3>
          <p>{children}</p>
        </div>
      </Animation>
    </div>
  )
}
