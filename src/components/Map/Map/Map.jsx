import { MapContainer, TileLayer, ZoomControl, Pane } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import classes from "./Map.module.css";
import JsonProvider from "./JsonProvider";
import useMaps from "../../Context/MapContext/useMaps";
import BasemapSwitcher from "./BasemapSwitcher/BasemapSwitcher";

function Map() {
  const { state } = useMaps();
  const { activeLayers, baselayer } = state;
  const {
    url,
    attribution,
    subdomains = "abc",
    labels,
    maxZoom = 20,
  } = baselayer;
  const showLabels = labels && activeLayers?.length === 0;
  console.log(showLabels, activeLayers);
  return (
    <div className={classes.main}>
      <div className={classes.shape}>
        <MapContainer
          center={[41.52, 44.38]}
          zoom={9.8}
          zoomControl={false}
          style={{ height: "100%", width: "100%" }}
        >
          <ZoomControl position="bottomright" />
          <TileLayer
            key={url}
            url={url}
            attribution={attribution}
            subdomains={subdomains}
            maxZoom={maxZoom}
          />

          <JsonProvider />

          {showLabels && (
            <Pane name="labels" style={{ zIndex: 430, pointerEvents: "none" }}>
              <TileLayer
                key={labels}
                url={labels}
                subdomains="abcd"
                maxZoom={maxZoom}
              />
            </Pane>
          )}
        </MapContainer>
        <BasemapSwitcher />
      </div>
    </div>
  );
}

export default Map;
