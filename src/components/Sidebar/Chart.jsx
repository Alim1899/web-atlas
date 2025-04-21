import classes from "./Chart.module.css";
import useMaps from "../Map/MapContext/useMaps";
import remove from "../../assets/delete.svg";
import useDraggable from "../Hooks/useDraggable";
import { useRef, useState } from "react";
import ChartPie from "./Pie";
import { getColor } from "../Utils/ColorScales";
const Chart = ({ handleChart }) => {
  const { state } = useMaps();
  const { dataChart, activeLayers } = state;
  const chartRef = useRef(null);
  const { handleStart } = useDraggable(chartRef);
  const [selectedLayer, setSelectedLayer] = useState(
    sessionStorage.getItem("selectedLayer") || ""
  );
  const handleSelected = (e) => {
    const layer = e.target.value;
    setSelectedLayer(layer);
    sessionStorage.setItem("selectedLayer", layer);
  };
  const chartData = [];

  dataChart.map((el) => {
    const type = el[1].type;
    if (type !== "polygon") return;
    const key = el[0];

    const summarized = {};
    const charts = el[1].features;
    charts.map((prop) => {
      const props = prop.properties;
      const name = props.layerName;
      const layerType = el[0];
      if (!summarized[name]) {
        summarized[name] = {
          layerName: name,
          layerDesc: props.layerDesc,
          totalArea: 0,
          totalLength: 0,
          color: getColor(layerType, name),
        };
      }

      summarized[name].totalArea += props.area;
      summarized[name].totalLength += props.length;
    });

    chartData.push({ id: key, data: summarized });
  });

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
      {activeLayers.length > 0 ? (
        <div className={classes.chart}>
          <select value={selectedLayer} onChange={(e) => handleSelected(e)}>
            {[...activeLayers]
              .sort((a, b) => a.id.localeCompare(b.id))
              .map((el) => (
                <option key={el.id} id={selectedLayer}>
                  {el.id}
                </option>
              ))}
          </select>
          {chartData.length > 0 ? (
            <div className={classes.diagram}>
              {chartData.map((el) => {
                if (el.id === selectedLayer) {
                  return (
                    <ChartPie
                      key={el.id}
                      data={Object.values(el.data)}
                      dataKey="totalArea"
                      nameKey="layerName"
                    />
                  );
                }
              })}
            </div>
          ) : (
            <p className={classes.param}>⛔ამ ფენას არ აქვს დიაგრამა</p>
          )}
        </div>
      ) : (
        <p className={classes.param}>გთხოვთ აირჩიოთ რუკა</p>
      )}
    </div>
  );
};

export default Chart;
