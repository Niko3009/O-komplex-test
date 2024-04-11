import classNames from 'classnames'
import styles from './graphicCells.module.scss'

export function RedCell() {
  return <div className={classNames(styles.graphicCell, styles.redCell)} />
}

export function BlueCell() {
  return <div className={classNames(styles.graphicCell, styles.blueCell)} />
}

export function WhiteCell() {
  return <div className={classNames(styles.graphicCell, styles.whiteCell)} />
}

export function DonutCell({ sideСolor = 'blue', centerColor = 'white' }) {
  const classes = [
    styles.graphicCell,
    styles.donutCell,
    styles[`${sideСolor}Cell`],
  ]
  return (
    <div className={classNames(classes)}>
      <div className={styles[`${centerColor}Cell`]} />
    </div>
  )
}

export function StripedCell({
  stripesNum = 5,
  firstColor = 'blue',
  secondColor = 'red',
}) {
  const stripes = [...new Array(stripesNum)].map((item, i) => {
    const color = i % 2 ? firstColor : secondColor
    return <div className={styles[`${color}Cell`]} key={i} />
  })
  const classes = [
    styles.graphicCell,
    styles.stripedCell,
    styles[`with${stripesNum}stripes`],
  ]
  return <div className={classNames(classes)}>{stripes}</div>
}

export function ChessedCell({
  colsNum = 5,
  firstСolor = 'red',
  secondColor = 'blue',
  isDiagonalLine = true,
}) {
  const rowsNum = colsNum
  const cells = [...new Array(rowsNum * colsNum)].map((item, i) => {
    const color = i % 2 ? firstСolor : secondColor
    return <div className={styles[`${color}Cell`]} key={i} />
  })
  if (isDiagonalLine)
    for (let i = 0; i < colsNum; i++) {
      const DiagonalCell = () => <div className={styles.whiteCell} />
      cells.splice((i + 1) * (colsNum - 1), 0, <DiagonalCell key={`d-${i}`} />)
      cells.splice((i + 1) * colsNum, 1)
    }
  const classes = [
    styles.graphicCell,
    styles.chessedCell,
    styles[`with${rowsNum}x${colsNum}cells`],
  ]
  return <div className={classNames(classes)}>{cells}</div>
}
