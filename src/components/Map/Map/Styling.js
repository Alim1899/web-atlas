import L from "leaflet";
import point from "../../../assets/map/point.svg";
import "leaflet-polylinedecorator";
export const pointToLayer = (feature, latlng) => {
  const name = feature.properties.name_en;
   if (!latlng || !Number.isFinite(latlng.lat) || !Number.isFinite(latlng.lng)) {
    console.warn("Invalid latlng", { latlng, feature });
    return null;
  }
  const getIconSize = (size) => {
    if (name === "Hail - total") {
      if (!size) return [[20, 20]];
      if (size < 1) return [10, 10];
      if (size >= 1 && size < 2) return [13, 13];
      if (size >= 2 && size < 3) return [18, 18];
      if (size >= 3 && size < 4) return [23, 23];
      if (size >= 4 && size < 5) return [28, 28];
      if (size >= 5 && size < 7) return [32, 32];
      if (size >= 7) return [38, 38];
    } else if (name === "Hail - 100") {
      if (!size) return [[20, 20]];
      if (size < 1) return [13, 12];
      if (size >= 1 && size < 2) return [19, 19];
      if (size >= 2 && size < 3) return [24, 24];
      if (size >= 3 && size < 4) return [30, 30];
      if (size >= 5) return [38, 38];
    } else {
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

 const sign = feature?.sign;
  const iconSrc = sign ? svgToDataUrl(sign) : point;


  const size = feature.properties?.size;

  const iconSize = getIconSize(size)[0];
 
  const marker = L.marker(latlng, {
    icon: L.divIcon({
      html: `<img src="${iconSrc}" width="${iconSize[0]}" height="${iconSize[1]}" />`,
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



export const onEachPolygonFeature = (feature, layer, enabled = true) => {
  // Always clear previous bindings (important when re-rendering / multiple layers)
  layer.unbindTooltip?.();
  layer.unbindPopup?.();

  if (!enabled) return;

  const { name_ge, index, unicode } = feature.properties || {};
  const txt = name_ge || "";
  const realIndex = unicode || index || 1;

  // your condition (adjust if you want unicode-only etc.)
  if (name_ge != null && index != null) {
    layer.bindTooltip(
      `<div style="
        font-weight:900;
        height:20px;
        width:20px;
        text-align:center;
        background-color:unset;
        border:none;
        outline: none
      ">${realIndex}</div>`,
      {
        permanent: true,
        direction: "center",
        opacity: 0.9,
      }
    );

    layer.bindPopup(`<strong>${realIndex}. ${txt}</strong>`);
  }

  layer.on("tooltipopen", (e) => {
    const el = e.tooltip?.getElement?.();
    if (!el) return;
    el.style.background = "transparent";
    el.style.border = "none";
    el.style.padding = "0";
    el.style.margin = "0";
  });
};

export const onEachPointFeature = (feature, layer, enabled = true) => {
 

  if (!enabled) return;
  const { name_ge, name, index, unicode, type_ge } = feature.properties || {};
  const title = name_ge || name || "";
  const realIndex = unicode ?? index; // keep undefined if missing

  // Tooltip (only if we have something to show)
  if (realIndex != null) {
    layer.bindTooltip(
      `<div style="
        font-weight:900;
        height:20px;
        min-width:20px;
        padding:0 4px;
        display:flex;
        align-items:center;
        justify-content:center;
        background:transparent;
        border:none;
        outline:none;
      ">${realIndex}</div>`,
      {
        permanent: true,          // if you want always visible
        direction: "top",
        offset: [0, -10],         // move it above the marker
        opacity: 0.95,
        interactive: false,
      }
    );
  }

  // Popup on click
  if (title || realIndex != null) {
    const head = realIndex != null ? `${realIndex}. ` : "";
    layer.bindPopup(`<strong>${head}${title} - ${type_ge}</strong>`);
  }

  // Same styling cleanup
  layer.on("tooltipopen", (e) => {
    const el = e.tooltip?.getElement?.();
    if (!el) return;
    el.style.background = "transparent";
    el.style.border = "none";
    el.style.padding = "0";
    el.style.margin = "0";
    el.style.boxShadow = "none";
  });
};
