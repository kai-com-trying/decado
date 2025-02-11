import React from 'react'
import { Link } from 'react-router-dom'
import styles from './StocksTile.module.css'



const StocksTile = ({ stock }) => {
  return (
    <Link 
      to={`/stocks/${stock.ticker}`}
      className={styles.link}
    >
    <div>
        <div className={styles.stockTile}>
            <div className={styles.left}>
                <div className={styles.indentifier}>
                    <p className={styles.ticker}>{stock.ticker || stock["1. symbol"]}</p>
                    <p className={styles.name}>{stock.name || stock["2. name"]}</p>
                </div>
            </div>
        </div>
    </div>
    </Link>
  )
}

export default StocksTile
