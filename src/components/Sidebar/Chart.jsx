import classes from "./Chart.module.css";
import useMaps from "../Map/MapContext/useMaps";
import drag from "../../assets/drag.svg";
import remove from "../../assets/delete.svg";
import useDraggable from "../Hooks/useDraggable";
import { useEffect, useRef, useState } from "react";
import ChartPie from "./Pie";
import { getColor } from "../Utils/ColorScales";
import { useQueryClient } from "@tanstack/react-query";
const Chart = ({ handleChart }) => {
  // DATA FOR CHARTS
  const queryClient = useQueryClient();
  const geojsonQueries = queryClient
    .getQueryCache()
    .findAll({ queryKey: ["geojson"] }); // partial match
  const allGeojsonData = geojsonQueries.map((q) => ({
    key: q.queryKey,
    data: q.state.data,
  }));
  // GETTING ACTIVE LAYER IDS
  const { state } = useMaps();
  const { activeLayers } = state;
  //const layerIds = activeLayers.map((layer) => layer.id);
  const chartRef = useRef(null);
  const [activeData, setActiveData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const { position, handleStart } = useDraggable(chartRef);

  const [selectedLayer, setSelectedLayer] = useState(() => {
    if (allGeojsonData.length > 0) {
      const storedLayer = sessionStorage.getItem("selectedLayer");
      return storedLayer || activeLayers[0];
    }
    return "";
  });
  const handleSelected = (e) => {
    const layer = e.target.value;
    setSelectedLayer(layer);
    sessionStorage.setItem("selectedLayer", layer);
    allGeojsonData.map(
      (el) =>
        el.key[1] === layer && setActiveData(Object.values(el.data.features))
    );
  };

  console.log(allGeojsonData);
  console.log(selectedLayer);
  useEffect(() => {
    if (activeData.length > 0) {
      const type = activeData[0].geometry.type;

      if (type === "MultiPolygon") {
        const summary = activeData.reduce((acc, el) => {
          const key = `${el.properties.layerName}`;
          const type = selectedLayer; // e.g., "geology", "agro", etc.

          if (!acc[key]) {
            acc[key] = {
              layerName: el.properties.layerName,
              layerDesc: el.properties.layerDesc,
              area: 0,
              length: 0,
              color: getColor(type, el.properties.layerName),
            };
          }
          acc[key].area += el.properties.area;
          acc[key].length += el.properties.length;

          return acc;
        }, {});

        const result = Object.values(summary);
        setChartData(result);
      } else {
        setChartData([]);
      }
    }
  }, [activeData, selectedLayer]);

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
            {chartData.length > 0 ? (
              <div className={classes.diagram}>
                <ChartPie
                  data={Object.values(chartData)}
                  dataKey="area"
                  nameKey="layerName"
                />
              </div>
            ) : (
              <p className={classes.param}>⛔ამ ფენას არ აქვს დიაგრამა</p>
            )}
          </div>
        ) : (
          <p className={classes.param}>გთხოვთ აირჩიოთ რუკა</p>
        )}
      </div>
    </div>
  );
};

export default Chart;
