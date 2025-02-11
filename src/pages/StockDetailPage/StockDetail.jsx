import React, { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSOCF } from '../../features/stockSOCFSlice';
import { fetchSOFP } from '../../features/stockSOFPSlice';
import { fetchSOPL } from '../../features/stockSOPLSlice';
import { fetchStockDetails } from '../../features/stockDetailSlice';
import { fetchStockPrice } from '../../features/stockPriceSlice';
import StockHeader from '../../components/layout/StockDetails/Header/StockHeader';
import Profitability from '../../components/layout/StockDetails/Quantitative/Profitability/Profitability';
import EarningsStability from '../../components/layout/StockDetails/Quantitative/EarningsStability/EarningsStability';
import GrowthAndPe from '../../components/layout/StockDetails/Quantitative/GrowthAndPe/GrowthAndPe';
import FinancialPosition from '../../components/layout/StockDetails/Quantitative/FinancialPosition/FinancialPosition';
import styles from './StockDetail.module.css';
import { calculateEPS, calculateBVPS, calculateROE, calculateROIC, calculateNYearAverage, formatLargeNumber } from '../../utils/calculations';

const StockDetail = () => {
  const { ticker } = useParams()
  const dispatch = useDispatch()
  const { socf, loading: socfLoading, error: socfError } = useSelector((state) => state.socf);
  const { sopl, loading: soplLoading, error: soplError } = useSelector((state) => state.sopl);
  const { sofp, loading: sofpLoading, error: sofpError } = useSelector((state) => state.sofp);
  const { detail, loading: stockDetailLoading, error: stockDetailError } = useSelector((state) => state.stockDetail);
  const { price, loading: stockPriceLoading, error: stockPriceError } = useSelector((state) => state.stockPrice);

  const isLoading = socfLoading || soplLoading || sofpLoading || stockDetailLoading || stockPriceLoading;
  const hasError = socfError || soplError || sofpError || stockDetailError || stockPriceError;


  useEffect(() => {
    if (ticker && !socf.length && !sofp.length && !sopl.length) {
      dispatch(fetchSOCF(ticker));
      dispatch(fetchSOPL(ticker));
      dispatch(fetchSOFP(ticker));
      dispatch(fetchStockDetails(ticker));
      dispatch(fetchStockPrice(ticker));
    }
  }, [dispatch, ticker, socf, sofp, sopl]);


  

  

  const mergedData = useMemo(() => {
    if(!socf.length || !sofp.length || !sopl.length) return [];

    const allYears = [
      ...new Set([
        ...socf.map(item => item.fiscalDateEnding),
        ...sofp.map(item => item.fiscalDateEnding),
        ...sopl.map(item => item.fiscalDateEnding)
      ])
    ];

    return allYears.map(year => {
      const socfReport = socf.find(report => report.fiscalDateEnding === year) || {};
      const soplReport = sopl.find(report => report.fiscalDateEnding === year) || {};
      const sofpReport = sofp.find(report => report.fiscalDateEnding === year) || {};
      return { 
        year, 
        ...socfReport, 
        ...soplReport, 
        ...sofpReport };
    });
  }, [socf, sofp, sopl]); 

  //5 Year Calculations:

  const fiveYearNetIncome = calculateNYearAverage(mergedData, 'netIncome', 5);
  const fiveYearSharesOutstanding = calculateNYearAverage(mergedData, 'commonStockSharesOutstanding', 5);
  const fiveYearEquity = calculateNYearAverage(mergedData, 'totalShareholderEquity', 5);
  const fiveYearLiabilities = calculateNYearAverage(mergedData, 'totalLiabilities', 5);

  const fiveYearEPS = calculateEPS(fiveYearNetIncome, fiveYearSharesOutstanding);
  const fiveYearBVPS = calculateBVPS(fiveYearEquity, fiveYearSharesOutstanding);
  const fiveYearROE = calculateROE(fiveYearNetIncome, fiveYearEquity);
  const fiveYearROIC = calculateROIC(fiveYearNetIncome, fiveYearLiabilities, fiveYearEquity);
  
  //3 Year Calculations:
  const threeYearNetIncome = calculateNYearAverage(mergedData, 'netIncome', 3);
  const threeYearSharesOutstanding = calculateNYearAverage(mergedData, 'commonStockSharesOutstanding', 3);
  
  const threeYearEPS = calculateEPS(threeYearNetIncome, threeYearSharesOutstanding);
  
  //Earnings Stability:
  const earningsHistory = mergedData.slice(0, 10).map((report, index) => {
    const netIncome = report.netIncome;
    const sharesOutstanding = report.commonStockSharesOutstanding;
    const year = report.fiscalDateEnding;
    const eps = parseFloat(calculateEPS(netIncome, sharesOutstanding).toFixed(2));
    let growthNumber;
    let growth = "-";
    // Calculate Growth Rate
    if (index < 9) {  // Since we're slicing to 10 items, this ensures we're within range
      const prevYearNetIncome = parseFloat(mergedData[index + 1]?.netIncome) || 0;
      
      if (prevYearNetIncome !== 0) {  // Avoid division by zero but allow negative values
          growthNumber = (((netIncome - prevYearNetIncome) / prevYearNetIncome) * 100);
          growth = growthNumber >= 0 ? `+${growthNumber.toFixed(2)}%` : `${growthNumber.toFixed(2)}%`;
      } else {
          growth = "N/A";
      }
    }

    let prev3yEpsAvg;

    // Calculate 3-Year Average EPS
    if (index < 7) {  // Ensure at least 3 years exist ahead
        const prev3YearsEPS = mergedData
            .slice(index + 1, index + 4)
            .map(r => parseFloat(calculateEPS(r.netIncome, r.commonStockSharesOutstanding)) || 0);

        if (prev3YearsEPS.length === 3) {
            prev3yEpsAvg = prev3YearsEPS.reduce((acc, val) => acc + val, 0) / 3;
            // prev3yEpsAvg = prev3YearEPSAvg;
        }
    }
    
    const roundedPrev3yEpsAvg = prev3yEpsAvg ? prev3yEpsAvg.toFixed(2) : "-";

    return { year, netIncome, eps, growth, prev3yEpsAvg, growthNumber, roundedPrev3yEpsAvg };
  }); 

  const growthLength = earningsHistory.filter(item => typeof(item.growthNumber) === "number").length;
  const negativeGrowth = earningsHistory.filter(item => typeof(item.growthNumber) === "number" && item.growthNumber < 0).length;
  const declineGrowthPercentage = (((negativeGrowth / growthLength) * 100).toFixed(2)) + "%" ;

  const epsComparisonLength = earningsHistory.filter(item => typeof(item.prev3yEpsAvg) === "number").length;
  const epsDeclined = earningsHistory.filter(item => typeof(item.prev3yEpsAvg) === "number" && item.eps < item.prev3yEpsAvg).length;
  const declineEPSPercentage = (((epsDeclined / epsComparisonLength) * 100).toFixed(2)) + "%" ;

  const negativeNetIncome = earningsHistory.filter(item => item.netIncome < 0).length;
  const negativeNetIncomePercentage = ((negativeNetIncome / earningsHistory.length) * 100).toFixed(2) + "%";

  //Growth of Company:
  const lastThreeYearNetIncome = calculateNYearAverage(mergedData, 'netIncome', 3);
  const lastThreeYearSharesOutstanding = calculateNYearAverage(mergedData, 'commonStockSharesOutstanding', 3);
  const lastThreeYearEPS = calculateEPS(lastThreeYearNetIncome, lastThreeYearSharesOutstanding);

  const lastDecadeThreeYearNetIncome = calculateNYearAverage(mergedData.slice(10, 13), 'netIncome', 3);
  const lastDecadeThreeYearSharesOutstanding = calculateNYearAverage(mergedData.slice(10, 13), 'commonStockSharesOutstanding', 3);
  const lastYear = mergedData[0]?.fiscalDateEnding ? new Date(mergedData[0].fiscalDateEnding).getFullYear() : "N/A";
  const threeYearsAgo = mergedData[2]?.fiscalDateEnding ? new Date(mergedData[2].fiscalDateEnding).getFullYear() : "N/A";
  const decadeAgo = mergedData[10]?.fiscalDateEnding ? new Date(mergedData[10].fiscalDateEnding).getFullYear() : "N/A";
  const decadeThreeYearsAgo = mergedData[12]?.fiscalDateEnding ? new Date(mergedData[12].fiscalDateEnding).getFullYear() : "N/A";
  console.log(lastYear, threeYearsAgo, decadeAgo, decadeThreeYearsAgo)
  const lastDecadeThreeYearEPS = calculateEPS(lastDecadeThreeYearNetIncome, lastDecadeThreeYearSharesOutstanding);

  const growthOfCompany = (((lastThreeYearEPS - lastDecadeThreeYearEPS) / lastDecadeThreeYearEPS) * 100).toFixed(2) + "%";

  //Financial Position:
  const fiveYearFinancialCondition = mergedData.slice(0,5).map((report) => {
    const ca = report.totalCurrentAssets;
    const cl = report.totalCurrentLiabilities;
    const totalDebt = report.totalLiabilities;
    const totalShareholderEquity = report.totalShareholderEquity;

    const cacl = ca / cl;
    const debtToEquity = totalDebt / totalShareholderEquity;
    
    return {cacl, debtToEquity}
  })
  // Calculate averages
  const total = fiveYearFinancialCondition.length;

  const avgCACL = fiveYearFinancialCondition.reduce((sum, item) => sum + item.cacl, 0) / total;
  const avgDebtToEquity = fiveYearFinancialCondition.reduce((sum, item) => sum + item.debtToEquity, 0) / total;


  if(isLoading) return <div className={styles.loading}></div>
  if(hasError) return (
    <div className={styles.error}>
      <p>Error: {hasError}</p>
      <Link to='/'>
        <button>Return Home</button>
      </Link>
    </div>
  )
  if(!mergedData.length) return (
    <div className={styles.error}>
      <p>No data available for this stock</p>
    </div>
  )


  return (
    <div>
      <StockHeader 
        stockDetail={detail}
        price={price.price}
        threeYearEPS={threeYearEPS}
      />
      <div className={styles.quantitative}>
        <Profitability
          fiveYearEPS={fiveYearEPS}
          fiveYearBVPS={fiveYearBVPS}
          fiveYearROE={fiveYearROE}
          fiveYearROIC={fiveYearROIC}
        />
        <EarningsStability
          earningsHistory={earningsHistory}
          declineGrowthPercentage={declineGrowthPercentage}
          declineEPSPercentage={declineEPSPercentage}
          negativeNetIncomePercentage={negativeNetIncomePercentage}
        />
        <GrowthAndPe 
          growthOfCompany={growthOfCompany}
          threeYearEPS={threeYearEPS}
          price={price.price}
          lastYear={lastYear}
          threeYearsAgo={threeYearsAgo}
          decadeAgo={decadeAgo}
          decadeThreeYearsAgo={decadeThreeYearsAgo}
        />
        <FinancialPosition
          avgCACL={avgCACL}
          avgDebtToEquity={avgDebtToEquity}
        />
      </div>
    </div>
  );
}

export default StockDetail
