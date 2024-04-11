import * as Cells from '@/shared/patterns/graphicCells'

import styles from './styles/Banner404.module.scss'

export default function StripedPattern() {
  const { StripedCell } = Cells
  return (
    <div className={styles.graphicPattern}>
      <StripedCell firstColor={'blue'} secondColor={'red'} />
      <StripedCell firstColor={'red'} secondColor={'blue'} />
    </div>
  )
}
export { StripedPattern }
