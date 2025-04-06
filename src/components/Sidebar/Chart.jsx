import classes from "./Chart.module.css";
import useMaps from "../Map/MapContext/useMaps";
import drag from "../../assets/drag.svg";
import remove from "../../assets/delete.svg";

import useDraggable from "../Hooks/useDraggable";
import { useEffect, useRef, useState } from "react";
import ChartPie from "./Pie";
const Chart = ({ handleChart }) => {
  const chartRef = useRef(null);
  const [activeData, setActiveData] = useState([]);
  const { position, handleStart } = useDraggable(chartRef);
  const handleSelected = (e) => {
    setSelectedLayer(e.target.value);
    sessionStorage.setItem("selectedLayer", e.target.value);
  };
  const { state } = useMaps();
  const { chartdata, activeLayers } = state;
  const { data } = chartdata;
  const [selectedLayer, setSelectedLayer] = useState(() => {
    if (data.length > 0) {
      const storedLayer = sessionStorage.getItem("selectedLayer");
      return storedLayer || Object.keys(data[0]).join();
    }
    return "";
  });
  useEffect(() => {
    console.log("Checking");
    console.log(selectedLayer, data);
    if (data.length > 0 && !selectedLayer)
      setSelectedLayer(Object.keys(data[0]).join());
    if (!selectedLayer || data.length === 0) return;
    const foundData = data.find((el) => Object.keys(el)[0] === selectedLayer);
    if (foundData) {
      setActiveData(Object.values(foundData)[0]); // Get the value instead of Object.entries
    }
  }, [selectedLayer, data]);

  let filtered = [];
  if (activeData.length > 0) {
    filtered = Object.values(
      activeData.reduce((acc, item) => {
        const { label, area, color, index } = item;

        if (!acc[label]) {
          acc[label] = { label, area: 0, color, index };
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
              {[...activeLayers]
                .sort((a, b) => a.id.localeCompare(b.id))
                .map((el) => (
                  <option key={el.id} id={selectedLayer}>
                    {el.id}
                  </option>
                ))}
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
