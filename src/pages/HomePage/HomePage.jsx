import React from 'react';
import styles from './HomePage.module.css';
import SearchStocksBar from '../../components/layout/SearchStocksBar/SearchStocksBar';
import StocksList from '../../components/layout/Stocks/StocksList/StocksList';

const HomePage = () => {
  return (
    <>
      <header className={styles.header}>
        <h1>Analyse companies worth  <br></br> investing for a decade or more.</h1>
      </header>
      <SearchStocksBar />
    </>
  );
};

export default HomePage;