import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
    if (ticker) {
      const storedSOCF = localStorage.getItem(`${ticker}-SOCF`);
      const storedSOPL = localStorage.getItem(`${ticker}-SOPL`);
      const storedSOFP = localStorage.getItem(`${ticker}-SOFP`);
      const storedStockDetails = localStorage.getItem(`${ticker}-StockDetails`);
      const storedStockPrice = localStorage.getItem(`${ticker}-StockPrice`);
  
      if (storedSOCF && storedSOPL && storedSOFP && storedStockDetails && storedStockPrice) {
        dispatch({ type: 'stockSOCF/setData', payload: JSON.parse(storedSOCF) });
        dispatch({ type: 'stockSOPL/setData', payload: JSON.parse(storedSOPL) });
        dispatch({ type: 'stockSOFP/setData', payload: JSON.parse(storedSOFP) });
        dispatch({ type: 'stockDetail/setData', payload: JSON.parse(storedStockDetails) });
        dispatch({ type: 'stockPrice/setData', payload: JSON.parse(storedStockPrice) });
      } else {
        // Fetch from API and store results in localStorage
        dispatch(fetchSOCF(ticker)).then((response) => {
          if (response.payload) localStorage.setItem(`${ticker}-SOCF`, JSON.stringify(response.payload));
        });
  
        dispatch(fetchSOPL(ticker)).then((response) => {
          if (response.payload) localStorage.setItem(`${ticker}-SOPL`, JSON.stringify(response.payload));
        });
  
        dispatch(fetchSOFP(ticker)).then((response) => {
          if (response.payload) localStorage.setItem(`${ticker}-SOFP`, JSON.stringify(response.payload));
        });
  
        dispatch(fetchStockDetails(ticker)).then((response) => {
          if (response.payload) localStorage.setItem(`${ticker}-StockDetails`, JSON.stringify(response.payload));
        });
  
        dispatch(fetchStockPrice(ticker)).then((response) => {
          if (response.payload) localStorage.setItem(`${ticker}-StockPrice`, JSON.stringify(response.payload));
        });
      }
    }
  }, [dispatch, ticker]);

  const allYears = [
    ...new Set([
      ...socf.map(item => item.fiscalDateEnding),
      ...sofp.map(item => item.fiscalDateEnding),
      ...sopl.map(item => item.fiscalDateEnding)
    ])
  ];

  const mergedData = allYears.map(year => {
    const socfReport = socf.find(report => report.fiscalDateEnding === year) || {};
    const soplReport = sopl.find(report => report.fiscalDateEnding === year) || {};
    const sofpReport = sofp.find(report => report.fiscalDateEnding === year) || {};
    return { 
      year, 
      ...socfReport, 
      ...soplReport, 
      ...sofpReport };
  })

  

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
  
  //Arrays:
  const earningsHistory = mergedData.map(report => {
    const netIncome = parseFloat(report.netIncome);
    const sharesOutstanding = report.commonStockSharesOutstanding;
    const year = report.fiscalDateEnding;
    const eps = calculateEPS(netIncome, sharesOutstanding).toFixed(2);
    return { year, netIncome, eps };
  }); 



  if(isLoading) {
      return <p>Loading...</p>
  }

  if(hasError) {
      return <p>Error: {error.message || error}</p>
  }


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
        />
        <GrowthAndPe />
        <FinancialPosition />
      </div>
    </div>
  );
}

export default StockDetail
