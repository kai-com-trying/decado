import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSOCF } from '../../features/stockSOCFSlice';
import { fetchSOFP } from '../../features/stockSOFPSlice';
import { fetchSOPL } from '../../features/stockSOPLSlice';
import { fetchStockDetails } from '../../features/stockDetailSlice';
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
  const { stockDetail, loading: stockDetailLoading, error: stockDetailError } = useSelector((state) => state.stockDetail);

  const isLoading = socfLoading || soplLoading || sofpLoading || stockDetailLoading;
  const hasError = socfError || soplError || sofpError || stockDetailError;


  // useEffect(() => {
  //   if (ticker) {
  //       dispatch(fetchSOCF(ticker));
  //       dispatch(fetchSOPL(ticker));
  //       dispatch(fetchSOFP(ticker));
  //       dispatch(fetchStockDetails(ticker));
  //   }
  // }, [dispatch, ticker]);
  
  if(isLoading) {
      return <p>Loading...</p>
  }

  if(hasError) {
      return <p>Error: {error.message || error}</p>
  }

  return (
    <div>
      <StockHeader />
      <div className={styles.quantitative}>
        <Profitability />
        <EarningsStability />
        <GrowthAndPe />
        <FinancialPosition />
      </div>
    </div>
  );
}

export default StockDetail
