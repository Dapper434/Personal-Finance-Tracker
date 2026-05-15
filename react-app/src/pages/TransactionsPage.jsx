import TransactionList from '../components/TransactionList.jsx'

export default function TransactionsPage({ transactions, onDelete }) {
  return (
    <>
      <p className="page-intro">
        All your saved income and expense rows. Remove any you no longer need.
      </p>
      <TransactionList items={transactions} onDelete={onDelete} />
      <p className="page-actions">
        <a href="#/" className="text-link">
          ← Back to dashboard
        </a>
      </p>
    </>
  )
}
