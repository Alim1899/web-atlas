import classes from "./Chart.module.css";
import chart from "../../assets/chart.svg";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { Tooltip } from "react-leaflet";
const fakeData = [
  { label: "მთის", area: 22900 },
  { label: "ზღვის", area: 143 },
  { label: "ხმელთაშუაზღვის", area: 2500 },
  { label: "სუბტროპიკული", area: 8700 },
  { label: "ტროპიკული", area: 6231 },
  { label: "არიდული", area: 1500 },
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
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={fakeData}
              margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
            >
              <XAxis dataKey="label" tick={{ fontSize: 10, fill: "black" }} />
              <YAxis unit="კმ²" tick={{ fontSize: 14, fill: "black" }} />
              <CartesianGrid />
              <Tooltip />
              <Area
                dataKey="area"
                type="monotone"
                stroke="red"
                fill="orange"
              ></Area>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default Chart;
