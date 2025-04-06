import L from "leaflet";
import point from "../../../assets/map/point.svg";
import * as d3 from "d3";

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
  const geologyScale = d3
    .scaleOrdinal()
    .domain(["K", "Q", "yPz", "J", "P", "PR+Pz1", "N"])
    .range(d3.schemeOranges[7]);

  const agroScale = d3
    .scaleOrdinal()
    .domain(["Cold", "mid_cold", "moderate", "warm"])
    .range(d3.schemeGreens[8].slice(2));

  const vegetationScale = d3
    .scaleOrdinal()
    .domain([
      "East Georgian lowland, downhill and superior plateau vegetation",
      "Mountainous forest plants Broadleaf forests",
      "High Mountain vegetation",
      "Steppe vegetation of south Georgian mountains",
      "Bright Coniferous forests",
    ])
    .range(d3.schemeBrBG[9].slice(1));
  let color;
  if (feature.name === "geology") {
    const lyr = feature.properties.layerName;
    color = geologyScale(lyr) || "#abccba";
  } else if (feature.name === "agro") {
    const zone = feature.properties.layerName;
    color = agroScale(zone) || "#443";
  } else if (feature.name === "vegetation") {
    const zone = feature.properties.layerName;
    color = vegetationScale(zone) || "#238443";
  }

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
