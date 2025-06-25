import L from "leaflet";
import point from "../../../assets/map/point.svg";
import { getColor } from "../../Utils/ColorScales";
export const pointToLayer = (feature, latlng) => {
  if (!latlng) console.error("error:", feature);
  return L.marker(latlng, {
    icon: L.icon({
      iconUrl: point,
      iconSize: [20, 20], // Set width & height (adjust as needed)
      iconAnchor: [10, 10], // Center icon
      popupAnchor: [0, -10], // Adjust popups
    }),
  });
};
export function polygonStyle(feature, layer, id) {
  const color = getColor(id, feature.properties.nameGe);
  console.log(id);
  const foundLayer = layer.find((lyr) => lyr.id === id) || {};
  return {
    fillColor: color,
    weight: foundLayer.weight,
    opacity: 1,
    color: "gray",
    fillOpacity: foundLayer.opacity || 1,
  };
}

export const onEachPolygonFeature = (feature, layer) => {
  if (feature.properties && feature.properties.Zone_) {
    layer.bindPopup(`
      <strong>Zone:</strong> ${feature.properties.Zone_}<br>
      <strong>Type:</strong> ${feature.properties.Agro_tipe}
      `);
  }
};
