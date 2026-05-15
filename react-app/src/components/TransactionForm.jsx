import { useState } from 'react'


const categories_expense = ['Food', 'Transport', 'Bills', 'Entertainment', 'Other']
const categories_income = ['Salary', 'Freelance', 'Side hustle', 'Other']

export default function TransactionForm({ onAdd }) {
  // Local form state
  const [txData, setTxData] = useState({
    mode: 'expense',
    amt: '',
    cat: 'Food',
    desc: ''
  })
 // Derived state 
  const currentOptions = txData.mode === 'income' ? categories_income : categories_expense

  const handleFieldChange = (e) => {
    const { name, value } = e.target
    
    setTxData(prev => {
      let updated = { ...prev, [name]: value }
      
      // Category reset logic moved here to keep it all together
      if (name === 'mode') {
        updated.cat = value === 'income' ? categories_income[0] : categories_expense[0]
      }
      return updated
    })
  }

  const doSubmit = (event) => {
    event.preventDefault()

    //  validation steps
    const cleanDesc = txData.desc.trim()
    const numericAmt = parseFloat(txData.amt)

    if (cleanDesc.length === 0) {
      alert('Description is missing!')
      return
    }

    if (isNaN(numericAmt) || numericAmt <= 0) {
      alert('Please enter a valid amount over 0')
      return
    }

    // Mapping to the expected parent object format
    onAdd({
      id: Math.random().toString(36).substring(2, 9), // Human "quick fix" for IDs
      type: txData.mode,
      amount: numericAmt,
      category: txData.cat,
      description: cleanDesc,
      createdAt: new Date().toISOString()
    }) 
    
    setTxData({
      mode: 'expense',
      amt: '',
      cat: 'Food',
      desc: ''
    })
  }
  return (
    <form className="card form-card" onSubmit={doSubmit}>
      <h2 style={{ marginBottom: '10px' }}>Add a transaction</h2>
      <p className="muted">Pick income or expense, then fill the fields.</p>

      <div className="field-row">
        <label>
          Type
          <select name="mode" value={txData.mode} onChange={handleFieldChange}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </label>
        
        <label>
          Category
          <select name="cat" value={txData.cat} onChange={handleFieldChange}>
            {currentOptions.map(item => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="block-label">
        Amount
        <input
          name="amt"
          type="number"
          step="0.01"
          placeholder="0.00"
          value={txData.amt}
          onChange={handleFieldChange}
        />
      </label>

      <label className="block-label">
        Description
        <input
          name="desc"
          type="text"
          placeholder="Coffee, rent, paycheck..."
          value={txData.desc}
          onChange={handleFieldChange}
        />
      </label>

      <button type="submit" className="primary-btn">
        Save transaction
      </button>
    </form>
  )
}

export default TransactionForm