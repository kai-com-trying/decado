import React from 'react';
import mainStyles from '../../../../../pages/StockDetailPage/StockDetail.module.css';
import styles from './GrowthAndPe.module.css';
import GrowthChart from '../../../Charts/GrowthChart/GrowthChart';

const GrowthAndPe = ({growthOfCompany, threeYearEPS, price, lastThreeYears, lastDecadeThreeYears, lastYear, threeYearsAgo, decadeAgo, decadeThreeYearsAgo, netIncomeGrowth}) => {

  const pe = (price / threeYearEPS).toFixed(2);

  return (
    <div className={`${styles.growthAndPe} ${mainStyles.content}`}>
      <div className={styles.peHeader}>
          <h3>Growth and P/E</h3>
          <span className={styles.subtext}>P/E: price for $1 earnings</span>
      </div>
      <div className={styles.growthAndPeContent}>
        <div className={styles.row}>
          <div className={styles.criteria}>
            <span>Growth of EPS from {decadeThreeYearsAgo}-{decadeAgo} to {threeYearsAgo}-{lastYear} </span>
          </div>
          <span className={styles.figure}>{growthOfCompany}</span>
        </div>
        <hr />
        <div className={styles.row}>
          <div className={styles.criteria}>
            <span>P/E for {threeYearsAgo} to {lastYear}</span>
          </div>
          <span className={styles.figure}>${pe}</span>
        </div>
        <hr />
        <GrowthChart netIncomeGrowth={netIncomeGrowth} />
      </div>
    </div>)
};

export default GrowthAndPe;