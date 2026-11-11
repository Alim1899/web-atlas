import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const num = (v) => Number(v).toLocaleString("ka-GE");

// მუნიციპალიტეტების შემადგენლობა: 100%-იანი დაწყობილი სვეტები.
// ზუსტი მნიშვნელობა — მაუსის მიტანით; compact — ლეგენდის გარეშე.
export default function StackChart({ data, stack, compact = false }) {
  const rows = Array.isArray(data) ? data : [];
  if (!rows.length) return null;

  const colors = stack.fields.map((f) => rows[0][`${f.field}__color`] ?? f.color);
  const first = stack.fields[0].field;
  const share = (r) => {
    const tot = stack.fields.reduce((s, f) => s + (r[f.field] || 0), 0) || 1;
    return (r[first] || 0) / tot;
  };
  const sorted = [...rows].sort((a, b) => share(b) - share(a));

  const fontSize = compact ? 10 : 12;
  const height = compact ? sorted.length * 22 + 36 : Math.max(300, sorted.length * 32 + 90);

  return (
    <div className="config-bar-chart" style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <BarChart
          data={sorted}
          layout="vertical"
          stackOffset="expand"
          barCategoryGap={compact ? 3 : 6}
          margin={{ top: 4, right: 12, left: 0, bottom: 4 }}
        >
          <XAxis
            type="number"
            tickFormatter={(v) => `${Math.round(v * 100)}%`}
            tick={{ fontSize }}
          />
          <YAxis
            type="category"
            dataKey="name_ge"
            width={compact ? 90 : 105}
            interval={0}
            tick={{ fontSize }}
          />
          <Tooltip formatter={(v, n) => [`${num(v)} ${stack.unit ?? ""}`, n]} />
          {!compact && <Legend wrapperStyle={{ fontSize }} />}
          {stack.fields.map((f, i) => (
            <Bar key={f.field} dataKey={f.field} name={f.label} stackId="s" fill={colors[i]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}