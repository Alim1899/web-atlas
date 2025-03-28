import classes from "./Chart.module.css";
import useMaps from "../Map/MapContext/useMaps";
import drag from "../../assets/drag.svg";
import remove from "../../assets/delete.svg";

import useDraggable from "../Hooks/useDraggable";
import { useRef, useState } from "react";
import ChartPie from "./Pie";
const Chart = ({ handleChart }) => {
  const chartRef = useRef(null);
  const [selectedLayer, setSelectedLayer] = useState("");
  const { position, handleStart } = useDraggable(chartRef);
  const handleSelected = (e) => {
    setSelectedLayer(e.target.value);
  };
  const { state } = useMaps();
  const { chartdata, activeLayers } = state;
  const { data } = chartdata;
  let agro = [];
  let geology = [];
  let filtered = [];
  let filterGeo = [];

  if (data.length > 0) agro = Object.values(data[0]);
  if (data.length > 0) geology = Object.values(data[1]);
  if (agro.length > 0) {
    filtered = Object.values(
      agro[0].reduce((acc, item) => {
        const { label, area, color } = item;

        if (!acc[label]) {
          acc[label] = { label, area: 0, color };
        }
        acc[label].area += parseFloat(area);
        return acc;
      }, {})
    );
  }
  if (geology.length > 0) {
    filterGeo = Object.values(
      geology[0].reduce((acc, item) => {
        const { label, area, color } = item;

        if (!acc[label]) {
          acc[label] = { label, area: 0, color };
        }
        acc[label].area += parseFloat(area);
        return acc;
      }, {})
    );
  }

  return (
    <div className={classes.main}>
      <div
        ref={chartRef}
        className={classes.charts}
        style={{ top: `${position.y}px`, left: `${position.x}px` }}
        onMouseDown={handleStart}
        onTouchStart={handleStart}
      >
        <div className={classes.head}>
          <img
            src={drag}
            alt="drag-and-drop"
            className={classes.dragHandle}
            onMouseDown={handleStart}
            onTouchStart={handleStart}
          />
          <h3 className={classes.header}>დიაგრამა</h3>
          <img
            className={classes.dragHandle}
            src={remove}
            onClick={handleChart}
            alt="remove"
          />
        </div>

        {activeLayers.length > 0 ? (
          <div className={classes.chart}>
            <select onChange={(e) => handleSelected(e)}>
              {activeLayers.map((el) => {
                return (
                  <option key={el.id} id={selectedLayer}>
                    {el.id}
                  </option>
                );
              })}
            </select>

            <div className={classes.diagram}>
              <ChartPie
                data={Object.values(filtered)}
                dataKey="area"
                nameKey="label"
              />
            </div>
          </div>
        ) : (
          <p className={classes.param}>გთხოვთ აირჩიოთ რუკა</p>
        )}
      </div>
    </div>
  );
};

export default Chart;
