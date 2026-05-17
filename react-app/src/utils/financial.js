export function calculateTotals(data) {
    // strictly working with arrays.
    const transactions = Array.isArray(data) ? data : []

    return transactions.reduce(
        (totals, transaction) => {
            const amount = Number(transaction.amount);
// also work strictly with values(numbers)
            if (Number.isNaN(amount)) {
                return totals;
            }
// Categorize amount into balance, income or expense
            if (transaction.type === 'income') {
                totals.income += amount;
                totals.balance += amount;
            } else if (transaction.type === 'expense') {
                totals.expenses += amount;
                totals.balance -= amount;
            }
            return totals;
        },

        { balance: 0, expenses: 0, income: 0 }
    );

}

export function categorizeData(data) {
  const transactions = Array.isArray(data) ? data : [];
  const categoryTotals = {};

  for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];
    
// Process expense type
    if (transaction.type !== 'expense') continue;

    const amount = Number(transaction.amount);
    if (Number.isNaN(amount)) continue;

//  Normalize category name, else assign 'Other'
    const categoryName = transaction.category && transaction.category.trim() 
      ? transaction.category.trim() 
      : 'Other';
    
    categoryTotals[categoryName] = (categoryTotals[categoryName] || 0) + amount;
  }

  return Object.keys(categoryTotals).map((name) => ({
    name,
    value: categoryTotals[name],
  }));
}

 
// Tax calc based on gross amount and percentage.
export function applyTax(amount, taxRate) {
    const grossAmount = Number(amount);
    const taxRateNum = Number(taxRate);

    if (Number.isNaN(grossAmount) || grossAmount < 0 || Number.isNaN(taxRateNum) || taxRateNum < 0) {
        return 0;
    }

    return (grossAmount * taxRateNum) / 100;
}

// Format numeric val to ksh
export function format_kenya_shillings(amount) {
    const numericValue = Number(amount);

    if (Number.isNaN(numericValue)) {
        return 'Ksh 0.00';
    }
    return new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: 'KES',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(numericValue);
}

