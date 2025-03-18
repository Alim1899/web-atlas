import classes from "./Chart.module.css";
import useMaps from "../Map/MapContext/useMaps";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const Chart = () => {
  const { state } = useMaps();
  const { chartdata } = state;
  const data =
    Object.values(
      chartdata.data.reduce((acc, { label, area, color }) => {
        if (!acc[label]) {
          acc[label] = { label, area: 0, color };
        }
        acc[label].area += parseFloat(area);
        return acc;
      }, {})
    ) || [];
  console.log(data);
  return (
    <>
      <div className={classes.main}></div>

      <div className={classes.chart}>
        <h3 className={classes.header}>დიაგრამა</h3>
        {data.length > 0 ? (
          <ResponsiveContainer width="90%" height="90%">
            <PieChart>
              <Pie
                data={data}
                dataKey="area"
                nameKey="label"
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
              />{" "}
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className={classes.param}>გთხოვთ აირჩიოთ რუკა</p>
        )}
      </div>
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
  <Tooltip />
  <Area
    dataKey="area"
    type="monotone"
    stroke="black"
    fill="orange"
    strokeWidth={0.5}
    name="ფართობი"
  ></Area>
</AreaChart>
</ResponsiveContainer> */
  // const fakeData = [
  //   { label: "მთის", area: 10900, color: "#beebcc" },
  //   { label: "ზღვის", area: 1143, color: "#c2e699" },
  //   { label: "ხმელთაშუაზღვის", area: 2500, color: "#78c679" },
  //   { label: "სუბტროპიკული", area: 8700, color: "#bbb443" },
  //   { label: "ტროპიკული", area: 6231, color: "#44cb66" },
  //   { label: "არიდული", area: 1500, color: "#44cbaa" },
  // ];
}
