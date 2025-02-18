import React from 'react'
import { Link } from 'react-router-dom'
import styles from './StocksTile.module.css'



const StocksTile = ({ stock }) => {
  return (
    <div>
      <Link 
        to={`/stocks/${stock.ticker || stock["1. symbol"]}`}
        className={styles.link}
      >
        <div className={styles.stockTile}>
            <div className={styles.left}>
                <div className={styles.indentifier}>
                    <p className={styles.ticker}>{stock.ticker || stock["1. symbol"]}</p>
                    <p className={styles.name}>{stock.name || stock.title}</p>
                </div>
            </div>
        </div>
      </Link>
    </div>
  )
}

export default StocksTile
