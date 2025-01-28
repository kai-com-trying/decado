import React from 'react'
import styles from './StocksTile.module.css'



const StocksTile = ({ stock }) => {
  return (
    <div>
        <div className={styles.stockTile}>
            <h2>{stock.name}</h2>
            <p>Some Info</p>
        </div>
    </div>
  )
}

export default StocksTile
