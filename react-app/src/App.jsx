import { useEffect, useState } from 'react';
import Transaction from './components/TransactionForm.jsx';
import TransactionList from './components/TransactionList.jsx';
import SpendingChart from './components/SpendingChart.jsx';
import './App.css';

import { applyTax, calculateTotals, categorizeData,} from './utils/transactionUtils.js';


// Storage key for saving finance data in your local

const app_data_storage_key = 'saved-finanace-data'

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


