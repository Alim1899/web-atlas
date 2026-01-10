import classes from "./Legend.module.css";
import translit from "translit-geo";
import Nolayer from "../Nolayer";
import DraggableContainer from "../Helpers/DraggableContainer";

const Legend = ({ selectedChart }) => {
  return (
    <DraggableContainer className={classes.main} header="ლეგენდა">
      <div className={classes.content}>
        {selectedChart && (
          <h6 className={classes.layerName}>{selectedChart.layerName}</h6>
        )}
        {selectedChart ? (
          Object.values(selectedChart.data).map((item) => (
            <div key={item.nameGe} className={classes.legend}>
              <div
                style={{
                  backgroundColor: item.color,
                }}
              />
              <span>{translit(item.nameGe)}</span>
            </div>
          ))
        ) : (
          <Nolayer layer="none" />
        )}
      </div>
    </DraggableContainer>
  );
};

export default Legend;
