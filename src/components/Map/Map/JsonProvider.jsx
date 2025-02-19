import { GeoJSON } from "react-leaflet";
// import agroclimateJSON from "../data/json/agro.json";
// import geologyJSON from "../data/json/geology.json";
// import rockfallJSON from "../data/json/rockfall.json";
// import riversJSON from "../data/json/rivers.json";
import L from "leaflet";
import point from "../../../assets/map/point.svg";
import { useMaps } from "../MapContext/MapContext";
export default function JsonProvider() {
  const { state } = useMaps();
  const { rockfall, rivers, geology, agroclimate, opacity, weight } = state;
  const rockfallJSON = Object.entries(rockfall);
  const riversJSON = Object.entries(rivers);
  const geologyJSON = Object.entries(geology);
  const agroclimateJSON = Object.entries(agroclimate);
  const customIcon = L.icon({
    iconUrl: point, // Example icon URL
    iconSize: [25, 21],
    iconAnchor: [12, 21],
    popupAnchor: [1, -34],
  });
  function polygonStyle(feature) {
    let color;
    if (feature.name === "geology") {
      let lyr = feature.properties.Index_;
      color =
        lyr === "K"
          ? "#feedde"
          : lyr === "Q"
          ? "#fdd0a2"
          : lyr === "yPz"
          ? "#fdae6b"
          : lyr === "J"
          ? "#fd8d3c"
          : lyr === "P"
          ? "#f16913"
          : lyr === "PR+Pz1"
          ? "#d94801"
          : lyr === "N"
          ? "#fff5eb"
          : "#8c2d04";
    } else if (feature.name === "agro") {
      const zone = feature.properties.zone;
      if (zone === "Cold") {
        color = "#ffffcc";
      } else if (zone === "mid_cold") {
        color = "#c2e699";
      } else if (zone === "moderate") {
        color = "#78c679";
      } else {
        color = "#238443";
      }
    }

    return {
      fillColor: color,
      weight: weight / 100,
      opacity: opacity / 100,
      color: "black",
      fillOpacity: opacity / 100,
    };
  }
  const onEachPolygonFeature = (feature, layer) => {
    if (feature.properties && feature.properties.Zone_) {
      layer.bindPopup(`
        <strong>Zone:</strong> ${feature.properties.Zone_}<br>
        <strong>Type:</strong> ${feature.properties.Agro_tipe}
        `);
    }
  };
  const pointToLayer = (feature) => {
    const coordinates = feature.geometry.coordinates;
    const latlng = [coordinates[1], coordinates[0]];
    return L.marker(latlng, { icon: customIcon });
  };
  const onEachPointFeature = (feature, layer) => {
    if (feature.properties) {
      layer.bindPopup(`<b>კლდეზვავი</b>`);
    }
  };

  return (
    <>
      {rockfallJSON.length > 0 && (
        <GeoJSON
          data={rockfall.features || []}
          onEachFeature={onEachPointFeature}
          pointToLayer={pointToLayer}
        ></GeoJSON>
      )}

      {agroclimateJSON.length > 0 && (
        <GeoJSON
          data={agroclimate.features}
          style={polygonStyle}
          onEachFeature={onEachPolygonFeature}
        ></GeoJSON>
      )}
      {geologyJSON.length > 0 && (
        <GeoJSON
          data={geology.features}
          style={polygonStyle}
          onEachFeature={onEachPolygonFeature}
        ></GeoJSON>
      )}
      {riversJSON.length > 0 && <GeoJSON data={rivers.features}></GeoJSON>}
    </>
  );
}
