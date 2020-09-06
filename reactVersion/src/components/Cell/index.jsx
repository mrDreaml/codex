import React from 'react'
import styles from './styles.scss'

export default React.memo(({ color = '#FFF' }) => {
    return (
        <div
            className={styles.cell}
            style={{
             backgroundColor: color,
            }}
        />
    )
})
