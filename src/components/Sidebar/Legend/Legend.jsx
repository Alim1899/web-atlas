import classes from "./Legend.module.css";
import DraggableContainer from "../Helpers/DraggableContainer";
import point from "../../../assets/map/point.svg";
import { useLegend } from "../../Hooks/useLegend";
import Select from "react-select";
import Nolayer from "../Nolayer";
import { useState } from "react";
const Legend = () => {
  const { legendData } = useLegend();
  const [selectedHeader, setSelectedHeader] = useState(
    sessionStorage.getItem("header") || "",
  );
  const [activeData, setActiveData] = useState(
    legendData[selectedHeader] || [],
  );

  const svgToDataUrl = (svg) =>
    `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  const headers = Object.keys(legendData).map((key) => ({
    value: key,
    label: key,
  }));

  const handleSelected = (layer) => {
    sessionStorage.setItem("header", String(layer.value));
    setSelectedHeader(layer);
    setActiveData(legendData[layer.value]);
  };

  return (
    <DraggableContainer className={classes.main} header="ლეგენდა">
      <Select
        value={headers.find((option) => option.value === selectedHeader)}
        onChange={handleSelected}
        layer="legend"
        options={headers}
      />

      <div className={classes.content}>
        {activeData.length > 0 ? (
          <div className={classes.legend}>
            {activeData.map((el) => {
              if (el.shape === "polygon") {
                return el.data.map((item, idx) => (
                  <div key={`${el.name}-${idx}`} className={classes.legendItem}>
                    <div
                      className={classes.legendColor}
                      style={{ backgroundColor: item.color }}
                    />
                    <span className={classes.span}>{item.txt}</span>
                  </div>
                ));
              } else if (el.shape === "points" || el.shape === "line") {
                return el.data.map((item, i) => (
                  <div key={`${el.name}-${i}`} className={classes.legendItem}>
                    <img
                      className={classes.legendIcon}
                      src={item.sign ? svgToDataUrl(item.sign) : point}
                      alt={item.name}
                    />

                    <span className={classes.span}>
                      {item.name}
                      {item.location && `, ${item.location}`}
                    </span>
                  </div>
                ));
              }
            })}
          </div>
        ) : (
          <Nolayer layer="legend" />
        )}
      </div>
    </DraggableContainer>
  );
};

export default Legend;
