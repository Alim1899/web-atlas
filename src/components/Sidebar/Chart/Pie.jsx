import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import translit from "translit-geo";

const ChartPie = ({ data, dataKey, nameKey }) => {
  return (
    <ResponsiveContainer width="98%" height="70%">
      <PieChart>
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey={nameKey}
          innerRadius={100}
          outerRadius={160}
          paddingAngle={2}
        >
          {data.map((entry) => (
            <Cell key={entry.nameGe} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          wrapperStyle={{ fontSize: "16px" }}
          content={({ active, payload }) => {
            if (active && payload && payload.length > 0) {
              const data = payload[0].payload;

              return (
                <div
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "0 5px ",
                  }}
                >
                  <p style={{ fontWeight: 600 }}>{translit(data.nameGe)}</p>
                  <p>{translit(data.descriptionGe) || data.description}</p>
                  <p>
                    <strong>
                      {Number(data.totalArea)
                        .toLocaleString("en-US", {
                          minimumFractionDigits: 1,
                          maximumFractionDigits: 1,
                        })
                        .replace(/,/g, " ")}{" "}
                      m²
                    </strong>
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
        <Legend
          content={({ payload }) => (
            <div
              style={{
                overflowX: "auto",
                marginBottom: "-120px",
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
                  {translit(entry.payload.name)}
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
