import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';
import React from 'react'



ChartJS.register(
    Tooltip,
    Legend,
    ArcElement
)

const CurrentRatioChart = ({cacl}) => {
    const currentAssetProportion = (cacl/(1+cacl)) * 100;
    const currentLiabilityProportion = (1/(1+cacl)) * 100;

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
        labels: ['Current Liability', 'Current Assets'],
        datasets: [
            {
                data: [currentLiabilityProportion, currentAssetProportion],
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

export default CurrentRatioChart
