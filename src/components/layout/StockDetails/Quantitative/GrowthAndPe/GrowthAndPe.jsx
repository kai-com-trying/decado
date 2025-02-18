import React from 'react';
import mainStyles from '../../../../../pages/StockDetailPage/StockDetail.module.css';
import styles from './GrowthAndPe.module.css';
import GrowthChart from '../../../Charts/GrowthChart/GrowthChart';
import { calculateEPS, calculateNYearAverage } from '../../../../../utils/calculations';

const GrowthAndPe = ({mergedData, price}) => {

  const enoughData = mergedData.length >= 13;
  const lastDecadeData = enoughData ? mergedData.slice(10, 13) : [];

  const lastDecadeThreeYearNetIncome = calculateNYearAverage(lastDecadeData, 'netIncome', 3);
  const lastDecadeThreeYearSharesOutstanding = calculateNYearAverage(lastDecadeData, 'commonStockSharesOutstanding', 3);
  
  //3 Year Calculations:
  const threeYearMaxLength = Math.min(3, mergedData.length);

  const lastThreeYearNetIncome = calculateNYearAverage(mergedData, 'netIncome', 3);
  const lastThreeYearSharesOutstanding = calculateNYearAverage(mergedData, 'commonStockSharesOutstanding', 3);
  const lastThreeYearEPS = calculateEPS(lastThreeYearNetIncome, lastThreeYearSharesOutstanding);


  const lastYear = mergedData[0]?.fiscalDateEnding ? new Date(mergedData[0].fiscalDateEnding).getFullYear() : "N/A";
  const threeYearsAgo = mergedData[2]?.fiscalDateEnding ? new Date(mergedData[2].fiscalDateEnding).getFullYear() : "N/A";
  const decadeAgo = mergedData[10]?.fiscalDateEnding ? new Date(mergedData[10].fiscalDateEnding).getFullYear() : "N/A";
  const decadeThreeYearsAgo = mergedData[12]?.fiscalDateEnding ? new Date(mergedData[12].fiscalDateEnding).getFullYear() : "N/A";
  const lastDecadeThreeYearEPS = lastDecadeThreeYearSharesOutstanding > 0 
    ? calculateEPS(lastDecadeThreeYearNetIncome, lastDecadeThreeYearSharesOutstanding) 
    : null;

  const growthOfCompany = lastDecadeThreeYearEPS > 0 
    ? (((lastThreeYearEPS - lastDecadeThreeYearEPS) / lastDecadeThreeYearEPS) * 100).toFixed(2) + "%" 
    : "N/A";

  const netIncomeGrowth = mergedData.map((report, index) => {
    const netIncome = report.netIncome ?? 0;
    const year = report.fiscalDateEnding;
    const prevYearNetIncome = mergedData[index + 1]?.netIncome ?? 0 ;
    const growthNumber = (((netIncome - prevYearNetIncome) / prevYearNetIncome) * 100);
    const growth = growthNumber >= 0 ? `+${growthNumber.toFixed(2)}%` : `${growthNumber.toFixed(2)}%`;
    return { year, netIncome, growth, growthNumber };
  });

  const pe = price > 0 && lastThreeYearEPS > 0 
    ? (price / lastThreeYearEPS).toFixed(2) 
    : "N/A";
  
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