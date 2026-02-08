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
  {activeData?.map((el) => (
    <div key={el.name ?? el.header} className={classes.legendGroup}>
      {!!el.header && <h2 className={classes.header}>{el.header}</h2>}
     {el.shape === "polygon" && (
  <>
    {/* ✅ GROUPED (has subheader) */}
    {el.hasSubHeader &&
      el.data.map((group, gIdx) => (
        <div
          className={classes.subheader}
          key={`${el.name}-${group.subheader}-${gIdx}`}
        >
          {group.subheader && <h2>{group.subheader}</h2>}

          {group.items?.map((elem, iIdx) => (
            <div
              key={`${el.name}-${group.subheader}-${elem.index ?? iIdx}`}
              className={classes.legendItem}
            >
              <div
                className={classes.legendColor}
                style={{ backgroundColor: elem.color }}
              >
                <span>{elem?.unicode}</span>
              </div>

              <span className={classes.span}>{elem.txt}</span>
            </div>
          ))}
        </div>
      ))}

    {/* ✅ FLAT (no subheader) */}
    {!el.hasSubHeader &&
      el.data.map((item, idx) => (
        <div key={`${el.name}-${idx}`} className={classes.legendItem}>
          <div
            className={classes.legendColor}
            style={{ backgroundColor: item.color }}
          >
            <span>{item?.unicode}</span>
          </div>
          <span className={classes.span}>{item.txt}</span>
        </div>
      ))}
  </>
)}


         
      {(el.shape === "points" || el.shape === "line") &&
     
        el.data.map((item, i) => (
     
          <div key={`${el.name}-${i}`} className={classes.legendItem}>
            <img
              className={classes.legendIcon}
              src={item.sign ? svgToDataUrl(item.sign) : point}
              alt={item.name}
              width={Array.isArray(item.size) ? item.size[0] : 40}
              height={Array.isArray(item.size) ? item.size[1] : 40}
            />
            <span className={classes.span}>
              {item.name}
              {item.location && `, ${item.location}`}
            </span>
          </div>
        ))}
    </div>
  ))}
</div>

        </div>
      )}
    </DraggableContainer>
  );
};

export default Legend;
