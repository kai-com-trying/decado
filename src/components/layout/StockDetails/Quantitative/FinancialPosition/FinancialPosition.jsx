import React from 'react';
import mainStyles from '../../../../../pages/StockDetailPage/StockDetail.module.css';
import styles from './FinancialPosition.module.css';
import CurrentRatioChart from '../../../Charts/CurrentRatioChart/CurrentRatioChart';
import DebtToEquityChart from '../../../Charts/DebtToEquityChart/DebtToEquityChart';
import { merge } from 'chart.js/helpers';

const FinancialPosition = ({mergedData}) => {

  const calculatedFinancialCondition  = mergedData.map((report) => {
    const year = report.fiscalDateEnding;
    const ca = report.totalCurrentAssets;
    const cl = report.totalCurrentLiabilities;
    const totalDebt = report.totalLiabilities;
    const totalShareholderEquity = report.totalShareholderEquity;

    const cacl = cl > 0 ? ca / cl : "N/A";
    const debtToEquity = totalShareholderEquity > 0 ? totalDebt / totalShareholderEquity : "N/A";
    
    return {year, ca, cl, cacl, totalDebt, totalShareholderEquity, debtToEquity}
  })

 

  const fc = calculatedFinancialCondition[0];

  return (
    <div className={`${styles.financialPosition} ${mainStyles.content}`}>
      <h3>Financial Condition as of {(mergedData[0].year)}</h3>
      <div className={styles.financialPositionContent}>
        {fc.cl > 0 ? (
          <div className={styles.cacl}>
            <div className={styles.diagram}>
            <CurrentRatioChart cacl={fc.cacl} />
          </div>
          <div className={styles.caclText}>
            <div className={styles.left}>
              <span>{fc.cacl.toFixed(2)}</span>
              <span className={styles.subtext}>Current Asset</span>
            </div>
            <div className={styles.center}>
              <span>:</span>
            </div>
            <div className={styles.right}>
              <span>1</span>
              <span className={styles.subtext}>Current Liability</span>
            </div>
          </div>
        </div>) : (
          <div className={styles.no_cl}>
            <h3>No current liability for the firm</h3>
          </div>
        )}
        <hr></hr>
        {fc.totalShareholderEquity > 0 ? (<div className={styles.cacl}>
          <div className={styles.diagram}>
            <DebtToEquityChart debtToEquity={fc.debtToEquity} />
          </div>
          <div className={styles.caclText}>
            <div className={styles.left}>
              <span>{fc.debtToEquity.toFixed(2)}</span>
              <span className={styles.subtext}>Total Debt</span>
            </div>
            <div className={styles.center}>
              <span>:</span>
            </div>
            <div className={styles.right}>
              <span>1</span>
              <span className={styles.subtext}>Shareholder's Equity</span>
            </div>
          </div>
        </div> ) : (
          <div className={styles.no_cl}>
            <h3>Shareholder equity ≤ 0</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialPosition;