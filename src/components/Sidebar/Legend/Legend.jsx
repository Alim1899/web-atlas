import classes from "./Legend.module.css";
import DraggableContainer from "../Helpers/DraggableContainer";
import point from "../../../assets/map/point.svg";
import { useLegend } from "../../Hooks/useLegend";
import useRightBar from "../../Context/RightBarContext/useRightBar";
import Select from "react-select";
import Nolayer from "../Nolayer";
const Legend = () => {
  useLegend();
  const { state: legendState, dispatch: rightBarDispatch } = useRightBar();
  const { legendLayers, selectedLayer, activeData } = legendState;
  const headers = Object.keys(legendLayers).map((key) => ({
    value: key,
    label: key,
  }));

  const svgToDataUrl = (svg) =>
    `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

  const handleSelected = (layer) => {
    sessionStorage.setItem("header", String(layer.value));
    rightBarDispatch({
      type: "LAYER_CHANGED",
      payload: layer.value,
    });
  };

  return (
    <DraggableContainer className={classes.main} header="ლეგენდა">
      {headers.length === 0 && <Nolayer layer="none" />}
      {headers.length > 0 && (
        <div className={classes.content}>
          <Select
            value={headers.find((option) => option.value === selectedLayer)}
            onChange={handleSelected}
            layer="legend"
            options={headers}
          />

          <div className={classes.legend}>
            {activeData?.map((el) => {
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
        </div>
      )}
    </DraggableContainer>
  );
};

export default Legend;
