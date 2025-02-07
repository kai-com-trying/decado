import React from 'react';
import mainStyles from '../../../../pages/StockDetailPage/StockDetail.module.css';
import styles from './StockHeader.module.css';

const StockHeader = ({ stockDetail, price, threeYearEPS }) => {

  
  const marketCap = stockDetail.MarketCapitalization
  const formattedIndustry = stockDetail.Industry ? stockDetail.Industry.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()) : "N/A";
  const conditionalSite = stockDetail.OfficialSite ? stockDetail.OfficialSite : "N/A";

  const pe = (price / threeYearEPS).toFixed(2);

  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <h1>{stockDetail.Name} ({stockDetail.Symbol})</h1>
        <p>Industry: {formattedIndustry}</p>
        <p>Market Cap: ${marketCap}</p>
        <p>Website: <a href={conditionalSite} target='_blank' rel="noopener noreferrer">{conditionalSite}</a></p>
      </div>
      <div className={styles.details}>
        <h3 className={styles.PE}>P/E<sub>3Y</sub>: <span style={{ color: pe <= 15 ? 'green' : pe <= 25 ? 'yellow' : 'red' }}>{pe}</span></h3>
      </div>
    </div>
  )
};

export default StockHeader;