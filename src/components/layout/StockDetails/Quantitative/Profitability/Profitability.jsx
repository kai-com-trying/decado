import React from 'react';
import mainStyles from '../../../../../pages/StockDetailPage/StockDetail.module.css';
import styles from './Profitability.module.css';
import { formatLargeNumber } from '../../../../../utils/calculations';
import { Outlet } from 'react-router-dom';
import ProfitabilityChart from '../../../Charts/ProfitabilityChart/ProfitabilityChart';

const Profitability = ({ fiveYearEPS, fiveYearBVPS, fiveYearROE, fiveYearROIC, profitChartData }) => (
  <div className={`${styles.profitability} ${mainStyles.content}`}>
    <h3>5 Year Profitability</h3>
    <div className={styles.profitabilityContent}>
    <div className={styles.row}>
        <div className={styles.criteria}>
          <span>Profit per Debt + Equity</span>
          <span className={styles.subtext}>ROIC</span>
        </div>
        <span className={styles.figure}>{(fiveYearROIC * 100).toFixed(2)}%</span>
      </div>
      <hr />
      <div className={styles.row}>
        <div className={styles.criteria}>
          <span>Profit per Equity Dollar</span>
          <span className={styles.subtext}>ROE</span>
        </div>
        <span className={styles.figure}>{(fiveYearROE * 100).toFixed(2)}%</span>
      </div>
      <hr />
      <ProfitabilityChart profitChartData={profitChartData} />
    </div>
  </div>
);

export default Profitability;