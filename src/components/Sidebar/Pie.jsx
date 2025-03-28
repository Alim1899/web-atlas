import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ChartPie = ({ data, dataKey, nameKey }) => {
  return (
    <ResponsiveContainer width="90%" height="90%">
      <PieChart>
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey={nameKey}
          innerRadius={80}
          outerRadius={105}
          paddingAngle={5}
        >
          {data.map((entry) => (
            <Cell key={entry.label} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) =>
            `${Number(value)
              .toLocaleString("en-US", {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              })
              .replace(/,/g, " ")} მ²`
          }
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ChartPie;
