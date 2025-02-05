import React from 'react'
import { Link } from 'react-router-dom'
import styles from './StocksTile.module.css'



const StocksTile = ({ stock }) => {
  return (
    <div>
        <div className={styles.stockTile}>
          <Link to={`/stocks/${stock.ticker}`}>
            <div className={styles.left}>
                <div className={styles.indentifier}>
                    <p className={styles.ticker}>{stock.ticker}</p>
                    <p className={styles.name}>{stock.name}</p>
                </div>
            </div>
          </Link>
        </div>
    </div>
  )
}

export default StocksTile
