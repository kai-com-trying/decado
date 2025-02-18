import React from 'react';
import mainStyles from '../../../../../pages/StockDetailPage/StockDetail.module.css';
import styles from './Profitability.module.css';
import { formatLargeNumber } from '../../../../../utils/calculations';
import { Outlet } from 'react-router-dom';
import ProfitabilityChart from '../../../Charts/ProfitabilityChart/ProfitabilityChart';
import { calculateEPS, calculateBVPS, calculateROE, calculateROIC, calculateNYearAverage } from '../../../../../utils/calculations';

const Profitability = ({ mergedData }) => {
  
  const fiveYearNetIncome = calculateNYearAverage(mergedData, 'netIncome', 5);
  const fiveYearSharesOutstanding = calculateNYearAverage(mergedData, 'commonStockSharesOutstanding', 5);
  const fiveYearEquity = calculateNYearAverage(mergedData, 'totalShareholderEquity', 5);
  const fiveYearLiabilities = calculateNYearAverage(mergedData, 'totalLiabilities', 5);

  const fiveYearROE = calculateROE(fiveYearNetIncome, fiveYearEquity);
  const fiveYearROIC = calculateROIC(fiveYearNetIncome, fiveYearLiabilities, fiveYearEquity);
  
  const profitChartData = mergedData.map((report, index) => {
    const netIncome = report.netIncome;
    const liabilities = report.totalLiabilities;
    const equity = report.totalShareholderEquity;
    const year = report.fiscalDateEnding;
    const roic = calculateROIC(netIncome, liabilities, equity);
    const roe = calculateROE(netIncome, equity);
    return { 
      year, 
      roic: isNaN(roic) || roic === "N/A" ? null : roic * 100,
      roe: isNaN(roe) || roe === "N/A" ? null : roe * 100,};
  }).reverse();

  
  return (
    <div className={`${styles.profitability} ${mainStyles.content}`}>
      <h3>5 Year Profitability</h3>
      <div className={styles.profitabilityContent}>
      <div className={styles.row}>
          <div className={styles.criteria}>
            <span>Profit per Debt + Equity</span>
            <span className={styles.subtext}>ROIC</span>
          </div>
          <span className={styles.figure}>{mergedData.length < 5 ? "Company does not have 5 years of data" : (fiveYearROIC * 100).toFixed(2)}%</span>
        </div>
        <hr />
        <div className={styles.row}>
          <div className={styles.criteria}>
            <span>Profit per Equity Dollar</span>
            <span className={styles.subtext}>ROE</span>
          </div>
          <span className={styles.figure}>{mergedData.length < 5 ? "Company does not have 5 years of data" : (fiveYearROE * 100).toFixed(2)}%</span>
        </div>
        <hr />
        <ProfitabilityChart profitChartData={profitChartData} />
      </div>
    </div>
  )
};

export default Profitability;