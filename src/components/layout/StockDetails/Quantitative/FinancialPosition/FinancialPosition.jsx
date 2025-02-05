import React from 'react';
import styles from '../../../../../pages/StockDetailPage/StockDetail.module.css';

const FinancialPosition = () => (
  <div className={`${styles.financialPosition} ${styles.content}`}>
    <h3>Financial Position</h3>
    <div className={styles.financialPositionContent}>
      <div className={styles.left}>
        <span>2</span>
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
  </div>
);

export default FinancialPosition;