import { useEffect, useState } from 'react';
import Transaction from './components/TransactionForm.jsx';
import TransactionList from './components/TransactionList.jsx';
import SpendingChart from './components/SpendingChart.jsx';
import './App.css';

import { applyTax, calculateTotals, categorizeData, format_kenya_shillings,} from './utils/transactionUtils.js';



// Storage key for saving finance data in local machine

const savedFinanceDataKey = 'saved-finanace-data';


 

