import classes from "./Legend.module.css";
import DraggableContainer from "../Helpers/DraggableContainer";
import MapHeaders from "../Helpers/MapHeaders";
import useMaps from "../../Context/MapContext/useMaps";
const Info = ({
  selectedChart,
  activeLayers,
  selectedLayer,
  handleSelected,
}) => {
  const { state } = useMaps();
  const { dataChart } = state;
  let info = null;

  if (dataChart && dataChart.length > 0) {
    info = dataChart.find((el) => el[0] === selectedLayer) || null;
  }
  return (
    <DraggableContainer header="დამატებითი ინფორმაცია" className={classes.main}>
      <div className={classes.content}>
        <div className={classes.layers}>
          <MapHeaders
            selectedLayer={selectedLayer}
            handleSelected={handleSelected}
            selectedChart={selectedChart}
            layer="info"
          />
        </div>
        {dataChart.length > 0 &&
          activeLayers.length > 0 &&
          info &&
          info[1]?.info && <p className={classes.infoText}>{info[1].info}</p>}
      </div>
    </DraggableContainer>
  );
};

export default Info;
