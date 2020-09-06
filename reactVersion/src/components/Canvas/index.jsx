import React from 'react'
import Cell from '../Cell'

import styles from './styles.scss'

export default React.memo(({ data }) => console.log('rerender') || data.map(row => (
    <div className={styles.row}>{row.map(cellProps => (
        <div className={styles.cell}>
            <Cell {...cellProps }/>
        </div>
    ))}</div>
)))
