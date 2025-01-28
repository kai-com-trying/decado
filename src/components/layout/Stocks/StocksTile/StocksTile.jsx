import React from 'react'
import styles from './StocksTile.module.css'



const StocksTile = ({ stock }) => {
  return (
    <div>
        <div 
            className={styles.stockTile}
            style={stock.netchange > 0 ? {backgroundColor: '#9EC8B9'} : {backgroundColor: '#C89F9E'}}
        >
            <div className={styles.left}>
                <div className={styles.indentifier}>
                    <p className={styles.ticker}>{stock.symbol}</p>
                    <p className={styles.name}>{stock.name}</p>
                </div>
                <div className={styles.size}>
                    <p>${stock.marketCap}</p>
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.priceAndChange}>
                    <div className={styles.price}>
                        <p>{stock.lastsale}</p>
                    </div>
                    <div className={styles.change}>
                        <p>${stock.netchange}</p>
                        <p>{stock.pctchange}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default StocksTile
