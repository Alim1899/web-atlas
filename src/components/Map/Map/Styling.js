import L from "leaflet";
import point from "../../../assets/map/point.svg";
import "leaflet-polylinedecorator";

export const pointToLayer = (feature, latlng) => {
const name = feature.properties.name_en;
  const getIconSize = (size) => {
    if(name==='Hail - total'){    
    if (!size) return [[20, 20]];
    if (size < 1) return [10, 10];
    if (size >= 1 && size < 2) return [13, 13];
    if (size >= 2 && size < 3) return [18, 18];
    if (size >= 3 && size < 4) return [23, 23];
    if (size >= 4 && size < 5) return [28, 28];
     if (size >= 5 && size < 7) return [32, 32];
    if (size >= 7) return [38, 38];
    }else  if(name==='Hail - 100'){    
    if (!size) return [[20, 20]];
    if (size < 1) return [13, 12];
    if (size >= 1 && size < 2) return [19, 19];
    if (size >= 2 && size < 3) return [24, 24];
    if (size >= 3 && size < 4) return [30, 30];
    if (size >= 5) return [38, 38];
    } else{
      if (!size) return [[20, 20]];
    if (size < 3) return [11, 11];
    if (size >= 3 && size < 4) return [17, 17];
    if (size >= 4 && size < 5) return [23, 23];
    if (size >= 5 && size < 6) return [29, 29];
    if (size >= 6) return [35, 35];
    }
    

    return [40, 40]; // fallback
  };
  const svgToDataUrl = (svg) =>
    `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  const size = feature.properties?.size;

  const iconSize = getIconSize(size);

  const iconSrc = feature.sign ? svgToDataUrl(feature.sign) : point;
  const marker = L.marker(latlng, {
    
    icon: L.divIcon({
      html: `<img src="${iconSrc}" width="${iconSize[0][0]}" height="${iconSize[0][1]}" />`,
      iconSize: iconSize,
      iconAnchor: [10, 10],
      popupAnchor: [0, -10],
      className: "",
    }),
  });

  return marker;
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
        iconAnchor: [1, 2],
        html: `
          <div style="color:#2f6fd6">
            ${tickSvg}
          </div>
        `,
      }),
    },
  });

  const name = feature.properties.name_en;
  if (name === "Dry Gully") return;
  if (name === "Foults") return;
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
  console.log(feature,layer);
  if (feature.properties && feature.properties.Zone_) {
    layer.bindPopup(`
      <strong>Zone:</strong> ${feature.properties.Zone_}<br>
      <strong>Type:</strong> ${feature.properties.Agro_tipe}
      `);
  }
};
