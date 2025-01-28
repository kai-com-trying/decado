import React from 'react';
import styles from './HomePage.module.css';
import SearchStocksBar from '../../components/layout/SearchStocksBar/SearchStocksBar';
import StocksList from '../../components/layout/Stocks/StocksList/StocksList';

const HomePage = () => {
  return (
    <>
      <header className={styles.header}>
        <h1>Your first step to being an <br></br>intelligent investor starts here.</h1>
      </header>
      <SearchStocksBar />
      <StocksList />
    </>
  );
};

export default HomePage;