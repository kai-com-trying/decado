import React from 'react';
import mainStyles from '../../../../../pages/StockDetailPage/StockDetail.module.css';
import styles from './GrowthAndPe.module.css';

const GrowthAndPe = () => (
  <div className={`${styles.growthAndPe} ${mainStyles.content}`}>
    <div className={styles.peHeader}>
        <h3>Growth and P/E</h3>
        <span className={styles.subtext}>P/E: price for $1 earnings</span>
    </div>
    <div className={styles.growthAndPeContent}>
      <div className={styles.row}>
        <div className={styles.criteria}>
          <span>Growth from 2011-2013 EPS to 2021-2023 EPS</span>
        </div>
        <span className={styles.figure}>Value</span>
      </div>
      <hr />
      <div className={styles.row}>
        <div className={styles.criteria}>
          <span>P/E for 2021-2023 earnings</span>
        </div>
        <span className={styles.figure}>Value</span>
      </div>
      <hr />
      <div className={styles.row}>
        <div className={styles.criteria}>
          <span>Comparison of P/E to 2022-2024 growth</span>
        </div>
        <span className={styles.figure}>Value</span>
      </div>
      <hr />
      <div className={styles.row}>
        <div className={styles.criteria}>
          <span>Comparison of P/E to next 5-year growth (PEG)</span>
        </div>
        <span className={styles.figure}>Value</span>
      </div>
      <hr />
    </div>
  </div>
);

export default GrowthAndPe;