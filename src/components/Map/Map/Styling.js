import L from "leaflet";
import point from "../../../assets/map/point.svg";

export const pointToLayer = (feature, latlng) => {
  if (!latlng) console.error("error:", feature);

  const iconHtml = feature.sign
    ? feature.sign // inline SVG string
    : `<img src="${point}" width="24" height="24" />`; // fallback file
  return L.marker(latlng, {
    icon: L.divIcon({
      html: iconHtml,
      className: "", // removes default leaflet styles
      iconSize: [20, 40],
      iconAnchor: [12, 12],
      popupAnchor: [0, -10],
    }),
  });
};
export const lineToLayer = (feature,) => {
  return {
    color: feature.properties?.color || "#ff7800",
    weight: 1,
    opacity: 1,

  
  };
};

export function polygonStyle(featre, layer, id, fillColor) {
  const foundLayer = layer.find((lyr) => lyr.id === id) || {};
  return {
    fillColor: fillColor,
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
