import classNames from 'classnames'
import Animation from '@/containers/Animation'
import * as Cells from '@/shared/patterns/graphicCells'

import styles from './patterns.module.scss'

export default function Pattern() {
  const { RedCell, BlueCell, DonutCell, ChessedCell } = Cells
  return (
    <div className={styles.module}>
      <div className={styles.wrapper}>
        <div className={classNames(styles.graphicPattern, styles.largePattern)}>
          <Animation
            delay={500}
            duration={500}
            animation={'custom-zoom-in'}
            anchorPlacement={'bottom-bottom'}
          >
            <CellBox>
              <DonutCell />
            </CellBox>
          </Animation>

          <Animation
            delay={1000}
            duration={500}
            animation={'custom-shutter-ver-top'}
            anchorPlacement={'bottom-bottom'}
          >
            <CellBox>
              <RedCell />
            </CellBox>
          </Animation>

          <CellBox>
            <BlueCell />
          </CellBox>

          <Animation
            delay={1500}
            duration={1000}
            animation={'custom-shutter-hor-right'}
            anchorPlacement={'bottom-bottom'}
          >
            <CellBox>
              <ChessedCell />
            </CellBox>
          </Animation>
        </div>
      </div>
    </div>
  )
}

function CellBox({ children }) {
  return <div className={styles.cellBox}>{children}</div>
}
