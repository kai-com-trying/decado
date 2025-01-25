export const frameworks = [
    {
        id: 1,
        name: 'Bargains Stocks',
        description: 'Find the best stocks to buy at a discount',
        criteria: {
            priceToNetTangibleAssets: "<= 1.2",
            peRatio: "<= 15",
            debtToNetCurrentAssets: "<= 1.1",
            earningsGrowth: "Last year's earnings must be higher than 1966",
            currentRatio: ">= 1.5",
            discountToIntrinsicValue: ">= 50%"
        },
    },
    {
        id: 2,
        name: 'Industry Leaders',
        description: 'Find the stocks of the leading companies in each industry',
        criteria: {
            stableEarnings: "No deficits in last 10 years",
            dividendPayments: "Uninterrupted for at least 20 years",
            peRatio: "<= 15",
            priceToBook: "<= 1.5 unless justified by low PE",
        },
    },
    {
        id: 3,
        name: 'Growth Stocks',
        description: 'Find the best growth stocks at a bargain',
        criteria: {
            earningsGrowthRate: ">= 7.1% annually",
            peRatio: "<= 25",
            marketOutperformance: "Must outperform market over a decade",
            caution: "Avoid overpaying"
        },
    },
    {
        id: 4,
        name: 'Unpopular Large Company Stocks',
        description: 'Find unpopular stocks of companies with a market cap over $10B',
        criteria: {
            marketCap: 'over $10B',
            lowPERatio: "Low compared to historical averages",
            stableEarnings: "Consistent earnings over long periods",
            priceToBook: "< Net Current Asset Value",
            strategy: '"Dogs of the Dow" - buy 10 lowest P/E stocks in DJIA'
        },
    },
    {
        id: 5,
        name: 'Net-Net Stocks',
        description: 'Deeply undervalued stocks trading below liquidation value',
        criteria: {
            priceToNetCurrentAssetValue: "< 1.0",
            currentRatio: ">= 2.0",
            debtToEquity: "< 50%",
            earningsStability: "No consistent losses in last 5 years"
        }
    },
    
    {
        id: 6,
        name: 'Margin of Safety Stocks',
        description: 'Stocks purchased at a significant discount to their intrinsic value',
        criteria: {
            intrinsicValueDiscount: "Market price at least 30% below intrinsic value",
            peRatio: "<= 15",
            earningsGrowth: "Stable earnings growth over past 5 years",
            financialHealth: "Strong balance sheet with low debt"
        }
    },
    
    {
        id: 7,
        name: 'Deep Value Stocks',
        description: 'Stocks trading significantly below their estimated intrinsic value',
        criteria: {
            priceToBook: "< 1.0",
            peRatio: "< 10",
            dividendYield: ">= 2%",
            financialStrength: "Debt-to-equity ratio < 50%"
        }
    },
    
    {
        id: 8,
        name: 'Cigar Butt Stocks',
        description: 'Companies that are struggling but still have value left',
        criteria: {
            priceToNetCurrentAssetValue: "< 0.75",
            earningsStability: "Recent profitability or turnaround potential",
            debtToEquity: "< 50%",
            assetLiquidationValue: "Greater than market price"
        }
    },
    
    {
        id: 9,
        name: 'Turnaround Stocks',
        description: 'Companies recovering from financial distress or temporary setbacks',
        criteria: {
            improvingFinancials: "Revenue and earnings trending up",
            debtReduction: "Decreasing debt levels over time",
            peRatio: "Low compared to historical levels",
            marketSentiment: "Negative sentiment but improving fundamentals"
        }
    },
    
    {
        id: 10,
        name: 'Dividend Value Stocks',
        description: 'Companies offering consistent dividends with stable financials',
        criteria: {
            dividendYield: ">= 3%",
            payoutRatio: "<= 60%",
            dividendGrowth: "Positive growth over the past 5 years",
            earningsStability: "No earnings decline in past 5 years"
        }
    }
    
];