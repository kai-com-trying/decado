import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchStocks } from '../../../../features/allStocksSlice'
import StocksTile from '../StocksTile/StocksTile'
import styles from './StocksList.module.css'
import { fetchSearchResults } from '../../../../features/searchSlice'
import { Link } from 'react-router-dom';
import { stockArray } from '../../../../api/secData'

const StocksList = () => {
    const [n, setN] = useState(31);
    const dispatch = useDispatch()
    
    // useEffect(() => {
    //     dispatch(fetchStocks())
    // }, [dispatch])

    const searchResult = useSelector((state) => state.search.searchResults);
    
    // useEffect(() => {
    //     console.log(searchResult)
    // }, [searchResult])

    // const { stocks, loading, error } = useSelector((state) => state.allStocks)
    
    // if(loading) {
    //     return <div className={styles.loading}></div>
    // } 

    // if(error) {
    //     return (
    //         <div className={styles.error}>
    //             <p>Error: {error.message || error}</p>
    //             <p>Return <Link to="/">Home</Link></p>
    //         </div>
    //     )
    // }   

    const addSlice = () => {
        setN((prev) => prev + 30);
    }

    const compress = () => {
        setN(31);
    };

    const displayStock = searchResult.length > 0 ? searchResult : stockArray.slice(1, n);

    return (
        <div>
            <div className={styles.stocksList}>
                {displayStock.map((stock) => (
                    <div key={stock.ticker} className={styles.tiles} >
                        <StocksTile stock={stock} />
                    </div>
                ))}
            </div>
            <div className={styles.button}>
                <button onClick={compress}>Compress</button>
                <button onClick={addSlice}>Load More...</button>
            </div>
        </div>
    )

}

export default StocksList
