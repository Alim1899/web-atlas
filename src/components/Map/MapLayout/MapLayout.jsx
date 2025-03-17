import classes from "./MapLayout.module.css";
import Map from "../Map/Map";
import MapList from "../MapList/MapList";
import Sidebar from "../../Sidebar/Sidebar";
const MapLayout = () => {
  return (
    <div className={classes.map}>
      <div className={classes.mapList}>
        <MapList />
      </div>
      <Map />
      <Sidebar />
    </div>
  );
};

export default MapLayout;
