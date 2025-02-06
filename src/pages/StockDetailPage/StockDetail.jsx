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
import { calculateEPS, calculateBVPS, calculateROE, calculateROIC, calculate5YearAverage, calculate3YearAverage } from '../../utils/calculations';

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

      // If data is available in localStorage, set it in the store without calling the API
      if (storedSOCF && storedSOPL && storedSOFP && storedStockDetails && storedStockPrice) {
        dispatch({ type: 'stockSOCF/setData', payload: JSON.parse(storedSOCF) });
        dispatch({ type: 'stockSOPL/setData', payload: JSON.parse(storedSOPL) });
        dispatch({ type: 'stockSOFP/setData', payload: JSON.parse(storedSOFP) });
        dispatch({ type: 'stockDetail/setData', payload: JSON.parse(storedStockDetails) });
        dispatch({ type: 'stockPrice/setData', payload: JSON.parse(storedStockPrice) });
      } else {
        // Dispatch API calls to fetch data and save them to localStorage
        dispatch(fetchSOCF(ticker));
        dispatch(fetchSOPL(ticker));
        dispatch(fetchSOFP(ticker));
        dispatch(fetchStockDetails(ticker));
        dispatch(fetchStockPrice(ticker));
      }
    }
  }, [dispatch, ticker]);

  

  //5 Year Calculations:
  const fiveYearNetIncome = calculate5YearAverage(sopl, 'netIncome');
  const fiveYearSharesOutstanding = calculate5YearAverage(sofp, 'commonStockSharesOutstanding');
  const fiveYearEquity = calculate5YearAverage(sofp, 'totalShareholderEquity');
  const fiveYearLiabilities = calculate5YearAverage(sofp, 'totalLiabilities');

  const fiveYearEPS = calculateEPS(fiveYearNetIncome, fiveYearSharesOutstanding);
  const fiveYearBVPS = calculateBVPS(fiveYearEquity, fiveYearSharesOutstanding);
  const fiveYearROE = calculateROE(fiveYearNetIncome, fiveYearEquity);
  const fiveYearROIC = calculateROIC(fiveYearNetIncome, fiveYearLiabilities, fiveYearEquity);
  
  //3 Year Calculations:
  const threeYearNetIncome = calculate3YearAverage(sopl, 'netIncome');
  const threeYearSharesOutstanding = calculate3YearAverage(sofp, 'commonStockSharesOutstanding');
  
  const threeYearEPS = calculateEPS(threeYearNetIncome, threeYearSharesOutstanding);
  

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
        <EarningsStability />
        <GrowthAndPe />
        <FinancialPosition />
      </div>
    </div>
  );
}

export default StockDetail
