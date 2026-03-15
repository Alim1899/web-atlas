// MeritalStatus.js
import { halfCircleSvg } from "./symbols.js";
import centerOfMass from "@turf/center-of-mass";

export function Rate({ name, enabled, feature, extra, L, layer }) {
  const addHalfMarker = ({
    layer,
    center,
    oldValue,
    newValue,
    color_old,
    color_new,
    size = 120,
  }) => {
    const place = () => {
      if (!layer._map) return;

      // remove old markers
      if (layer.__rateMarkers?.length) {
        layer.__rateMarkers.forEach((m) => m.remove());
      }

      const html = halfCircleSvg({
        oldValue,
        newValue,
        color_old,
        color_new,
        size,
      });

      const icon = L.divIcon({
        className: "rate-icon",
        html,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      });

      const marker = L.marker(center, {
        icon,
        interactive: false,
      }).addTo(layer._map);

      layer.__rateMarkers = [marker];
    };

    if (layer._map) place();
    else layer.once("add", place);
  };
  if (!enabled) return true;

  const { name_ge, type_en } = feature.properties || {};
  if (!name_ge) return true;
  const c = centerOfMass(feature).geometry.coordinates;
  const center = L.latLng(c[1], c[0]);
  if (name === "pplchange") {
    const place = () => {
      if (!layer._map) return;

      if (layer.__rateMarkers?.length) {
        layer.__rateMarkers.forEach((m) => m.remove());
      }
      const icon = L.divIcon({
        className: "rate-text-icon",
        html: `
  <div class="rate-text">
    <span class="rate-icon">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5
        c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12
        2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    </span>
    ${name_ge || "-"} ${type_en || ""}
  </div>
`,
        iconSize: [120, 40],
        iconAnchor: [60, 20],
      });

      const marker = L.marker(center, {
        icon,
        interactive: false,
      }).addTo(layer._map);

      layer.__rateMarkers = [marker];
    };
    if (layer._map) place();
    else layer.once("add", place);

    layer.once("remove", () => {
      if (layer.__rateMarkers) {
        layer.__rateMarkers.forEach((m) => m.remove());
        layer.__rateMarkers = null;
      }
    });

    return true;
  }
  const oldValue = extra.rate_one;
  const newValue = extra.rate_two;

  const color_old = extra.color_one;
  const color_new = extra.color_two;

  addHalfMarker({
    layer,
    center,
    oldValue,
    newValue,
    color_old,
    color_new,
  });

  layer.once("remove", () => {
    if (layer.__rateMarkers) {
      layer.__rateMarkers.forEach((m) => m.remove());
      layer.__rateMarkers = null;
    }
  });

  return true;
}
