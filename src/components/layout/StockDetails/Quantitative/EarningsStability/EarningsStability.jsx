import React from 'react';
import mainStyles from '../../../../../pages/StockDetailPage/StockDetail.module.css';
import styles from './EarningsStability.module.css';
import { formatLargeNumber } from '../../../../../utils/calculations';

const EarningsStability = ({earningsHistory, declineGrowthPercentage, declineEPSPercentage, negativeNetIncomePercentage}) => {
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
                <th>Net Income Growth</th>
                <th>EPS</th>
                <th>Prev. 3Y AVG</th>
              </tr>
            </thead>
            <tbody>
            {earningsHistory.slice(0, 10).map((item, index) => (
              <tr key={index}>
                <td>{item.year}</td>
                <td>{formatLargeNumber(item.netIncome)}</td>
                <td 
                  style={{ 
                    color: item.growthNumber != null && !isNaN(item.growthNumber) 
                    ? (item.growthNumber > 0 ? 'green' : 'red')
                    : null // Default (no color) for missing values
                  }}
                  className={styles.number}
                >{item.growth}</td>
                <td 
                  className={styles.number}
                  style={{
                    color: item.eps != null && !isNaN(item.eps) && item.prev3yEpsAvg != null && !isNaN(item.prev3yEpsAvg)
                    ? (item.eps > item.prev3yEpsAvg ? 'green' : 'red')
                    : null
                  }}
                >{item.eps}</td>
                <td 
                  className={styles.number}
                >{item.roundedPrev3yEpsAvg}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        <div className={styles.rightContent}>
          <div className={styles.row}>
            <h4>Number of Losses in 10 years</h4>
            <span className={styles.figure}>{negativeNetIncomePercentage}</span>
          </div>
          <hr />
          <div className={styles.row}>
            <h4>Percentage of decline of EPS from 3 years average</h4>
            <span className={styles.figure}>{declineEPSPercentage}</span>
          </div>
          <hr />
          <div className={styles.row}>
            <h4>YoY number of decline in g</h4>
            <span className={styles.figure}>{declineGrowthPercentage}</span>
          </div>
        </div>
      </div>
    </div>
  )
};

export default EarningsStability;