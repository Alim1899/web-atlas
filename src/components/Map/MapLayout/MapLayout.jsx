import classes from "./MapLayout.module.css";
import Map from "../Map/Map";
import MapList from "../MapList/MapList";
import Sidebar from "../../Sidebar/Sidebar";
import useMaps from "../../Context/MapContext/useMaps";
import PrintPanel from "../../Print/PrintPanel";
import PrintHeader from "../../Print/PrintHeader";

const MapLayout = () => {
  const { state } = useMaps();
  const { printMode } = state;

  return (
    <div
      id={printMode ? "print-sheet" : undefined}
      className={printMode ? classes.printLayout : classes.map}
    >
      {printMode ? (
        <PrintHeader />
      ) : (
        <div className={classes.leftBar}>
          <MapList />
        </div>
      )}

      {/* იგივე div ორივე რეჟიმში → რუკა თავიდან არ იქმნება */}
      <div className={printMode ? classes.printMap : classes.mapContainer}>
        <Map />
      </div>

      {printMode ? (
        <PrintPanel />
      ) : (
        <div className={classes.rightBar}>
          <Sidebar />
        </div>
      )}
    </div>
  );
};

export default MapLayout;