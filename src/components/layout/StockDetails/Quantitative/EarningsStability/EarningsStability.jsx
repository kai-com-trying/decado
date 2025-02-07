import React from 'react';
import mainStyles from '../../../../../pages/StockDetailPage/StockDetail.module.css';
import styles from './EarningsStability.module.css';
import { formatLargeNumber } from '../../../../../utils/calculations';

const EarningsStability = ({earningsHistory}) => {
  /*
  {earningsHistory.map((item, index) => (
    <tr key={index}>
      <td>{item.year}</td>
      <td>{item.netIncome}</td>
      <td>growth</td>
      <td>{item.eps}</td>
      <td>{item.prev3YAvg}</td>
    </tr>
  ))}
  */

  return (
    <div className={`${styles.earningsStability} ${mainStyles.content}`}>
      <h3>Earnings Stability</h3>
      <div className={styles.earningsStabilityContent}>
        <div className={styles.leftContent}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Year</th>
                <th>Net Income</th>
                <th>growth</th>
                <th>EPS</th>
                <th>Prev. 3Y AVG</th>
              </tr>
            </thead>
            <tbody>
            {earningsHistory.slice(0, 10).map((item, index) => (
              <tr key={index}>
                <td>{item.year}</td>
                <td>{formatLargeNumber(item.netIncome)}</td>
                <td>{item.growth}</td>
                <td>{item.eps}</td>
                <td>{item.prev3YAvg}</td>
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
  )
};

export default EarningsStability;