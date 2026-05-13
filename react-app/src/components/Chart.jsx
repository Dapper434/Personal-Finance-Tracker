import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
} from "recharts"

const COLORS = ['#2563eb', '#7c3aed', '#db2777', '#ea580c', '#16a34a', '#0d9488']

export default function SpendingChart({ data }) {
  if (!data.length) {
    return (
      <section className="card chart-card">
        <h2>Spending by category</h2>
        <p className="muted">Add a few expenses to see the chart.</p>
      </section>
    )
  }

}
