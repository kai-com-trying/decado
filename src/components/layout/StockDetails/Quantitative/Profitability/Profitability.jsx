import React from 'react';
import mainStyles from '../../../../../pages/StockDetailPage/StockDetail.module.css';
import styles from './Profitability.module.css';

const Profitability = ({ fiveYearEPS, fiveYearBVPS, fiveYearROE, fiveYearROIC }) => (
  <div className={`${styles.profitability} ${mainStyles.content}`}>
    <h3>Profitability (per share)</h3>
    <div className={styles.profitabilityContent}>
      <div className={styles.row}>
        <div className={styles.criteria}>
          <span>Profit per Equity Dollar</span>
          <span className={styles.subtext}>ROE</span>
        </div>
        <span className={styles.figure}>{fiveYearROE.toFixed(2)}</span>
      </div>
      <hr />
      <div className={styles.row}>
        <div className={styles.criteria}>
          <span>Profit per Debt + Equity</span>
          <span className={styles.subtext}>ROIC</span>
        </div>
        <span className={styles.figure}>{fiveYearROIC.toFixed(2)}</span>
      </div>
      <hr />
    </div>
  </div>
);

export default Profitability;