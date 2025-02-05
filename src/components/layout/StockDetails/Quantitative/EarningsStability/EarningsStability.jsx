import React from 'react';
import mainStyles from '../../../../../pages/StockDetailPage/StockDetail.module.css';
import styles from './EarningsStability.module.css';

const EarningsStability = () => (
  <div className={`${styles.earningsStability} ${mainStyles.content}`}>
    <h3>Earnings Stability</h3>
    <div className={styles.earningsStabilityContent}>
      <div className={styles.leftContent}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Year</th>
              <th>EPS</th>
              <th>growth</th>
              <th>3Y AVG g</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 11 }, (_, i) => 2013 + i).map(year => (
              <tr key={year}>
                <td>{year}</td>
                <td>EPS Value</td>
                <td>g Value</td>
                <td>3Y AVG g Value</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.rightContent}>
        <div className={styles.row}>
          <h4>Percentage of decline of EPS from 3 years average</h4>
          <span className={styles.figure}>Value</span>
        </div>
        <hr />
        <div className={styles.row}>
          <h4>YoY number of decline in g</h4>
          <span className={styles.figure}>Value</span>
        </div>
      </div>
    </div>
  </div>
);

export default EarningsStability;