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

