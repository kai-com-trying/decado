import { Bar } from 'react-chartjs-2';
import { 
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
 } from 'chart.js';
 import React from 'react'

 ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
 
 const GrowthChart = ({netIncomeGrowth}) => {
    const ascNetIncomeGrowth = netIncomeGrowth.slice(0, 10).reverse();
    const options = {};
    const data = {
        labels: ascNetIncomeGrowth.map(item => new Date(item.year).getFullYear()),
        datasets: [
          {
            label: 'Net Income Growth (%)',
            data: ascNetIncomeGrowth.map(item => item.growthNumber),
            backgroundColor: 'rgb(75, 192, 192)',
          },
        ],
    };

   return (
     <div>
       <Bar options={options} data={data} />
     </div>
   )
 }
 
 export default GrowthChart
 