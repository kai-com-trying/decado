import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchStocksBar from '../../components/layout/SearchStocksBar/SearchStocksBar';
import StocksList from '../../components/layout/Stocks/StocksList/StocksList';
import styles from './StocksPage.module.css'

const StocksPage = () => {
  return (
    <div className={styles.content}>
      <SearchStocksBar />
      <StocksList />
    </div>
  )
}

export default StocksPage
