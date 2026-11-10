import L from "leaflet";
import point from "../../../../assets/map/point.svg";
import "leaflet-polylinedecorator";
import { handleFarming } from "./StylesForLayer/Farming";
import { handleMerital } from "./StylesForLayer/Merital";
import { Rate } from "./StylesForLayer/Rate";
import { Settlement } from "./StylesForLayer/Settlement";
import { getIconSize } from "./Functions";
import { layerConfig, getClass } from "../../data/layerConfig";
import { addBarChart } from "./StylesForLayer/Barchart";
import { addWheelChart } from "./StylesForLayer/WheelChart";

// ||||||||     POLYGON     ||||||||||||||||||||||

export function polygonStyle(feature, layers, id, fillColor) {
  const foundLayer = layers.find((lyr) => lyr.id === id) || {};
  return {
    fillColor: fillColor || "lightblue",
    weight: foundLayer.weight,
    opacity: 1,
    color: "#be6d09d7",
    fillOpacity: foundLayer.opacity || 1,
  };
}

export const onEachPolygonFeature = (feature, layer, enabled = true, name) => {
  const extra = feature.properties;
  const cfg = layerConfig[name];
  if (cfg?.chart) {
    layer.unbindPopup?.();
    if (cfg.popup) layer.bindPopup(cfg.popup(feature.properties || {}));
    if (cfg.chart.type === "wheel")
      addWheelChart({ cfg, feature, layer, enabled });
    else addBarChart({ cfg, feature, layer, enabled });
    return;
  }
  if (
    [
      "ownership",
      "status",
      "agroforms",
      "beneficiars",
      "ethnicity",
      "religy",
    ].includes(name)
  ) {
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
  } else if (["density", "pplcount", "migrantscount"].includes(name)) {
    const handled = Settlement({ name, enabled, feature, extra, L, layer });
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

// ||||||||     POINTS     ||||||||||||||||||||||
export const onEachPointFeature = (
  feature,
  layer,
  layerName,
  enabled = true,
) => {
  if (!enabled) return;
  const cfg = layerConfig[layerName];
  if (cfg?.popup) {
    layer.bindPopup(cfg.popup(feature.properties || {}));
    return;
  }

  if (["ecomigrants", "villages", "warmigrants"].includes(layerName)) {
    const { name_ge, size, location_ge, type_ge } = feature.properties || {};
    layer.bindPopup(
      layerName === "villages"
        ? `<strong>${type_ge} ${name_ge}, ${location_ge} - ${size} მოსახლე</strong>`
        : `<strong> ${name_ge}, ${location_ge} </strong>`,
    );
  } else if (
    ["anthrax", "anthrax_humans", "anthrax_animals"].includes(layerName)
  ) {
    const { name_ge, location_ge, type_en } = feature.properties || {};
    layer.bindPopup(
      layerName === "anthrax"
        ? `<strong>ჯილეხის კერა ნიადაგში</strong>`
        : layerName === "anthrax_animals"
          ? `<strong>${name_ge}, ${location_ge} - ${type_en}</strong>`
          : `<strong>${name_ge} - ${type_en}</strong>`,
    );
  } else {
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
      console.log("l");
      const el = e.tooltip?.getElement?.();
      if (!el) return;
      el.style.background = "transparent";
      el.style.border = "none";
      el.style.padding = "0";
      el.style.margin = "0";
      el.style.boxShadow = "none";
    });
  }
};

export const pointToLayer = (feature, latlng, layerName) => {
  if (!latlng || !Number.isFinite(latlng.lat) || !Number.isFinite(latlng.lng)) {
    console.warn("Invalid latlng", { latlng, feature });
    return null;
  }

  const {
    name_en: name,
    type_en: type,
    power,
    size,
  } = feature.properties || {};
  const sign = feature.sign;
  const iconSrc = sign
    ? `data:image/svg+xml;utf8,${encodeURIComponent(sign)}`
    : point;

  const cfg = layerConfig[layerName];
  const cls = cfg && getClass(cfg, feature.properties);
  const [w, h] = cls
    ? [cls.size, cls.size]
    : getIconSize(power ?? size, type, layerName, name);
  return L.marker(latlng, {
    icon: L.divIcon({
      html: `<img src="${iconSrc}" width="${w}" height="${h}" />`,
      iconSize: [w, h],
      iconAnchor: [w / 2, h / 2],
      popupAnchor: [0, -h / 2],
      className: "",
    }),
  });
};

// |||||||||||||  LINE   |||||||||||||||||
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
export const lineToLayer = (feature) => {
  return {
    color: feature.properties?.color || "#ff7800",
    weight: 1,
    opacity: 1,
  };
};
