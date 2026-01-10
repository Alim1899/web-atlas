import classes from "./Legend.module.css";
import translit from "translit-geo";
import DraggableContainer from "../Helpers/DraggableContainer";
import MapHeaders from "../Helpers/MapHeaders";

const Legend = ({
  selectedChart,
  activeLayers,
  chartData,
  selectedLayer,
  handleSelected,
}) => {
  return (
    <DraggableContainer className={classes.main} header="ლეგენდა">
      <div className={classes.content}>
        <div className={classes.layers}>
          <MapHeaders
            layer="legend"
            activeLayers={activeLayers}
            chartData={chartData}
            selectedLayer={selectedLayer}
            handleSelected={handleSelected}
            selectedChart={selectedChart}
          />
        </div>

        {selectedChart &&
          Object.values(selectedChart.data).map((item) => (
            <div key={item.nameGe} className={classes.legend}>
              <div
                style={{
                  backgroundColor: item.color,
                }}
              />
              <span>{translit(item.nameGe)}</span>
            </div>
          ))}
      </div>
    </DraggableContainer>
  );
};

export default Legend;
