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
        return <p>Loading...</p>
    } 

    if(error) {
        return <p>Error: {error.message || error}</p>
    }   

    return (
        <div>
            {stocks.map((stock) => (
                <StocksTile key={stock.ticker} stock={stock} />
            ))}
        </div>
    )

}

export default StocksList
