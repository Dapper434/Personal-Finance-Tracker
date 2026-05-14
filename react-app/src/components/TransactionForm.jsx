import { useState } from 'react'

// Put these in a simple array at the top, human-style
const categories_expense = ['Food', 'Transport', 'Bills', 'Entertainment', 'Other']
const categories_income = ['Salary', 'Freelance', 'Side hustle', 'Other']

export default function TransactionForm({ onAdd }) {
  // Humans often use individual states or slightly less formal names
  const [txData, setTxData] = useState({
    mode: 'expense',
    amt: '',
    cat: 'Food',
    desc: ''
  })