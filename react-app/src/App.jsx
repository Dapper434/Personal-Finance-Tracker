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


