import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import classes from "./Map.module.css";
import JsonProvider from "./JsonProvider";
import useMaps from "../../Context/MapContext/useMaps";

function Map() {
  const center = [41.42, 44.38];
  const { state } = useMaps();
  const { baselayer } = state;
  const { url, attribution } = baselayer;
  return (
    <div className={classes.main}>
      <div className={classes.shape}>
        <MapContainer
          center={center}
          zoom={10.2}
          zoomControl={false}
          style={{ height: "100%", width: "100%" }}
        >
          <ZoomControl position="bottomright" />
          <TileLayer attribution={attribution} url={url} maxZoom={20} />

          <JsonProvider />
        </MapContainer>
      </div>
    </div>
  );
}

export default Map;
