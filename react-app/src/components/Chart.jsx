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
  return (
    <section className="card chart-card">
      <h2>Spending by category</h2>
      <p className="muted">Uses your expense rows grouped in vanilla JS.</p>
 <div className="chart-wrap">
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(v) => `$${Number(v).toFixed(2)}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  ) 

}
