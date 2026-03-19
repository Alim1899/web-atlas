// MeritalStatus.js
import { addDoublePieMarker } from "../Functions.jsx";
import centerOfMass from "@turf/center-of-mass";
export function handleMerital({ enabled, feature, extra, L, layer }) {


  if (!enabled) return true;

  const { name_ge } = feature.properties || {};
  if (!name_ge) return true;
  let oldValues = [];
  let newValues = [];
  let colors = [];
    oldValues = [
      extra.married_old,
      extra.unmarried_old,
      extra.divorced_old,
      extra.widowed_old,
      extra.no_info_old,
    ];

    newValues = [
      extra.married_new,
      extra.unmarried_new,
      extra.divorced_new,
      extra.widowed_new,
      extra.no_info_new,
    ];

    colors = [
      extra.color_one,
      extra.color_two,
      extra.color_three,
      extra.color_four,
      extra.color_five,
    ];
  

  if (!oldValues.some((v) => Number(v)) && !newValues.some((v) => Number(v)))
    return true;

const c = centerOfMass(feature).geometry.coordinates
  const center = L.latLng(c[1], c[0]);
  addDoublePieMarker({ layer, center, oldValues, newValues, colors });

  layer.once("remove", () => {
    if (layer.__meritalMarkers) {
      layer.__meritalMarkers.forEach((m) => m.remove());
      layer.__meritalMarkers = null;
    }
  });

  return true;
}
