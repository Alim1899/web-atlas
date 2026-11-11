import { farmingConfig } from "./farmingConfig.jsx";
import { addTextMarker, getTextMarkerHTML, addPieWithCleanup } from "../AddMarker.jsx";
import { symbolAnchor, attachLeaderLine } from "../../../data/symbolPositions";

export function handleFarming({ name, enabled, feature, extra, L, layer }) {
  if (!enabled) return true;

  const { name_ge } = feature.properties || {};
  if (!name_ge) return true;

  const config = farmingConfig[name];
  if (!config) return true;

  const values = config.getValues(extra);
  const colors = config.getColors(extra);
  if (!values.some((v) => Number(v))) return true;

  // ადგილი: SYMBOL_POSITIONS ან შიდა წერტილი (+ გამყვანი ხაზი)
  const a = symbolAnchor(feature);
  const center = L.latLng(a.lat, a.lng);
  attachLeaderLine(layer, a);

  addTextMarker({
    layer,
    center,
    html: getTextMarkerHTML(name_ge, 10),
    iconAnchor: [20, 70],
  });

  addPieWithCleanup({ layer, center, values, colors });

  return true;
}