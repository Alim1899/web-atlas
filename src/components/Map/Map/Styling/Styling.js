import L from "leaflet";
import point from "../../../../assets/map/point.svg";
import "leaflet-polylinedecorator";
import { handleFarming } from "./Farming";
import { handleMerital } from "./Merital";
import { Rate } from "./Rate";
export const pointToLayer = (feature, latlng) => {
  const name = feature.properties.name_en;
  const villageName = feature.properties.type_ge;
  const type = feature.properties.type_en;

  const power = feature?.properties.power;
  if (!latlng || !Number.isFinite(latlng.lat) || !Number.isFinite(latlng.lng)) {
    console.warn("Invalid latlng", { latlng, feature });
    return null;
  }
  const getIconSize = (size, type) => {
    if (["სოფელი", "ნასოფლარი", "ქალაქი", "დაბა"].includes(villageName)) {
      console.log(sign);
      if (!size) return [[20, 20]];
      
      if ( size <= 10) return [5, 5];
      if (size >= 11 && size < 100) return [10, 10];
      if (size >= 100 && size < 500) return [15, 15];
      if (size >= 500 && size < 1500) return [22, 22];
      if (size >= 1500 && size < 3000) return [30, 30];
      if (size >= 3000 && size < 5000) return [38, 8];

      if (size >= 5000) return [4, 44];
    }
    if (!type) {
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
    } else if (type === "Hydroelectric power plant") {
      if (!size) return [[20, 20]];
      if (size < 1) return [11, 11];
      if (size >= 1 && size < 5) return [17, 17];
      if (size >= 5 && size < 14) return [23, 23];
      if (size >= 15) return [65, 65];
    }
    if (type === "Thermal power plant") {
      if (!size) return [[20, 20]];
      if (size === 110) return [11, 11];
      if (size >= 230 && size < 270) return [17, 17];
      if (size === 300) return [65, 65];
    }

    return [40, 40]; // fallback
  };

  const svgToDataUrl = (svg) =>
    `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

  const sign = feature?.sign;
  const iconSrc = sign ? svgToDataUrl(sign, type) : point;
  const size = feature.properties?.size;

  const iconSize = getIconSize(power ? power : size, type)[0];
  if (!sign) console.log(feature.properties.type_en);
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

export function polygonStyle(feature, layers, id, fillColor) {
  const foundLayer = layers.find((lyr) => lyr.id === id) || {};
  return {
    fillColor: fillColor || "lightblue",
    weight: foundLayer.weight,
    opacity: 1,
    color: "lightyellow",
    fillOpacity: foundLayer.opacity || 1,
  };
}

export const onEachPolygonFeature = (feature, layer, enabled = true, name) => {
  const extra = feature.properties;

  // ✅ ONLY farming uses symbols logic
  if (["ownership", "status", "agroforms", "beneficiars"].includes(name)) {
    const handled = handleFarming({
      name,
      enabled,
      feature,
      extra,
      L,
      layer,
    });
    if (handled) return;
  } else if (["meritalmen", "meritalwomen"].includes(name)) {
    const handled = handleMerital({
      name,
      enabled,
      feature,
      extra,
      L,
      layer,
    });
    if (handled) return;
  } else if (["birthrate", "deathrate", "pplchange"].includes(name)) {
    const handled = Rate({
      name,
      enabled,
      feature,
      extra,
      L,
      layer,
    });
    if (handled) return;
  }
  {
    layer.unbindTooltip?.();
    layer.unbindPopup?.();

    if (!enabled) return;

    const { name_ge, index, unicode } = feature.properties || {};
    const txt = name_ge || "";
    const realIndex = unicode || index || 1;

    if (name_ge != null && index != null) {
      layer.bindTooltip(
        `<div style="
        font-weight:800;
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
        },
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
  }
};

// ||||||||||||||||||||||||||||||
export const onEachPointFeature = (feature, layer, enabled = true) => {
  if (!enabled) return;
  const { name_ge, name, index, unicode, type_ge, location_ge } =
    feature.properties || {};
  const title = name_ge || name || location_ge;
  const realIndex = unicode ?? index; // keep undefined if missing
  const type = type_ge ?? location_ge ?? "";

  // Popup on click
  if (title || realIndex != null) {
    const head = realIndex != null ? `${realIndex}. ` : "";
    layer.bindPopup(`<strong>${head}${title} - ${type}</strong>`);
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

// ||||||||||||||||||||||||||||||
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
