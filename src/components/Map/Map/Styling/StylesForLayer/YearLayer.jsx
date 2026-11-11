import L from "leaflet";
import { pointOnFeature } from "@turf/turf";

// წლების / წარწერების ფენები: popup + მუნიციპალიტეტის სახელი
// (cfg.labelValue — სახელის ქვეშ მნიშვნელობა, მაგ. სიმჭიდროვე)
export function addYearLayer({ cfg, feature, layer, enabled }) {
  const p = feature.properties || {};
  layer.unbindPopup?.();
  if (cfg.popup) layer.bindPopup(cfg.popup(p));
  if (!enabled || !p.name_ge) return;

  const value = cfg.labelValue
    ? `<div style="font-size:11px;font-weight:600;opacity:.9">${cfg.labelValue(p)}</div>`
    : "";

  const [lng, lat] = pointOnFeature(feature).geometry.coordinates;
  const html = `<div style="transform:translate(-50%,-50%);white-space:nowrap;text-align:center;
    font-size:12px;font-weight:700;color:var(--background-color);line-height:1.25;
    text-shadow:0 0 3px #fff,0 0 3px #fff,0 0 2px #fff;pointer-events:none">${p.name_ge}${value}</div>`;

  const place = () => {
    if (!layer._map) return;
    layer.__nameMarker?.remove();
    layer.__nameMarker = L.marker(L.latLng(lat, lng), {
      icon: L.divIcon({ className: "", html, iconSize: [0, 0] }),
      interactive: false,
      keyboard: false,
    }).addTo(layer._map);
  };

  if (layer._map) place();
  else layer.once("add", place);

  layer.once("remove", () => {
    layer.__nameMarker?.remove();
    layer.__nameMarker = null;
  });
}

// ფენის მიმდინარე წელი (ნაგულისხმევად — ბოლო)
export const getLayerYear = (cfg, layerYear, id) => {
  if (!cfg?.years) return null;
  const key = layerYear?.[id] ?? cfg.years.at(-1).key;
  return cfg.years.find((y) => y.key === key) ?? cfg.years.at(-1);
};