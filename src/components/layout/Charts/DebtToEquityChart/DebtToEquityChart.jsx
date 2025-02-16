import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';
import React from 'react'



ChartJS.register(
    Tooltip,
    Legend,
    ArcElement
)

const DebtToEquityChart = ({avgDebtToEquity}) => {
    const debtProportion = (avgDebtToEquity/(1+avgDebtToEquity)) * 100;
    const equityProportion = (1/(1+avgDebtToEquity)) * 100;

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    usePointStyle: true,
                    font: {
                        size: 12
                    }
                }
            },
        },
    };
    const data = {
        labels: [ 'Shareholder\'s Equity', 'Total Debt'],
        datasets: [
            {
                data: [equityProportion, debtProportion],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
    <div>
        <Pie options={options} data={data} />
    </div>
    )
}

export default DebtToEquityChart
