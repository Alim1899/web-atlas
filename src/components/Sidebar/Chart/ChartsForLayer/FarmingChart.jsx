// components/ChartFarmingMini.jsx
import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import { getLayerTitle } from "./getLayerTitle";
import classes from "../Chart.module.css";
const n = (x) => (Number.isFinite(+x) ? +x : 0);

const buildSlices = (row) => {
  return Object.entries(row)
    .filter(([k, v]) => k !== "name_ge" && Number.isFinite(n(v)) && n(v) !== 0)
    .map(([k, v]) => ({
      name: k,
      value: n(v),
      color: Object?.values(row.color),
    }));
};

export default function FarmingChart({ data,layer }) {
  const keys = useMemo(() => Object.keys(data ?? {}), [data]);
console.log(layer);
  const [selectedKey, setSelectedKey] = useState(() => keys[0] ?? "");

  if (selectedKey && !keys.includes(selectedKey)) {
    setSelectedKey(keys[0] ?? "");
  }
  const rows = useMemo(() => {
    return data?.[selectedKey] ?? [];
  }, [data, selectedKey]);
  const legendData = useMemo(() => {
    if (!Array.isArray(rows) || !rows.length) return [];

    const firstRow = rows[0];
    const slices = buildSlices(firstRow);
    const colors = Object.values(firstRow.color);

    return slices.map((s, i) => ({
      value: s.name,
      type: "round",
      color: colors[i],
    }));
  }, [rows]);
  return (
    <div className={classes.farming}>
   
      {/* title */}

      {/* one pie per municipality */}
      <div className={classes.pies}>
        {Array.isArray(rows) &&
          rows.map((row) => {
            const slices = buildSlices(row);
            if (!slices.length) return null;

            return (
              <div key={row.name_ge} className={classes.pie}>
                <div className={classes.farmHeader}>{row.name_ge}</div>

                <div className={classes.cell}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={slices}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={50}
                        paddingAngle={5}
                        label={({ value }) => value}
                      >
                        {slices.map((_, i) => {
                          const colors = Object.values(row.color);
                          return <Cell key={i} fill={colors[i]} />;
                        })}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            );
          })}
      </div>
        <div className={classes.legend}>
<h4>{getLayerTitle(layer)}</h4>
  {legendData.map((item, i) => (
    <div key={i} className={classes.legendItem}>
      <div
        className={classes.legendColor}
        style={{ backgroundColor: item.color }}
      />
      <span style={{ color: item.color }}>{item.value}</span>
    </div>
  ))}
</div>
      
    </div>
  );
}
