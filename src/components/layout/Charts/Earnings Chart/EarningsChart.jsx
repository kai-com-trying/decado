import { Line } from 'react-chartjs-2';
import { 
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
 } from 'chart.js';
 import React from 'react'

 ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
 
 const EarningsChart = ({earningsHistory}) => {
    const ascEarningsHistory = earningsHistory.slice().reverse();
    const options = {
        responsive: true,
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Revenue',
                },
                position: 'left',
            },
            y2: {
                title: {
                    display: true,
                    text: 'Net Income',
                },
                position: 'left',
                grid: {
                    drawOnChartArea: false,
                }
            },
            y3: {
                title: {
                    display: true,
                    text: 'EPS',
                },
                position: 'right',
                grid: {
                    drawOnChartArea: false,
                }
            }
        },
    };
    const data = {
        labels: ascEarningsHistory.map(item => item.year),
        datasets: [
          {
            label: 'Revenue',
            data: ascEarningsHistory.map(item => item.revenue),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 3,
            yAxisID: 'y',
            tension: 0.4
          },
          {
            label: 'Net Income',
            data: ascEarningsHistory.map(item => item.netIncome),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 3,
            yAxisID: 'y2',
            tension: 0.4
          },
          {
            label: 'EPS',
            data: ascEarningsHistory.map(item => item.eps),
            backgroundColor: 'rgba(54, 163, 235, 0)',
            borderColor: 'rgba(77, 77, 77, 0.39)',
            borderWidth: 1,
            yAxisID: 'y3',
            tension: 0,
          },
        ],
    };

   return (
     <div>
       <Line options={options} data={data} />
     </div>
   )
 }
 
 export default EarningsChart;
 