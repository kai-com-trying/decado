export const calculateEPS = (netIncome, sharesOutstanding) => {
    if (!sharesOutstanding || sharesOutstanding <= 0) return 0;
    return netIncome / sharesOutstanding; // Can be negative if netIncome is negative (loss)
  };
  
  export const calculateBVPS = (totalEquity, sharesOutstanding) => {
    if (!sharesOutstanding || sharesOutstanding <= 0) return 0;
    return totalEquity / sharesOutstanding;
  };
  
  export const calculateROE = (netIncome, totalEquity) => {
    if (!totalEquity || totalEquity <= 0) return 0;
    return netIncome / totalEquity; // Returns negative value if net income is negative
  };
  
  export const calculateROIC = (netIncome, totalDebt, totalEquity) => {
    const capital = totalDebt + totalEquity;
    if (!capital || capital <= 0) return 0;
    return netIncome / capital; // Returns negative value if net income is negative
  };

export const calculate5YearAverage = (annualReports, key) => {
    if (!annualReports || annualReports.length < 5) return 0;
  
    // Get the last 5 years of data
    const last5Years = annualReports.slice(0, 5); // Assuming data is sorted in descending order
  
    // Extract the values for the given key and convert to numbers
    const values = last5Years.map(report => Number(report[key]) || 0);
  
    // Calculate the average
    const sum = values.reduce((acc, val) => acc + val, 0);
    return sum / values.length;
  };

export const calculate3YearAverage = (annualReports, key) => {
    if (!annualReports || annualReports.length < 3) return 0;
  
    // Get the last 3 years of data
    const last3Years = annualReports.slice(0, 3); // Assuming data is sorted in descending order
  
    // Extract the values for the given key and convert to numbers
    const values = last3Years.map(report => Number(report[key]) || 0);
  
    // Calculate the average
    const sum = values.reduce((acc, val) => acc + val, 0);
    return sum / values.length;
  }