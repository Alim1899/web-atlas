import L from "leaflet";
import point from "../../../assets/map/point.svg";
const zones = [];
function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
}
export const pointToLayer = (feature, latlng) => {
  if (!latlng) console.log("error:", feature);
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
    color =
      zone === "Cold"
        ? "#ffffcc"
        : zone === "mid_cold"
        ? "#c2e699"
        : zone === "moderate"
        ? "#78c679"
        : "#238443";
  } else {
    const zone = feature.properties.vegetation;
    zones.push(zone);
    const uniqueZones = zones.filter(
      (item, index) => zones.indexOf(item) === index
    );

    console.log(uniqueZones);
    color =
      zone === "East Georgian lowland, downhill and superior plateau vegetation"
        ? "#abc"
        : zone === "Mountainous forest plants Broadleaf forests"
        ? "#c2e699"
        : zone === "High Mountain vegetation"
        ? "#78c679"
        : zone === "Steppe vegetation of south Georgian mountains"
        ? "#c2e699"
        : zone === "Bright Coniferous forests"
        ? "#abcccc"
        : "#238443";
  }

  return {
    fillColor: color,
    weight: layer.find((lyr) => lyr.id === id).weight,
    opacity: 1,
    color: "black",
    fillOpacity: layer.find((lyr) => lyr.id === id).opacity,
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
