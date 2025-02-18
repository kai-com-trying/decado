import React, { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSOCF, resetSOCF } from '../../features/stockSOCFSlice';
import { fetchSOFP, resetSOFP } from '../../features/stockSOFPSlice';
import { fetchSOPL, resetSOPL } from '../../features/stockSOPLSlice';
import { fetchStockDetails, resetDetails } from '../../features/stockDetailSlice';
import { fetchStockPrice, resetStockPrice } from '../../features/stockPriceSlice';
import StockHeader from '../../components/layout/StockDetails/Header/StockHeader';
import Profitability from '../../components/layout/StockDetails/Quantitative/Profitability/Profitability';
import EarningsStability from '../../components/layout/StockDetails/Quantitative/EarningsStability/EarningsStability';
import GrowthAndPe from '../../components/layout/StockDetails/Quantitative/GrowthAndPe/GrowthAndPe';
import FinancialPosition from '../../components/layout/StockDetails/Quantitative/FinancialPosition/FinancialPosition';
import styles from './StockDetail.module.css';


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
      dispatch(resetSOCF());
      dispatch(resetSOFP());
      dispatch(resetSOPL());
      dispatch(resetDetails());
      dispatch(resetStockPrice());

      dispatch(fetchSOCF(ticker));
      dispatch(fetchSOPL(ticker));
      dispatch(fetchSOFP(ticker));
      dispatch(fetchStockDetails(ticker));
      dispatch(fetchStockPrice(ticker));
    }
  }, [dispatch, ticker]);
  

  const mergedData = useMemo(() => {
    if(!socf?.length || !sofp?.length || !sopl?.length) return [];

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
      />
      <div className={styles.quantitative}>
        <Profitability
          mergedData={mergedData}
        />
        <EarningsStability
          mergedData={mergedData}
        />
        <GrowthAndPe 
          mergedData={mergedData}
          price={price.price}
        />
        <FinancialPosition
          mergedData={mergedData}
        />
      </div>
    </div>
  );
}

export default StockDetail
