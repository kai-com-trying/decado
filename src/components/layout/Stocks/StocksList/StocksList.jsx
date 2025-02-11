import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchStocks } from '../../../../features/allStocksSlice'
import StocksTile from '../StocksTile/StocksTile'
import styles from './StocksList.module.css'
import { fetchSearchResults } from '../../../../features/searchSlice'
import { Link } from 'react-router-dom'

const StocksList = () => {

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(fetchStocks())
    }, [dispatch])

    const searchResult = useSelector((state) => state.search.searchResults)
    useEffect(() => {
        console.log(searchResult)
    }, [searchResult])

    const { stocks, loading, error } = useSelector((state) => state.allStocks)
    
    if(loading) {
        return <div className={styles.loading}></div>
    } 

    if(error) {
        return (
            <div className={styles.error}>
                <p>Error: {error.message || error}</p>
                <p>Return <Link to="/">Home</Link></p>
            </div>
        )
    }   

    const displayStock = searchResult.length > 0 ? searchResult : stocks;

    return (
        <div className={styles.stocksList}>
            {displayStock.map((stock) => (
                <div key={stock.ticker || stock["1. symbol"]} className={styles.tiles} >
                    <StocksTile stock={stock} />
                </div>
            ))}
        </div>
    )

}

export default StocksList
