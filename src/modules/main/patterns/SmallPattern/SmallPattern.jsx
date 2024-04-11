import classNames from 'classnames'
import * as Cells from '@/shared/patterns/graphicCells'

import styles from './patterns.module.scss'

export default function GraphicPattern() {
  const { RedCell, BlueCell, WhiteCell, ChessedCell, DonutCell } = Cells
  return (
    <div className={styles.module}>
      <div className={styles.wrapper}>
        <div className={classNames(styles.graphicPattern, styles.smallPattern)}>
          <DonutCell />
          <RedCell />
          <BlueCell />
          <ChessedCell />
          <DonutCell centerColor={'red'} />
          <WhiteCell />
          <BlueCell />
          <RedCell />
        </div>
      </div>
    </div>
  )
}
