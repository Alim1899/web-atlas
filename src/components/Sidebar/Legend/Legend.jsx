import classes from "./Legend.module.css";
import DraggableContainer from "../Helpers/DraggableContainer";
import { useLegend } from "../../Hooks/useLegend";
import useRightBar from "../../Context/RightBarContext/useRightBar";
import Select from "react-select";
import PointandLayeRenderer from "../Helpers/PointandLayeRenderer";
import Nolayer from "../Nolayer";
import PolygonRenderer from "../Helpers/PolygonRenderer";
const Legend = () => {
  useLegend();
  const { state: legendState, dispatch: rightBarDispatch } = useRightBar();
  const { legendLayers, selectedLayer, activeData } = legendState;
  const headers = Object.keys(legendLayers).map((key) => ({
    value: key,
    label: key,
  }));

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

          {activeData?.map((el) => (
            <div key={el.name ?? el.header} className={classes.legendGroup}>
              <div className={classes.items}>
                {!!el.header && <h2 className={classes.header}>{el.header}</h2>}
                {el.shape === "polygon" && (<PolygonRenderer el={el} classes={classes}/>
                )}

                {(el.shape === "points" || el.shape === "line") && (
                  <PointandLayeRenderer el={el} classes={classes} />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </DraggableContainer>
  );
};

export default Legend;
