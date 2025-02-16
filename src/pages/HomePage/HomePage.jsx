import React from 'react';
import styles from './HomePage.module.css';
import SearchStocksBar from '../../components/layout/SearchStocksBar/SearchStocksBar';
import StocksList from '../../components/layout/Stocks/StocksList/StocksList';
import { Link } from 'react-router-dom';


const HomePage = () => {
  return (
    <>
      <header className={styles.header}>
        <h1>Analyse companies worth  <br></br> investing for a decade or more.</h1>
        <p>Just a heads up: </p>
        <br></br>
        <ul>
          <li>⚠️Some companies are not 10 years or older, pages may not load</li>
          <li>⚠️There are certain flaws in calculations for edge cases for now</li>
          <li>⚠️If you face an error, you may have reached maximum usage, try again the next day after 12pm</li>
          <li>⚠️The search bar is still in development, thank you for your patience</li>
        </ul>

        <Link to="/stocks" >
          <button className={styles.button}>Get Started</button>
        </Link>
      </header>
    </>
  );
};

export default HomePage;