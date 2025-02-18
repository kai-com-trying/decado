import React from 'react';
import mainStyles from '../../../../pages/StockDetailPage/StockDetail.module.css';
import styles from './StockHeader.module.css';

const StockHeader = ({ stockDetail, price }) => {

  
  const marketCap = stockDetail.MarketCapitalization
  const formattedIndustry = stockDetail.Industry ? stockDetail.Industry.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()) : "N/A";
  const conditionalSite = stockDetail.OfficialSite ? stockDetail.OfficialSite : "N/A";

  const pe = stockDetail.TrailingPE;

  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <h1>{stockDetail.Name} ({stockDetail.Symbol})</h1>
        <p>Industry: {formattedIndustry}</p>
        <p>Market Cap: ${marketCap}</p>
        <p>Website: <a className={styles.link} href={conditionalSite} target='_blank' rel="noopener noreferrer">{conditionalSite}</a></p>
        <p className={styles.disclaimer}>All data taken from <a className={styles.link} href="https://www.sec.gov/search-filings/edgar-application-programming-interfaces" target='_blank'>sec.gov</a>, which may differ from Yahoo's data</p>
        <p>If the page doesn't show the correct company, please refresh</p>
      </div>
      <div className={styles.details}>
        <h3 className={styles.PE}>P/E<sub>TTM</sub>: <span style={{ color: pe <= 15 ? 'green' : pe <= 25 ? '#717a00' : 'red' }}>{pe}</span></h3>
      </div>
    </div>
  )
};

export default StockHeader;