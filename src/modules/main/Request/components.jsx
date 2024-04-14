import Animation from '@/containers/Animation'
import styles, { wrapper } from './styles/Request.module.scss'

export function Title({ children }) {
  return (
    <div className={styles.titleBox}>
      <Animation
        duration={1000}
        animation={'custom-fade-in'}
        anchorPlacement={'bottom-bottom'}
        anchor={`.${wrapper}`}
      >
        <div className={styles.titleContent}>{children}</div>
      </Animation>
    </div>
  )
}
