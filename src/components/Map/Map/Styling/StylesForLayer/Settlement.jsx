import centerOfMass from "@turf/center-of-mass";
import { addPieMarker } from "../Functions.jsx";
export function Settlement({ name, enabled, feature, extra, L, layer }) {
  if (!enabled) return true;
const oldValue = extra.size_old;
  const newValue = extra.size_new;
const values = [oldValue,newValue]
  const color_old = extra.color_one;
  const color_new = extra.color_two;
  const colors = [color_old,color_new]
  const { name_ge, density } = feature.properties || {};
  const c = centerOfMass(feature).geometry.coordinates;
  const center = L.latLng(c[1], c[0]);

  if (name === "density") {
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
    ${name_ge || "-"} ${density || ""}
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
  } else if (name === "pplcount") {
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
      <svg width="12" height="12" viewBox="0 0 36 36" fill="currentColor">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5
        c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12
        2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    </span>
    ${name_ge || "-"} ${density || ""}
  </div>
`,
        iconSize: [120, 40],
        iconAnchor: [30, 50],
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
     if (!name_ge) return true;
 
  addPieMarker({
    layer,
    center,
    values,
    colors
  })
    layer.once("remove", () => {
    if (layer.__farmingMarkers) {
      layer.__farmingMarkers.forEach((m) => m.remove());
      layer.__farmingMarkers = null;
    }
  });
}
return true; 
   
}
