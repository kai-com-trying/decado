import React from 'react';
import mainStyles from '../../../../../pages/StockDetailPage/StockDetail.module.css';
import styles from './EarningsStability.module.css';
import { formatLargeNumber } from '../../../../../utils/calculations';
import { Outlet } from 'react-router-dom';
import EarningsChart from '../../../Charts/Earnings Chart/EarningsChart';

const EarningsStability = ({earningsHistory, declineGrowthPercentage, declineEPSPercentage, negativeNetIncomePercentage}) => {

  return (
    <div className={`${styles.earningsStability} ${mainStyles.content}`}>
      <h3>Earnings Stability</h3>
      <EarningsChart earningsHistory={earningsHistory} />
      <br></br><br></br>
      <div className={styles.earningsStabilityContent}>
        <div className={styles.leftContent}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Year</th>
                <th>Revenue</th>
                <th>Net Income</th>
                
                <th>EPS</th>
                <th>Prev. 3Y AVG</th>
              </tr>
            </thead>
            <tbody>
            {earningsHistory.slice(0, 10).map((item, index) => (
              <tr key={index}>
                <td>{item.year}</td>
                <td>
                  {formatLargeNumber(item.revenue)}
                  <br></br>
                  <span style={{
                    color: item.revGrowthNumber != null && !isNaN(item.revGrowthNumber)
                    ? (item.revGrowthNumber > 0 ? '#3cb37190' : '#ff000090')
                    : null // Default (no color) for missing values
                  }}>{item.revGrowth}</span>
                </td>
                <td>
                  {formatLargeNumber(item.netIncome)}
                  <br></br>
                    <span style={{ 
                      color: item.growthNumber != null && !isNaN(item.growthNumber) 
                      ? (item.growthNumber > 0 ? '#3cb37190' : '#ff000090')
                      : null // Default (no color) for missing values
                    }}>{item.growth}
                    </span>
                  </td>
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