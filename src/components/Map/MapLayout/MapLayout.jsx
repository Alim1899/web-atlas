import classes from "./MapLayout.module.css";
import Map from "../Map/Map";
import MapList from "../MapList/MapList";
import Sidebar from "../../Sidebar/Sidebar";
const MapLayout = () => {
  return (
    <div className={classes.map}>
      <div className={classes.leftBar}>
        <MapList />
      </div>
      <div className={classes.mapContainer}>
        <Map />
      </div>

      <div className={classes.rightBar}>
        <Sidebar />
      </div>
    </div>
  );
};

export default MapLayout;
