import React from 'react';
import mainStyles from '../../../../../pages/StockDetailPage/StockDetail.module.css';
import styles from './GrowthAndPe.module.css';

const GrowthAndPe = ({growthOfCompany, threeYearEPS, price, lastThreeYears, lastDecadeThreeYears}) => {

  const pe = (price / threeYearEPS).toFixed(2);

  return (
    <div className={`${styles.growthAndPe} ${mainStyles.content}`}>
      <div className={styles.peHeader}>
          <h3>Growth and P/E</h3>
          <span className={styles.subtext}>P/E: price for $1 earnings</span>
      </div>
      <div className={styles.growthAndPeContent}>
        <div className={styles.row}>
          <div className={styles.criteria}>
            <span>Growth from 20someth EPS to 20sth EPS</span>
          </div>
          <span className={styles.figure}>{growthOfCompany}</span>
        </div>
        <hr />
        <div className={styles.row}>
          <div className={styles.criteria}>
            <span>P/E for 20sth earnings</span>
          </div>
          <span className={styles.figure}>${pe}</span>
        </div>
        <hr />
        {/* <div className={styles.row}>
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
        <hr /> */}
      </div>
    </div>)
};

export default GrowthAndPe;