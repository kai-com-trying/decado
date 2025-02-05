import React from 'react';
import mainStyles from '../../../../pages/StockDetailPage/StockDetail.module.css';
import styles from './StockHeader.module.css';

const StockHeader = () => (
  <div className={styles.header}>
    <div className={styles.title}>
      <h1>Apple Inc. (AAPL)</h1>
      <p>Size: $10,000,000,000</p>
      <p>Website: <a href="https://www.apple.com" target='_blank' rel="noopener noreferrer">apple.com</a></p>
    </div>
    <div className={styles.details}>
      <h3>Industry: (get from api dojo)</h3>
      <h3 className={styles.PE}>P/E<sub>3Y</sub>: <span style={{ color: 38.62 <= 15 ? 'green' : 38.62 <= 25 ? 'yellow' : 'red' }}>38.62</span></h3>
    </div>
  </div>
);

export default StockHeader;