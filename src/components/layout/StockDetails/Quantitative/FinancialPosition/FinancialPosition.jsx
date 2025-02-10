import React from 'react';
import mainStyles from '../../../../../pages/StockDetailPage/StockDetail.module.css';
import styles from './FinancialPosition.module.css';

const FinancialPosition = ({avgCACL, avgDebtToEquity}) => (
  <div className={`${styles.financialPosition} ${mainStyles.content}`}>
    <h3>Financial Condition</h3>
    <div className={styles.financialPositionContent}>
      <div className={styles.cacl}>
        <div className={styles.left}>
          <span>{avgCACL.toFixed(2)}</span>
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
      
      <div className={styles.cacl}>
        <div className={styles.left}>
          <span>{avgDebtToEquity.toFixed(2)}</span>
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
    </div>
  </div>
);

export default FinancialPosition;