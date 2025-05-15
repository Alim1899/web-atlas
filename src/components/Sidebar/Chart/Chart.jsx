// Chart.jsx
import classes from "./Chart.module.css";
import ChartPie from "./Pie";
import useDraggable from "../../Hooks/useDraggable";
import remove from "../../../assets/delete.svg";
import { useRef } from "react";

const Chart = ({
  handleChart,
  chartData,
  activeLayers,
  selectedLayer,
  handleSelected,
}) => {
  const chartRef = useRef(null);
  const { handleStart } = useDraggable(chartRef);

  const selectedChart = chartData.find((el) => el.id === selectedLayer);

  return (
    <div
      className={classes.main}
      ref={chartRef}
      onMouseDown={handleStart}
      onTouchStart={handleStart}
    >
      <div className={classes.charts}>
        <div className={classes.head}>
          <h3 className={classes.header}>დიაგრამა</h3>
          <img
            className={classes.dragHandle}
            src={remove}
            onClick={handleChart}
            alt="remove"
          />
        </div>
      </div>

      {activeLayers.length === 0 ? (
        <p className={classes.param}>გთხოვთ აირჩიოთ რუკა</p>
      ) : (
        <div className={classes.chart}>
          <select
            value={selectedLayer}
            onChange={(e) => handleSelected(e.target.value)}
          >
            {[...activeLayers]
              .sort((a, b) => a.id.localeCompare(b.id))
              .map((el) => {
                const hasChart = chartData.some((chart) => chart.id === el.id);
                return (
                  <option key={el.id} value={el.id}>
                    {el.id} {hasChart ? "" : "(⚠️ No Data)"}
                  </option>
                );
              })}
          </select>

          {selectedChart ? (
            <div className={classes.diagram}>
              <ChartPie
                key={selectedChart.id}
                data={Object.values(selectedChart.data)}
                dataKey="totalArea"
                nameKey="layerName"
              />
            </div>
          ) : (
            <p className={classes.param}>ამ ფენას არ აქვს დიაგრამა</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Chart;
