import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";
import classes from "./Chart.module.css";

const n = (x) => (Number.isFinite(+x) ? +x : 0);

const buildSlices = (row) => {
  return Object.entries(row)
    .filter(([k, v]) => k !== "color" && Number.isFinite(n(v)) && n(v) !== 0)
    .map(([k, v]) => ({
      name: k,
      value: n(v),
    }));
};

export default function MeritalChart({ data }) {
  if (!Array.isArray(data)) return null;
  return (
    <div className={classes.marital}>
      <div className={classes.maritalPies}>
        {data[0].map((row, i) => {
          const oldSlices = buildSlices(row.old);
          const newSlices = buildSlices(row.new);

          const colors = Object.values(row.old.color || {});

          return (
            <div key={i} className={classes.maritalPie}>
              <div className={classes.farmHeader}>{row.name_ge}</div>

              <div style={{ display: "flex", gap: "1px", height: "150px" }}>
                {/* OLD PIE */}
                <ResponsiveContainer width="50%" height="100%">
                  <PieChart>
                    <Pie
                      data={oldSlices}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={45}
                      paddingAngle={3}
                      label={({ value }) => value}
                    >
                      {oldSlices.map((_, idx) => (
                        <Cell key={idx} fill={colors[idx]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>

                {/* NEW PIE */}
                <ResponsiveContainer width="50%" height="100%">
                  <PieChart>
                    <Pie
                      data={newSlices}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={45}
                      paddingAngle={3}
                      label={({ value }) => value}
                    >
                      {newSlices.map((_, idx) => (
                        <Cell key={idx} fill={colors[idx]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          );
        })}
      </div>

      <Legend />
    </div>
  );
}
