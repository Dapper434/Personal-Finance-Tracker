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