import { useState, useRef, useEffect, useCallback } from "react";
import classes from "./Chart.module.css";
import useMaps from "../Map/MapContext/useMaps";
import drag from "../../assets/drag.svg";
import remove from "../../assets/delete.svg";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const Chart = ({ handleChart }) => {
  const chartRef = useRef(null); // Ref for chart
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState("");
  const offset = useRef({ x: 0, y: 0 });

  // Function to calculate the new position
  const centerChart = () => {
    if (chartRef.current) {
      const { offsetWidth, offsetHeight } = chartRef.current;
      setPosition({
        x: window.innerWidth / 2 - offsetWidth / 2,
        y: window.innerHeight / 2 - offsetHeight / 2,
      });
    }
  };

  // Centering Chart on Mount
  useEffect(() => {
    centerChart(); // Set initial position
    // Add resize event listener to update position on window resize
    window.addEventListener("resize", centerChart);
    // Cleanup the resize event listener when component unmounts
    return () => {
      window.removeEventListener("resize", centerChart);
    };
  }, []);

  const handleStart = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setIsDragging(true);
    offset.current = {
      x: clientX - position.x,
      y: clientY - position.y,
    };
  };
  const handleMove = useCallback(
    (e) => {
      if (!isDragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      setPosition({
        x: clientX - offset.current.x,
        y: clientY - offset.current.y,
      });
    },
    [isDragging]
  );
  const handleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);
  // Memoize handlers to avoid unnecessary re-renders
  useEffect(() => {
    if (!isDragging) return;

    const moveHandler = (e) => handleMove(e);
    const endHandler = () => handleEnd();

    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("mouseup", endHandler);
    window.addEventListener("touchmove", moveHandler);
    window.addEventListener("touchend", endHandler);

    return () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseup", endHandler);
      window.removeEventListener("touchmove", moveHandler);
      window.removeEventListener("touchend", endHandler);
    };
  }, [isDragging, position, handleMove, handleEnd]);

  const { state } = useMaps();
  const { chartdata, activeLayers } = state;
  const { data } = chartdata;
  const agro = Object.values(data[0]);
  const handleSelected = (e) => {
    setSelectedLayer(e.target.value);
  };

  const filtered = agro[0].reduce((acc, item) => {
    const { label, area, color } = item;

    if (!acc[label]) {
      acc[label] = { label, area: 0, color };
    }
    acc[label].area += parseFloat(area);
    console.log(acc);
    return acc;
  }, {});
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
            onTouchStart={handleStart} // Added touch support
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
                return <option key={el.id}>{el.id}</option>;
              })}
            </select>

            <div>
              <ResponsiveContainer width="90%" height="90%">
                <PieChart>
                  <Pie
                    data={Object.values(filtered)} // Ensure it's an array
                    dataKey="area"
                    nameKey="label"
                    innerRadius={80}
                    outerRadius={105}
                    paddingAngle={5}
                  >
                    {Object.values(filtered).map((entry) => (
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
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
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
