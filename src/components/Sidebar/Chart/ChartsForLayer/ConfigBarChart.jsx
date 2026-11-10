import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer, CartesianGrid,
} from "recharts";

const num = (v) => Number(v).toLocaleString("ka-GE");

const ConfigBarChart = ({ data, chart }) => {
  const sorted = [...data].sort(
    (a, b) => b[chart.bars[0].field] - a[chart.bars[0].field],
  );

  return (
    <div className="config-bar-chart" style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <BarChart data={sorted} layout="vertical" margin={{ top: 8, right: 24, left: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} strokeOpacity={0.3} />
          <XAxis type="number" tickFormatter={(v) => v / 1000} />
          <YAxis type="category" dataKey="name_ge" width={105} />
          <Tooltip formatter={(v) => num(v)} />
          {chart.bars.length > 1 && <Legend />}
          {chart.bars.map((b) => (
            <Bar key={b.field} dataKey={b.field} name={b.label} fill={b.color} radius={[0, 3, 3, 0]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ConfigBarChart;