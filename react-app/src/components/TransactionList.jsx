import { format_kenya_shillings } from '../utils/financeUtils.js'

// Layout and colors for .tx-list, .tx-row, .money-in / .money-out live in App.css.

export default function TransactionList({ items, onDelete }) {
  if (items.length === 0) {
    return (
      <section className="card list-card">
        <h2>Recent activity</h2>
        <p className="muted">
          No rows yet — add your first transaction above.
        </p>
      </section>
    )
  }

  // Copy the array so we never change React state in place; then sort by date.
  const rows_newest_first = [...items].sort((left, right) => {
    // localeCompare on ISO strings keeps newest transactions at the top.
    return String(right.createdAt).localeCompare(String(left.createdAt))
  })

  return (
    <section className="card list-card">
      <h2>Recent activity</h2>
      <ul className="tx-list">
        {rows_newest_first.map((row) => {
          const is_income = row.type === 'income'

          return (
            <li key={row.id} className="tx-row">
              <div>
                <div className="tx-title">{row.description}</div>
                <div className="tx-meta">
                  {is_income ? 'Income' : 'Expense'} · {row.category}
                </div>
              </div>
              <div className="tx-right">
                <span
                  className={is_income ? 'money-in' : 'money-out'}
                >
                  {(is_income ? '+' : '-') +
                    format_kenya_shillings(row.amount)}
                </span>
                <button
                  type="button"
                  className="ghost-btn"
                  onClick={() => onDelete(row.id)}
                  aria-label={`Delete ${row.description}`}
                >
                  Remove
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}