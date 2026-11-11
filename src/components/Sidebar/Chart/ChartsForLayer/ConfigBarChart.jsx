import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer, CartesianGrid,
} from "recharts";

const num = (v) => Number(v).toLocaleString("ka-GE");

// compact: ბეჭდვის რეჟიმი — ლეგენდის გარეშე (ფერები ისედაც ლეგენდაშია),
// სიმაღლე სტრიქონების რაოდენობით
const ConfigBarChart = ({ data, chart, compact = false }) => {
  const sorted = [...data].sort(
    (a, b) => b[chart.bars[0].field] - a[chart.bars[0].field],
  );
  const fmt = chart.format ?? ((v) => v);
  const height = compact ? sorted.length * 30 + 40 : 320;
  const fontSize = compact ? 11 : 13;

  return (
    <div className="config-bar-chart" style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <BarChart
          data={sorted}
          layout="vertical"
          margin={{ top: 4, right: 16, left: 0, bottom: 4 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} strokeOpacity={0.3} />
          <XAxis type="number" tickFormatter={fmt} tick={{ fontSize }} />
          <YAxis type="category" dataKey="name_ge" width={compact ? 90 : 105} tick={{ fontSize }} />
          <Tooltip formatter={(v) => num(v)} />
          {!compact && chart.bars.length > 1 && <Legend />}
          {chart.bars.map((b) => (
            <Bar key={b.field} dataKey={b.field} name={b.label} fill={b.color} radius={[0, 3, 3, 0]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ConfigBarChart;