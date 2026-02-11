import classes from "./Chart.module.css";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Sector,
} from "recharts";
import { useState } from "react";

const ChartPie = ({ data, dataKey, nameKey }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [tooltipIndex, setTooltipIndex] = useState(null);

  const getOpacity = (index) =>
    activeIndex === null || activeIndex === index ? 1 : 0.35;

  const activeData = tooltipIndex !== null ? data[tooltipIndex] : null;
  return (
    <div className={classes.wrapper}>
      <div className={classes.chartArea}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart className={classes.piechart}>
            <Pie
              data={data}
              dataKey={dataKey}
              nameKey={nameKey}
              innerRadius={120}
              outerRadius={180}
              paddingAngle={3}
              activeIndex={activeIndex}
              activeShape={(props) => (
                <Sector {...props} outerRadius={props.outerRadius + 5} />
              )}
              onMouseLeave={() => {
                setActiveIndex(null);
                setTooltipIndex(null);
              }}
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.name_ge}
                  fill={entry.color}
                  opacity={getOpacity(index)} // always a number
                  onMouseEnter={() => {
                    setActiveIndex(index);
                    setTooltipIndex(index);
                  }}
                  onMouseLeave={() => {
                    setActiveIndex(null);
                    setTooltipIndex(null);
                  }}
                  cursor="pointer"
                />
              ))}
            </Pie>

    
          </PieChart>
        </ResponsiveContainer>
      </div>
   {activeData && (
  <div
    style={{
      position: "absolute",
      top: "20px",
      left: "40%",
      backgroundColor: activeData.color,
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "5px",
      zIndex:"999999999"
    }}
  >
    <p style={{ fontWeight: 600 }}>
      {activeData.name_ge}
    </p>
    <p>
      {activeData.description_ge || activeData.description_en}
    </p>
    <p>
      <strong>
        {Number(activeData.totalArea)
          .toLocaleString("en-US", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
          })
          .replace(/,/g, " ")}{" "}
        m²
      </strong>
    </p>
  </div>
)}
      <div className={classes.legendScroll}>
        {data.map((item, index) => (
          
          <div
            key={item.name_ge}
            className={classes.listItem}
            onMouseEnter={() => {
              setActiveIndex(index);
              setTooltipIndex(index);
            }}
            onMouseLeave={() => {
              setActiveIndex(null);
              setTooltipIndex(null);
            }}
            style={{
              opacity: getOpacity(index), 
              fontWeight: activeIndex === index ? 900 : 400,
              cursor: "pointer",
            }}
          >
            <span style={{ color: item.color, marginRight: "6px" }}>⬤</span>
            <span style={{ color: item.color }}>{item[nameKey]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartPie;
