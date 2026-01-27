import L from "leaflet";

export const pointToLayer = (feature, latlng) => {
  if (!latlng) console.error("error:", feature);

  return L.marker(latlng, {
    icon: L.divIcon({
      html: feature.sign, // inline SVG markup
      className: "", //Important for avoid white background
      iconSize: [40, 40],
      iconAnchor: [10, 10],
      popupAnchor: [0, -10],
    }),
  });
};
export const lineToLayer = (feature, activeLayers, layerId) => {
  const isActive = activeLayers.some((l) => l.id === layerId);
  return {
    color: feature.properties?.color || "#ff7800",
    weight: isActive ? 4 : 2,
    opacity: isActive ? 1 : 0.4,

    lineCap: "dashed",
    lineJoin: "dashed",
    dashArray: "5,10",
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
