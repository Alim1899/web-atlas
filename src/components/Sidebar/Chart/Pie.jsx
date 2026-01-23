import classes from "./Chart.module.css";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Sector,
} from "recharts";
import translit from "translit-geo";
import { useState } from "react";

const ChartPie = ({ data, dataKey, nameKey }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [tooltipIndex, setTooltipIndex] = useState(null);

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
              innerRadius={100}
              outerRadius={160}
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
                  opacity={
                    activeIndex === null || activeIndex === index ? 1 : 0.35
                  }
                  onMouseEnter={() => {
                    setActiveIndex(index);
                    setTooltipIndex(index);
                  }}
                />
              ))}
            </Pie>

            <Tooltip
              active={tooltipIndex !== null}
              payload={
                activeData
                  ? [
                      {
                        payload: activeData,
                        name: activeData[nameKey],
                        value: activeData[dataKey],
                      },
                    ]
                  : []
              }
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div
                      style={{
                        backgroundColor: data.color,
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        padding: "5px",
                      }}
                    >
                      <p style={{ fontWeight: 600 }}>{translit(data.name_ge)}</p>
                      <p>{translit(data.descriptionGe) || data.description_ge}</p>
                      <p>
                        <strong>
                          {Number(data.totalArea)
                            .toLocaleString("en-US", {
                              minimumFractionDigits: 1,
                              maximumFractionDigits: 1,
                            })
                            .replace(/,/g, " ")}{" "}
                          m²
                        </strong>
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* CUSTOM SCROLLABLE LEGEND */}
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
              opacity: activeIndex === null || activeIndex === index ? 1 : 0.4,
              fontWeight: activeIndex === index ? 600 : 400,
            }}
          >
            <span style={{ color: item.color, marginRight: "6px" }}>⬤</span>
            <span style={{ color: item.color }}>{translit(item[nameKey])}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartPie;
