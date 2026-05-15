import { useEffect, useState } from 'react'
import AppNav from './components/AppNav.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import TransactionsPage from './pages/TransactionsPage.jsx'
import './App.css'

import {
  applyTax,
  calculateTotals,
  categorizeData,
} from './utils/financial.js'

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

function getPageFromHash() {
  return window.location.hash === '#/transactions'
    ? 'transactions'
    : 'dashboard'
}

export default function App() {
  const savedAppState = loadSavedAppState()
  const initialTransactions =
    savedAppState && Array.isArray(savedAppState.transactions)
      ? savedAppState.transactions
      : []
  const initialTaxRate =
    savedAppState && typeof savedAppState.taxRate === 'number'
      ? savedAppState.taxRate
      : 20

  const [transactions, setTransactions] = useState(initialTransactions)
  const [taxRate, setTaxRate] = useState(initialTaxRate)
  const [page, setPage] = useState(getPageFromHash)

  useEffect(() => {
    const appStateSnapshot = { transactions, taxRate }
    localStorage.setItem(
      app_data_storage_key,
      JSON.stringify(appStateSnapshot),
    )
  }, [transactions, taxRate])

  useEffect(() => {
    const onHashChange = () => setPage(getPageFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const totals = calculateTotals(transactions)
  const spendingTotalsByCategory = categorizeData(transactions)
  const estimatedTaxOnIncome = applyTax(totals.income, taxRate)

  function handleAdd(newTransaction) {
    setTransactions([newTransaction, ...transactions])
  }

  function handleDelete(transactionId) {
    setTransactions(transactions.filter((item) => item.id !== transactionId))
  }

  function handleTaxRateChange(event) {
    const taxRateFromInput = parseFloat(event.target.value)
    if (!Number.isNaN(taxRateFromInput)) {
      setTaxRate(taxRateFromInput)
    }
  }

  const isTransactionsPage = page === 'transactions'

  return (
    <div className="app-page">
      <div className="app-shell">
        <header className="app-header">
          <div>
            <p className="eyebrow">Personal Finance Tracker</p>
            <h1>
              {isTransactionsPage
                ? 'Recent activity'
                : 'Your money at a glance'}
            </h1>
            <p className="lede">
              {isTransactionsPage
                ? 'Browse and manage every transaction you have saved.'
                : 'Amounts(KSH). Totals update in real-time. Data lives on your local'}
            </p>
          </div>
        </header>

        <AppNav currentPage={page} />

        {isTransactionsPage ? (
          <TransactionsPage
            transactions={transactions}
            onDelete={handleDelete}
          />
        ) : (
          <DashboardPage
            totals={totals}
            taxRate={taxRate}
            estimatedTaxOnIncome={estimatedTaxOnIncome}
            spendingTotalsByCategory={spendingTotalsByCategory}
            onAdd={handleAdd}
            onTaxRateChange={handleTaxRateChange}
          />
        )}
      </div>

      <footer className="app-footer">
        <p>Personal Finance Tracker @2026</p>
      </footer>
    </div>
  )
}
