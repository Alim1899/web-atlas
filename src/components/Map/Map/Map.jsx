import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import maps from "../data/layers";
import "leaflet/dist/leaflet.css";
import classes from "./Map.module.css";
import JsonProvider from "./JsonProvider";
function Map() {
  const center = [41.52, 44.48];

  return (
    <div className={classes.main}>
      <div className={classes.shape}>
        <MapContainer
          center={center}
          zoom={9}
          zoomControl={false}
          style={{ height: "100%", width: "100%" }}
        >
          <ZoomControl position="topright" />
          <TileLayer
            attribution={maps.maptiler.attribution}
            url={maps.maptiler.url}
            maxZoom={20}
          />

          <JsonProvider />
        </MapContainer>
      </div>
    </div>
  );
}

export default Map;
