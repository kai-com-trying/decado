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
    },
    
    {
        id: 11,
        name: 'Special Situation Stocks',
        description: 'Stocks with unique catalysts or events that could unlock value',
        criteria: {
            eventDriven: "Mergers, acquisitions, spin-offs, or other special events",
            undervaluation: "Market price does not reflect true value",
            catalyst: "Clear path to value realization within a specific timeframe",
            risk: "Understand the risks and potential outcomes"
        }
    },
    
    {
        id: 12,
        name: 'Contrarian Stocks',
        description: 'Stocks that are out of favor with the market but have long-term potential',
        criteria: {
            negativeSentiment: "Market pessimism or negative news",
            valuation: "Trading below intrinsic value or historical averages",
            contrarianInvesting: "Buy when others are fearful",
            longTermView: "Focus on long-term value creation"
        }
    },
    
    {
        id: 13,
        name: 'Quality Growth Stocks',
        description: 'Companies with strong growth potential and solid fundamentals',
        criteria: {
            revenueGrowth: "Consistent revenue growth over the past 5 years",
            earningsGrowth: "Positive earnings growth over the past 5 years",
            returnOnEquity: "ROE > 15%",
            competitiveAdvantage: "Sustainable competitive advantage"
        }
    },
    
    {
        id: 14,
        name: 'Blue Chip Stocks',
        description: 'Stocks of well-established, financially stable companies',
        criteria: {
            marketCapitalization: "Large-cap companies with market cap > $10B",
            dividendPayments: "Consistent dividend payments over time",
            earningsStability: "Stable earnings growth and financial health",
            industryLeaders: "Leading companies in their respective industries"
        }
    },
    
    {
        id: 15,
        name: 'Value Stocks',
        description: 'Stocks trading below their intrinsic value with solid fundamentals',
        criteria: {
            priceToEarnings: "P/E ratio < 15",
            priceToBook: "P/B ratio < 1.5",
            dividendYield: "Dividend yield > 3%",
            financialHealth: "Strong balance sheet and low debt levels"
        }
    },
    
    {
        id: 16,
        name: 'GARP Stocks',
        description: 'Growth at a reasonable price - stocks with growth potential at a fair price',
        criteria: {
            earningsGrowth: "Positive earnings growth over the past 5 years",
            priceToEarnings: "P/E ratio < 20",
            priceToEarningsGrowth: "PEG ratio < 1",
            undervalued: "Trading below intrinsic value"
        }
    },
];