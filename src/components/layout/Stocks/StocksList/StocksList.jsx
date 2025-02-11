import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchStocks } from '../../../../features/allStocksSlice'
import StocksTile from '../StocksTile/StocksTile'
import styles from './StocksList.module.css'

const StocksList = () => {

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(fetchStocks())
    }, [dispatch])

    const { stocks, loading, error } = useSelector((state) => state.allStocks)
    
    if(loading) {
        return <div className={styles.loading}></div>
    } 

    if(error) {
        return <p>Error: {error.message || error}</p>
    }   

    return (
        <div className={styles.stocksList}>
            {stocks.map((stock) => (
                <div key={stock.ticker} className={styles.tiles} >
                    <StocksTile stock={stock} />
                </div>
            ))}
        </div>
    )

}

export default StocksList
