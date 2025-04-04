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
    <ResponsiveContainer width="98%" height="70%">
      <PieChart>
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey={nameKey}
          innerRadius={90}
          outerRadius={140}
          paddingAngle={3}
        >
          {data.map((entry) => (
            <Cell key={entry.label} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          wrapperStyle={{ fontSize: "16px" }}
          formatter={(value) =>
            `${Number(value)
              .toLocaleString("en-US", {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              })
              .replace(/,/g, " ")} მ²`
          }
        />
        <Legend
          content={({ payload }) => (
            <div
              style={{
                overflowX: "auto",
                marginBottom: "-90px",
                height: "15vh",
                display: "grid",
              }}
            >
              {payload.map((entry, index) => (
                <span
                  key={`item-${index}`}
                  style={{
                    margin: "0 8px",
                    fontSize: "12px",
                    transition: "font-size 0.3s ease-in-out",
                    cursor: "pointer",
                    color: entry.color || "white",
                  }}
                  onMouseEnter={(e) => {
                    (e.target.style.fontSize = "16px"),
                      (e.target.style.backgroundColor = "#aaaaaa");
                    e.target.style.color = "#111";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.fontSize = "12px";
                    e.target.style.backgroundColor = "unset";
                    e.target.style.color = entry.color;
                  }}
                >
                  <span style={{ color: entry.color, marginRight: "5px" }}>
                    ⬤
                  </span>{" "}
                  {entry.value}
                </span>
              ))}
            </div>
          )}
          align="right"
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ChartPie;
