import { pointOnFeature } from "@turf/turf";
import { farmingConfig } from "./farmingConfig.jsx";
import { addTextMarker, getTextMarkerHTML,addPieWithCleanup } from "../AddMarker.jsx";

export function handleFarming({ name, enabled, feature, extra, L, layer }) {
  if (!enabled) return true;

  const { name_ge } = feature.properties || {};
  if (!name_ge) return true;

  const config = farmingConfig[name];
  if (!config) return true;
const c = pointOnFeature(feature).geometry.coordinates;

  const values = config.getValues(extra);
  const colors = config.getColors(extra);

  if (!values.some((v) => Number(v))) return true;

  const center = L.latLng(c[1], c[0]);

  // ✅ 1. ADD TEXT MARKER
  addTextMarker({
    layer,
    center,
    html: getTextMarkerHTML(name_ge, 10),
    iconAnchor: [20, 70], // same style as Settlement
  });

  // ✅ 2. ADD PIE MARKER
  addPieWithCleanup({
    layer,
    center,
    values,
    colors,
  });

  return true;
}