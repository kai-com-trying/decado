import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFinancialData, fetchStocksDetails } from '../../features/singleStocksSlice';
import StockHeader from '../../components/layout/StockDetails/Header/StockHeader';
import Profitability from '../../components/layout/StockDetails/Quantitative/Profitability/Profitability';
import EarningsStability from '../../components/layout/StockDetails/Quantitative/EarningsStability/EarningsStability';
import GrowthAndPe from '../../components/layout/StockDetails/Quantitative/GrowthAndPe/GrowthAndPe';
import FinancialPosition from '../../components/layout/StockDetails/Quantitative/FinancialPosition/FinancialPosition';
import styles from './StockDetail.module.css';

const StockDetail = () => {
    const { ticker } = useParams()
    const dispatch = useDispatch()
    const { detail, financialData, loading, error } = useSelector((state) => state.stocks)



    // useEffect(() => {
    //     if(ticker) {
    //         dispatch(fetchFinancialData(ticker));
    //         dispatch(fetchStocksDetails(ticker));
    //     }
    // }, [dispatch, ticker])

    if(loading) {
        return <p>Loading...</p>
    }

    if(error) {
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
