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
      <div className={classes.layers}>
        <MapHeaders
          activeLayers={activeLayers}
          chartData={chartData}
          selectedLayer={selectedLayer}
          handleSelected={handleSelected}
          selectedChart={selectedChart}
          layer="info"
        />
      </div>
        
{selectedChart&&<p className={classes.infoText}>{chartData[0].info}</p>
}      </div>
    </DraggableContainer>
  );
};

export default Info;
