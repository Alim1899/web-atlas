import { addTextMarker, getTextMarkerHTML,addPieWithCleanup } from "../AddMarker.jsx";
import { pointOnFeature } from "@turf/turf";
export function Settlement({ name, enabled, feature, extra, L, layer }) {
  if (!enabled) return true;

  const { name_ge } = feature.properties || {};
const c = pointOnFeature(feature).geometry.coordinates;
  const center = L.latLng(c[1], c[0]);

  const colors = [extra.color_one, extra.color_two];

  // 🔹 helper for text marker
  const addText = (anchor = [20, 20]) => {
    addTextMarker({
      layer,
      center,
      html: getTextMarkerHTML(name_ge, 10),
      iconAnchor: anchor,
    });
  };

  // 🔹 CASES
  if (name === "density") {
    addText([20, 20]);
    return true;
  }

  if (name === "pplcount") {
    addText([20, 70]);

    if (!name_ge) return true;

    const values = [extra.size_old, extra.size_new];

    addPieWithCleanup({ layer, center, values, colors });
    return true;
  }

  if (name === "migrantscount") {
    addText([20, 70]);

    if (!name_ge) return true;

    const values = [extra.conflict, extra.natural];

    addPieWithCleanup({ layer, center, values, colors });
    return true;
  }

  return true;
}