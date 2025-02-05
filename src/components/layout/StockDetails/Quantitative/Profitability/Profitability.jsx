import React from 'react';
import mainStyles from '../../../../../pages/StockDetailPage/StockDetail.module.css';
import styles from './Profitability.module.css';

const Profitability = () => (
  <div className={`${styles.profitability} ${mainStyles.content}`}>
    <h3>Profitability (per share)</h3>
    <div className={styles.profitabilityContent}>
      <div className={styles.row}>
        <div className={styles.criteria}>
          <span>Profit per asset</span>
          <span className={styles.subtext}>EPS/BVPS</span>
        </div>
        <span className={styles.figure}>$1.23</span>
      </div>
      <hr />
      <div className={styles.row}>
        <div className={styles.criteria}>
          <span>Profit per Equity Dollar</span>
          <span className={styles.subtext}>ROE</span>
        </div>
        <span className={styles.figure}>$2.34</span>
      </div>
      <hr />
      <div className={styles.row}>
        <div className={styles.criteria}>
          <span>Profit per Debt + Equity</span>
          <span className={styles.subtext}>ROIC</span>
        </div>
        <span className={styles.figure}>$3.45</span>
      </div>
      <hr />
    </div>
  </div>
);

export default Profitability;