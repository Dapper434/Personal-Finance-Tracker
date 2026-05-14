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
  }
catch{
  return null
}


}

// Initialize state with saved local storage data, hence providing safe defaults if nothing is found, preventing also app crash.

export default function App() {

  // extract transactions safely, stays normal(empty array) if invalid
  const savedAppState = loadSavedAppState()
  const initialTransactions = savedAppState && Array.isArray(savedAppState.transactions) ? savedAppState.transactions : []

  // extract tax rate safely, default to 20% if invalid
  const initialTaxRate = savedAppState && typeof savedAppState.taxRate === 'number' ? savedAppState.taxRate : 20

// Bind together the components state , if storage was empty the two are gonna use the defaults [] and 20
const [transactions, setTransactions] = useState(initialTransactions)
const [taxRate, setTaxRate] = useState(initialTaxRate)











}