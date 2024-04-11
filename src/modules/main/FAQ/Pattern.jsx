import * as Cells from '@/shared/patterns/graphicCells'

import styles from './styles/Pattern.module.scss'

export default function Pattern() {
  const { WhiteCell } = Cells
  return (
    <div className={styles.wrapper}>
      <div className={styles.graphicPattern}>
        <WhiteCell />
        <WhiteCell />
        <WhiteCell />
      </div>
    </div>
  )
}
