import { useEffect, useState } from 'react'
import AppNav from './components/AppNav.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import TransactionsPage from './pages/TransactionsPage.jsx'
import './App.css'
import { supabase } from './supabaseClient.js'

import {
  applyTax,
  calculateTotals,
  categorizeData,
} from './utils/financial.js'

function getPageFromHash() {
  return window.location.hash === '#/transactions'
    ? 'transactions'
    : 'dashboard'
}

export default function App() {
  const [transactions, setTransactions] = useState([])
  const [taxRate, setTaxRate] = useState(20)
  const [page, setPage] = useState(getPageFromHash)
  const [loading, setLoading] = useState(true)

  // Fetch all transactions from Supabase on app load
  useEffect(() => {
    async function fetchTransactions() {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching transactions:', error)
      } else {
        setTransactions(data)
      }
      setLoading(false)
    }
    fetchTransactions()
  }, [])

  // Hash-based routing
  useEffect(() => {
    const onHashChange = () => setPage(getPageFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const totals = calculateTotals(transactions)
  const spendingTotalsByCategory = categorizeData(transactions)
  const estimatedTaxOnIncome = applyTax(totals.income, taxRate)

  // POST new transaction to Supabase
  async function handleAdd(newTransaction) {
    const { data, error } = await supabase
      .from('transactions')
      .insert([newTransaction])
      .select()

    if (error) {
      console.error('Error saving transaction:', error)
      return
    }
    setTransactions([data[0], ...transactions])
  }

  // DELETE transaction from Supabase
  async function handleDelete(transactionId) {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', transactionId)

    if (error) {
      console.error('Error deleting transaction:', error)
      return
    }
    setTransactions(transactions.filter((item) => item.id !== transactionId))
  }

  function handleTaxRateChange(event) {
    const taxRateFromInput = parseFloat(event.target.value)
    if (!Number.isNaN(taxRateFromInput)) {
      setTaxRate(taxRateFromInput)
    }
  }

  const isTransactionsPage = page === 'transactions'

  // Loading state while Supabase fetches data
  if (loading) {
    return (
      <div className="app-page">
        <p style={{ padding: '2rem' }}>Loading your transactions...</p>
      </div>
    )
  }

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
                : 'Amounts (KSH). Totals update in real-time.'}
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