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
          innerRadius={2}
          outerRadius={105}
          paddingAngle={10}
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
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                overflow: "auto",
                height: "10vh",
                marginBottom: "-20px",
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
