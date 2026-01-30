import L from "leaflet";
import point from "../../../assets/map/point.svg";
import "leaflet-polylinedecorator";

export const pointToLayer = (feature, latlng) => {
  if (!latlng) console.error("error:", feature);
  const iconHtml = feature.sign
    ? feature.sign // inline SVG string
    : `<img src="${point}" width="24" height="24" />`; // fallback file
  return L.marker(latlng, {
    icon: L.divIcon({
      html: iconHtml,
      className: "",
      iconSize: [20, 40],
      iconAnchor: [12, 12],
      popupAnchor: [0, -10],
    }),
  });
};
export const lineToLayer = (feature) => {
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

export const onEachLine = (feature, layer, map) => {
  const tickSvg = `
<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
  <line
    x1="0" y1="0"
    x2="60" y2="10"
       stroke="${feature.properties.color}"
    stroke-width="2"
    
  />
</svg>
`;
  const icon = L.Symbol.marker({
    rotate: true,
    markerOptions: {
      icon: L.divIcon({
        className: "tick-line",
        iconSize: [10, 10],
        iconAnchor: [1,2],
        html: `
          <div style="color:#2f6fd6">
            ${tickSvg}
          </div>
        `,
      }),
    },
  });

const name = feature.properties.name_en;
if (name==="Dry Gully") return;
  if (!map) return;
  if (
    feature.geometry.type !== "LineString" &&
    feature.geometry.type !== "MultiLineString"
  )
    return;

  const decorator = L.polylineDecorator(layer, {
    patterns: [
      {
        offset: 0,
        repeat: 20,
        symbol: icon,
      },
    ],
  }).addTo(map);

  layer.on("remove", () => {
    map.removeLayer(decorator);
  });
};

export const onEachPolygonFeature = (feature, layer) => {
  if (feature.properties && feature.properties.Zone_) {
    layer.bindPopup(`
      <strong>Zone:</strong> ${feature.properties.Zone_}<br>
      <strong>Type:</strong> ${feature.properties.Agro_tipe}
      `);
  }
};
