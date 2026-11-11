import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer, CartesianGrid, Cell, LabelList,
} from "recharts";

const num = (v) => Number(v).toLocaleString("ka-GE");

// compact: ბეჭდვის რეჟიმი — ლეგენდის გარეშე (ფერები ისედაც ლეგენდაშია),
// სიმაღლე სტრიქონების რაოდენობით
// chart.colorField — თითო სვეტს საკუთარი ფერი (მაგ. კლასის ფერი)
// chart.valueLabels — მნიშვნელობა სვეტის ბოლოს
const ConfigBarChart = ({ data, chart, compact = false }) => {
  const sorted = [...data].sort(
    (a, b) => b[chart.bars[0].field] - a[chart.bars[0].field],
  );
  const fmt = chart.format ?? ((v) => v);
  const rowH = chart.bars.length > 1 ? 34 : 28;
  const height = compact ? sorted.length * rowH + 40 : Math.max(320, sorted.length * rowH + 60);
  const fontSize = compact ? 11 : 13;

  return (
    <div className="config-bar-chart" style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <BarChart
          data={sorted}
          layout="vertical"
          margin={{ top: 4, right: chart.valueLabels ? 44 : 16, left: 0, bottom: 4 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} strokeOpacity={0.3} />
          <XAxis type="number" tickFormatter={fmt} tick={{ fontSize }} />
          <YAxis type="category" dataKey="name_ge" width={compact ? 90 : 105} tick={{ fontSize }} />
          <Tooltip formatter={(v) => num(v)} />
          {!compact && chart.bars.length > 1 && <Legend />}
          {chart.bars.map((b) => (
            <Bar key={b.field} dataKey={b.field} name={b.label} fill={b.color} radius={[0, 3, 3, 0]}>
              {chart.colorField &&
                sorted.map((d) => <Cell key={d.name_ge} fill={d.color} stroke="rgba(0,0,0,.25)" />)}
              {chart.valueLabels && (
                <LabelList
                  dataKey={b.field}
                  position="right"
                  formatter={fmt}
                  style={{ fill: "var(--light-text)", fontSize: fontSize - 1, fontWeight: 700 }}
                />
              )}
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ConfigBarChart;