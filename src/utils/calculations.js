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


export const calculateNYearAverage = (annualReports, key, n) => {
  if (!annualReports || annualReports.length < n) return 0;

  // Get the last 3 years of data
  const lastNYears = annualReports.slice(0, n); // Assuming data is sorted in descending order

  // Extract the values for the given key and convert to numbers
  const values = lastNYears.map(report => Number(report[key]) || 0);

  // Calculate the average
  const sum = values.reduce((acc, val) => acc + val, 0);
  return sum / values.length;
}

export const formatLargeNumber = (value) => {
  // Ensure value is a number (convert if string)
  const num = typeof value === "number" ? value : parseFloat(value);

  if (isNaN(num)) return "N/A"; // Handle invalid numbers

  if (num >= 1_000_000_000) {
    return `$${(num / 1_000_000).toLocaleString()} mil.`; // Convert billion to million
  }

  return num.toLocaleString(); // Default formatting
};