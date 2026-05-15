import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts"
import {format_kenya_shillings} from '../utils/financeUtils.js'


// One color per pie slice; if there are more slices than names, we wrap around.
const slice_colors = [
  'royalblue', 
  'blueviolet', 
  'deeppink', 
  'darkorange', 
  'limegreen', 
  'lightseagreen']


// `data` comes from App as { name: category label, value: ksh }[] (see financial.js).
export default function SpendingChart({ data }) {
  if (data.length===0) {
    return (
      <section className="card chart-card">
        <h2>Spending by category</h2>
        <p className="muted">Add a few expenses to see the chart.</p>
      </section>
    )
  }

 // Hover a slice, recharts shows value as ksh.
  function kes_for_tooltip(raw_value) {
    return format_kenya_shillings(raw_value)
  }

  return (
    <section className="card chart-card">
      <h2>Spending by category</h2>
      <p className="muted">Uses your expense rows grouped.</p>
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
              {data.map((slice, slice_index) => (
                <Cell
                  key={slice.name}
                  fill={
                    slice_colors[slice_index % slice_colors.length]
                  }
                />
              ))}
            </Pie>
            <Tooltip formatter={kes_for_tooltip} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  ) 

}






