import { MapContainer, TileLayer, ZoomControl, Pane, ScaleControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import classes from "./Map.module.css";
import JsonProvider from "./JsonProvider";
import useMaps from "../../Context/MapContext/useMaps";
import ContextLayers from "./BaseMap/ContextLayers";
import PlaceLabels from "./BaseMap/PlaceLabels/PlaceLabels";
import { layerTypes } from "../MapList/Categories";
import BasemapSwitcher from "./BaseMap/BasemapSwitcher/BasemapSwitcher";
import PrintButton from "../../Print/PrintButton";

function Map() {
  const { state } = useMaps();
  const { activeLayers, baselayer, printMode } = state;
const hasPolygon = printMode
  ? layerTypes[activeLayers.at(-1)?.id] === "polygon"
  : activeLayers.some((l) => layerTypes[l.id] === "polygon");
  const {
    url,
    attribution,
    subdomains = "abc",
    labels,
    maxZoom = 20,
  } = baselayer;
  const showLabels = labels && activeLayers?.length === 0;

  return (
    <div className={classes.main}>
      <div className={classes.shape}>
        <MapContainer
          center={[41.52, 44.48]}
          zoom={9.8}
          zoomControl={false}
          style={{ height: "100%", width: "100%" }}
        >
       
          <ZoomControl position="bottomright" />
          {printMode && <ScaleControl position="bottomright" imperial={false} />}
          <TileLayer
            key={url}
            url={url}
            attribution={attribution}
            subdomains={subdomains}
            maxZoom={maxZoom}
            crossOrigin="anonymous"
          />

          <JsonProvider />

          {showLabels && (
            <Pane name="labels" style={{ zIndex: 430, pointerEvents: "none" }}>
              <TileLayer
                key={labels}
                url={labels}
                subdomains="abcd"
                maxZoom={maxZoom}
                crossOrigin="anonymous"
              />
            </Pane>
          )}
          <Pane name="context" style={{ zIndex: 450, pointerEvents: "none" }}>
            <ContextLayers />
          </Pane>
          {!hasPolygon && (
            <Pane
              name="placeLabels"
              style={{ zIndex: 460, pointerEvents: "none" }}
            >
              <PlaceLabels />
            </Pane>
          )}
        </MapContainer>
        <BasemapSwitcher />
        <PrintButton />
      </div>
    </div>
  );
}

export default Map;