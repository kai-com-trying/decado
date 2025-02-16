import { Line } from 'react-chartjs-2';
import { 
    Chart as ChartJS,
    defaults,
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


 const ProfitabilityChart = ({profitChartData}) => {
    console.log(profitChartData)
    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                enabled: true
            }
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'ROE',
                },
                grid: {
                    drawOnChartArea: true
                },
                position: 'left'
            },
            y2: {
                title: {
                    display: true,
                    text: 'ROIC',
                },
                grid: {
                    drawOnChartArea: false
                },
                position: 'right'
            }
        }
    };
    const data = {
        labels: profitChartData.map(item => item.year),
        datasets: [
          {
            label: 'ROIC (%)',
            data: profitChartData.map(item => item.roic),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            yAxisID: 'y2',
            tension: 0.4
          },
          {
            label: 'ROE (%)',
            data: profitChartData.map(item => item.roe),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            tension: 0.4
          },
        ],
    };

   return (
     <div>
       <Line options={options} data={data} />
     </div>
   )
 }
 
 export default ProfitabilityChart
 