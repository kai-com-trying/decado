import React from 'react';
import mainStyles from '../../../../../pages/StockDetailPage/StockDetail.module.css';
import styles from './EarningsStability.module.css';
import { formatLargeNumber } from '../../../../../utils/calculations';
import { Outlet } from 'react-router-dom';
import EarningsChart from '../../../Charts/Earnings Chart/EarningsChart';
import { calculateEPS } from '../../../../../utils/calculations';

const EarningsStability = ({mergedData}) => {

  const maxYears = Math.min(10, mergedData.length);

  const earningsHistory = mergedData.slice(0, maxYears).map((report, index) => {
    const netIncome = report.netIncome ?? 0;
    const revenue = report.totalRevenue ?? 0;
    const sharesOutstanding = report.commonStockSharesOutstanding ?? 1;
    const year = report.fiscalDateEnding;
    const eps = sharesOutstanding > 0 ? parseFloat(calculateEPS(netIncome, sharesOutstanding).toFixed(2)) : "N/A";
    
    let growthNumber;
    let growth = "-";
    // Calculate Growth Rate
    if (index < maxYears - 1) {  // Since we're slicing to 10 items, this ensures we're within range
      const prevYearNetIncome = parseFloat(mergedData[index + 1]?.netIncome) || 0;
      
      if (prevYearNetIncome !== 0) {  // Avoid division by zero but allow negative values
          growthNumber = (((netIncome - prevYearNetIncome) / prevYearNetIncome) * 100);
          growth = growthNumber >= 0 ? `+${growthNumber.toFixed(2)}%` : `${growthNumber.toFixed(2)}%`;
      } else {
          growth = "N/A";
      }
    }

    let revGrowthNumber;
    let revGrowth = "-";
    if (index < maxYears - 1) {  // Since we're slicing to 10 items, this ensures we're within range
      const prevYearRevenue = parseFloat(mergedData[index + 1]?.totalRevenue) || 0;
      
      if (prevYearRevenue !== 0) {  // Avoid division by zero but allow negative values
          revGrowthNumber = (((revenue - prevYearRevenue) / prevYearRevenue) * 100);
          revGrowth = revGrowthNumber >= 0 ? `+${revGrowthNumber.toFixed(2)}%` : `${revGrowthNumber.toFixed(2)}%`;
      } else {
          revGrowth = "N/A";
      }
    }

    let prev3yEpsAvg;

    // Calculate 3-Year Average EPS
    if (index < maxYears - 3) {  // Ensure at least 3 years exist ahead
        const prev3YearsEPS = mergedData
            .slice(index + 1, index + 4)
            .map(r => parseFloat(calculateEPS(r.netIncome, r.commonStockSharesOutstanding)) || 0);

        if (prev3YearsEPS.length === 3) {
            prev3yEpsAvg = prev3YearsEPS.reduce((acc, val) => acc + val, 0) / 3;
            // prev3yEpsAvg = prev3YearEPSAvg;
        }
    }
    
    const roundedPrev3yEpsAvg = prev3yEpsAvg ? prev3yEpsAvg.toFixed(2) : "-";

    return { year, revenue, revGrowth, revGrowthNumber, netIncome, eps, growth, prev3yEpsAvg, growthNumber, roundedPrev3yEpsAvg };
  }); 

  const growthLength = earningsHistory.filter(item => typeof(item.growthNumber) === "number").length;
  const negativeGrowth = earningsHistory.filter(item => typeof(item.growthNumber) === "number" && item.growthNumber < 0).length;
  const declineGrowthPercentage = (((negativeGrowth / growthLength) * 100).toFixed(2)) + "%" ;

  const epsComparisonLength = earningsHistory.filter(item => typeof(item.prev3yEpsAvg) === "number").length;
  const epsDeclined = earningsHistory.filter(item => typeof(item.prev3yEpsAvg) === "number" && item.eps < item.prev3yEpsAvg).length;
  const declineEPSPercentage = (((epsDeclined / epsComparisonLength) * 100).toFixed(2)) + "%" ;

  const negativeNetIncome = earningsHistory.filter(item => item.netIncome < 0).length;
  const negativeNetIncomePercentage = ((negativeNetIncome / earningsHistory.length) * 100).toFixed(2) + "%";


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