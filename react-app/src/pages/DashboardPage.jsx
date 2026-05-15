import TransactionForm from '../components/TransactionForm.jsx'
import SpendingChart from '../components/Chart.jsx'
import { format_kenya_shillings } from '../utils/financial.js'

export default function DashboardPage({
  totals,
  taxRate,
  estimatedTaxOnIncome,
  spendingTotalsByCategory,
  onAdd,
  onTaxRateChange,
}) {
  return (
    <>
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
          <p className="big-number negative">
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
            onChange={onTaxRateChange}
          />
        </label>
        <p className="tax-result">
          Estimated tax on income:{' '}
          <strong>{format_kenya_shillings(estimatedTaxOnIncome)}</strong>
        </p>
      </section>

      <div className="layout-two">
        <TransactionForm onAdd={onAdd} />
        <SpendingChart data={spendingTotalsByCategory} />
      </div>
    </>
  )
}
