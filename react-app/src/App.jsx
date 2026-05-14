import { useEffect, useState } from 'react';
import Transaction from './components/TransactionForm.jsx';
import TransactionList from './components/TransactionList.jsx';
import SpendingChart from './components/SpendingChart.jsx';
import './App.css';

import { applyTax, calculateTotals, categorizeData,} from './utils/transactionUtils.js';


// Storage key for saving finance data in your local

const app_data_storage_key = 'saved-finance-data'


function loadSavedAppState() {
  try {
    const savedJsonString = localStorage.getItem(app_data_storage_key)
    if (!savedJsonString) return null
    return JSON.parse(savedJsonString)
  } catch {
    return null
  }
}

// Initialize state with saved local storage data, hence providing safe defaults if nothing is found, preventing also app crash.

export default function App() {

  // extract the  transactions safely (stays normal if data is missing)
  const savedAppState = loadSavedAppState()
  const initialTransactions = savedAppState && Array.isArray(savedAppState.transactions) ? savedAppState.transactions : []

  // extract tax rate safely, default to 20% if invalid
  const initialTaxRate = savedAppState && typeof savedAppState.taxRate === 'number' ? savedAppState.taxRate : 20

// Bind together the components state , if storage was empty the two are gonna use the defaults [] and 20
const [transactions, setTransactions] = useState(initialTransactions)
const [taxRate, setTaxRate] = useState(initialTaxRate)




//  Persist the app state to the local storage when the tax rates and transactions are updated


  useEffect(() => {
    const appStateSnapshot = { transactions, taxRate }
    localStorage.setItem(
      app_data_storage_key,
      JSON.stringify(appStateSnapshot),
    )
  }, [transactions, taxRate])


  // Calc the derived values from raw state for rendering of UI(thus avoid data duplication)
const totals = calculateTotals(transactions)
const spendingTotalsByCategory = categorizeData(transactions)
const estimatedTaxOnIncome = applyTax(totals.income, taxRate)


// Handling of Events

function handleAdd(newTransaction) {
  const updatedTransactionList = [newTransaction, ...transactions]
  setTransactions(updatedTransactionList)
}

// Filter transaction by id and update state
function handleDelete(transactionId) {
  const transactionsWithoutDeleted = transactions.filter((item) => {
    return item.id !== transactionId
  })
  setTransactions(transactionsWithoutDeleted)
}

// Tax rate input is updated, and only works for a valid number.
function handleTaxRateChange(event) {
  const taxRateFromInput = parseFloat(event.target.value)
  if (!Number.isNaN(taxRateFromInput)) {
    setTaxRate(taxRateFromInput)
  }
}

// Render of Ui

return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Personal Finance Tracker</p>
          <h1>Your money at a glance</h1>
          <p className="lede">
            Amounts(KSH). Totals update in real-time.
            Data lives on your local
          </p>
        </div>
      </header>

      <section className="summary-grid">
        <article className="summary-card">
          <h3>Balance</h3>
          <p
            className={
              totals.balance >= 0 ? 'big-number positive' : 'big-number negative'
            }
          >
            {format_kenya_shillings(totals.balance)}
          </p>
        </article>
        <article className="summary-card">
          <h3>Income</h3>
          <p className="big-number positive">
            {format_kenya_shillings(totals.income)}
          </p>
        </article>
        <article className="summary-card">
          <h3>Expenses</h3>
          <p className="big-number">
            {format_kenya_shillings(totals.expenses)}
          </p>
        </article>
      </section>

      <section className="tax-card card">
        <h2>Tax estimate </h2>
        <p className="tax description">
          A simple tax estimate on your income. NB: This is not tax advice.
        </p>
        <label className="inline-tax">
          Tax rate %
          <input
            type="number"
            min="0"
            max="100"
            step="0.5"
            value={taxRate}
            onChange={handleTaxRateChange}
          />
        </label>
        <p className="tax-result">
          Estimated tax on income:{' '}
          <strong>{format_kenya_shillings(estimatedTaxOnIncome)}</strong>
        </p>
      </section>

      <div className="layout-two">
        <TransactionForm onAdd={handleAdd} />
        <SpendingChart data={spendingTotalsByCategory} />
      </div>

      <TransactionList items={transactions} onDelete={handleDelete} />
    </div>
  )
}

























