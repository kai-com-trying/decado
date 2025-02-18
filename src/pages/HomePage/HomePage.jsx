import React from 'react';
import styles from './HomePage.module.css';
import SearchStocksBar from '../../components/layout/SearchStocksBar/SearchStocksBar';
import StocksList from '../../components/layout/Stocks/StocksList/StocksList';
import { Link } from 'react-router-dom';


const HomePage = () => {
  return (
    <>
      <header className={styles.header}>
        <h1>For Stock Analysis</h1>
        <p>Just a heads up: </p>
        <br></br>
        <ul>
          <li>⚠️If you face an error, you may have reached maximum usage, try again the next day after 12pm</li>
        </ul>

        <Link to="/stocks" >
          <button className={styles.button}>Get Started</button>
        </Link>
      </header>
    </>
  );
};

export default HomePage;