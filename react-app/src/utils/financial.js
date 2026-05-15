export function calculateTotals(data) {
    // strictly working with arrays.
    const transaction = Array.isArray(data) ? data : []

    return transaction.reduce(
        (totals, transactions) => {
            const amount = Number(transaction.amount);
// also work strictly with values(nummbers)
            if (Number.isNaN(amount)) {
                return totals;
            }
// Categorize amount into balance, income or expence 
            if (transaction.type === 'income') {
                totals.income += amount;
                totals.balance += amount;
            } else if (transaction.type === 'expense') {
                totals.expense += amount;
                totals.balance -= amount;
            }
            return totals;
        },

        { balance: 0, expense: 0, expense: 0 }
    );

}

export function categorizeData(data) {
  const transactions = Array.isArray(data) ? data : [];
  const categoryTotals = {};

  for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];
    
// Proceess expense type
    if (transaction.type !== 'expense') continue;

    const amount = Number(transaction.amount);
    if (Number.isNaN(amount)) continue;

//  Normalize categoty name,else, assign 'other' 
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

 
// Tax calc based on grooss amount and percentage.
export function applyTax(amount, taxRate) {
    const grossAmount = Number(amount);
    const taxRate = Number(taxRate);

    if (Number.isNaN(grossAmount) || grossAmount < 0 || Number.isNaN(taxRate) || taxRate < 0) {
        return 0;
    }

    return (grossAmount * taxRate) / 100;
}

// Format numeriv val to ksh
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

