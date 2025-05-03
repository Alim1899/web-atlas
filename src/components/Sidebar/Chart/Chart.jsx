import classes from "./Chart.module.css";
import useMaps from "../../Map/MapContext/useMaps";
import remove from "../../../assets/delete.svg";
import useDraggable from "../../Hooks/useDraggable";
import { useEffect, useMemo, useRef, useState } from "react";
import ChartPie from "./Pie";
import { getColor } from "../../Utils/ColorScales";
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
  const chartData = useMemo(() => {
    const result = [];

    dataChart.forEach((el) => {
      const type = el[1].type;
      if (type !== "polygon") return;
      const key = el[0];

      const summarized = {};
      const charts = el[1].features;
      charts.forEach((prop) => {
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

      result.push({ id: key, data: summarized });
    });

    return result;
  }, [dataChart]);

  useEffect(() => {
    if (activeLayers.length === 0) {
      setSelectedLayer("");
      sessionStorage.removeItem("selectedLayer");
      return;
    }

    const stillExists = activeLayers.some(
      (layer) => layer.id === selectedLayer
    );
    if (!stillExists) {
      const fallback = activeLayers[0].id;
      setSelectedLayer(fallback);
      sessionStorage.setItem("selectedLayer", fallback);
    }
  }, [activeLayers, selectedLayer]);

  useEffect(() => {
    if (activeLayers.length === 0) {
      setSelectedLayer("");
      sessionStorage.removeItem("selectedLayer");
      return;
    }

    const stillExists = activeLayers.some(
      (layer) => layer.id === selectedLayer
    );
    if (!stillExists) {
      const fallback = activeLayers[0].id;
      setSelectedLayer(fallback);
      sessionStorage.setItem("selectedLayer", fallback);
    }
  }, [activeLayers, selectedLayer]);
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
          <select value={selectedLayer} onChange={handleSelected}>
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

          {(() => {
            const selectedChart = chartData.find(
              (el) => el.id === selectedLayer
            );
            if (selectedChart) {
              return (
                <div className={classes.diagram}>
                  <ChartPie
                    key={selectedChart.id}
                    data={Object.values(selectedChart.data)}
                    dataKey="totalArea"
                    nameKey="layerName"
                  />
                </div>
              );
            } else {
              return <p className={classes.param}>ამ ფენას არ აქვს დიაგრამა</p>;
            }
          })()}
        </div>
      )}
    </div>
  );
};

export default Chart;
