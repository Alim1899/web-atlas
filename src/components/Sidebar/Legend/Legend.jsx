import classes from "./Legend.module.css";
import DraggableContainer from "../Helpers/DraggableContainer";
import point from "../../../assets/map/point.svg";
import useLegend from "../../Hooks/useLegend";
const Legend = () => {
  const { legendData } = useLegend();
  const svgToDataUrl = (svg) =>
    `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  return (
    <DraggableContainer className={classes.main} header="ლეგენდა">
      <div className={classes.content}>
        {legendData.length > 0 && (
          <div className={classes.legend}>
            {legendData.map((el) => {
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
              } else if (el.shape === "points") {
                return el.data.map((item, i) => (
                  <div key={`${el.name}-${i}`} className={classes.legendItem}>
                    <img
                      className={classes.legendIcon}
                      src={item.sign ? svgToDataUrl(item.sign) : point}
                      alt={item.name}
                    />

                    <span className={classes.span}>
                      {item.name}{item.location && `, ${item.location}`}
                    </span>
                  </div>
                ));
              }
            })}
          </div>
        )}
      </div>
    </DraggableContainer>
  );
};

export default Legend;
