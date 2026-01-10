import classes from "./Legend.module.css";
import DraggableContainer from "../Helpers/DraggableContainer";
import MapHeaders from "../Helpers/MapHeaders";

const Info = ({
  selectedChart,
  activeLayers,
  chartData,
  selectedLayer,
  handleSelected,
}) => {
  return (
    <DraggableContainer header="დამატებითი ინფორმაცია" className={classes.main}>
      <div className={classes.content}>
        <MapHeaders
          activeLayers={activeLayers}
          chartData={chartData}
          selectedLayer={selectedLayer}
          handleSelected={handleSelected}
          selectedChart={selectedChart}
          layer="info"
        />
      </div>
    </DraggableContainer>
  );
};

export default Info;
