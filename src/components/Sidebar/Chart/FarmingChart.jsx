// components/ChartFarmingMini.jsx
import { useMemo, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
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
    .filter(([k, v]) => k !== "name_ge" && Number.isFinite(n(v)) && n(v) !== 0)
    .map(([k, v]) => ({
      name: k,
      value: n(v),
      color: Object?.values(row.color),
    }));
};

export default function FarmingChart({ data }) {
  const keys = useMemo(() => Object.keys(data ?? {}), [data]);

  const [selectedKey, setSelectedKey] = useState(() => keys[0] ?? "");

  if (selectedKey && !keys.includes(selectedKey)) {
    setSelectedKey(keys[0] ?? "");
  }

  const rows = data?.[selectedKey] ?? [];
  return (
    <div className={classes.farming}>
      <FormControl size="small" sx={{ minWidth: 260 }}>
        <InputLabel
          id="farming-header-label"
          style={{ marginTop: "5px", color: "whitesmoke" }}
        >
          აირჩიე სექცია
        </InputLabel>
        <Select
          labelId="farming-header-label"
          label="აირჩიე სექცია"
          value={selectedKey}
          className={classes.select}
          onChange={(e) => setSelectedKey(e.target.value)}
        >
          {keys.map((k) => (
            <MenuItem key={k} value={k}>
              {k}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* title */}
      {selectedKey && <div style={{ fontWeight: 700, marginTop: 4 }}></div>}

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
                        outerRadius={70}
                      >
                        {slices.map((_, i) => {
                          const colors = Object.values(row.color);
                          return <Cell  key={i} fill={colors[i]} />;
                        })}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
