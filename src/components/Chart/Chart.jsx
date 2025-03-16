import classes from "./Chart.module.css";
import chart from "../../assets/chart.svg";
import { useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const fakeData = [
  { label: "მთის", area: 10900, color: "#beebcc" },
  { label: "ზღვის", area: 1143, color: "#c2e699" },
  { label: "ხმელთაშუაზღვის", area: 2500, color: "#78c679" },
  { label: "სუბტროპიკული", area: 8700, color: "#bbb443" },
  { label: "ტროპიკული", area: 6231, color: "#44cb66" },
  { label: "არიდული", area: 1500, color: "#44cbaa" },
];
const Chart = () => {
  const [showChart, setShowChart] = useState(false);
  const handleChange = (e) => {
    e.preventDefault();
    setShowChart(!showChart);
  };
  return (
    <>
      <div className={classes.main}>
        <img
          onClick={(e) => handleChange(e)}
          className={classes.icon}
          src={chart}
          alt="pie-chart"
        />
      </div>
      {showChart && (
        <div className={classes.chart}>
          <h2>დიაგრამა</h2>

          <ResponsiveContainer width="90%" height="90%">
            <PieChart>
              <Pie
                data={fakeData}
                dataKey="area"
                nameKey="label"
                innerRadius={80}
                outerRadius={105}
                paddingAngle={5}
              >
                {fakeData.map((entry) => (
                  <Cell key={entry.label} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value} მ²`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default Chart;

{
  /* <ResponsiveContainer width="90%" height="95%">
<AreaChart
  data={fakeData}
  margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
>
  <XAxis dataKey="label" tick={{ fontSize: 10, fill: "black" }} />
  <YAxis unit="კმ²" tick={{ fontSize: 14, fill: "black" }} />
  <CartesianGrid strokeDasharray="5" />
  <Tooltip content={CustomTooltip} />
  <Area
    dataKey="area"
    type="monotone"
    stroke="black"
    fill="orange"
    strokeWidth={0.5}
    name="კლიმატური განაწილება"
  ></Area>
</AreaChart>
</ResponsiveContainer> */
}
