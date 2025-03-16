import classes from "./MapLayout.module.css";
import Map from "../Map/Map";
import MapList from "../MapList/MapList";
import Chart from "../../Chart/Chart";
const MapLayout = () => {
  return (
    <div className={classes.map}>
      <div className={classes.mapList}>
        <MapList />
      </div>
      <Map />
      <Chart />
    </div>
  );
};

export default MapLayout;
