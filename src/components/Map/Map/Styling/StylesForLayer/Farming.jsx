// Farming.js
import { centroid } from "@turf/turf";
import { addPieMarker } from "../Functions.jsx";
export function handleFarming({ name, enabled, feature, extra, L, layer }) {

  if (!enabled) return true;

  const { name_ge } = feature.properties || {};
  if (!name_ge) return true;

  let values = [];
  let colors = [];

  if (name === "status") {
    values = [extra.legal_farm, extra.household_farm];
    colors = [extra.color_one, extra.color_two];
  }

  if (name === "ownership") {
    values = [extra.private_owner, extra.state_owner];
    colors = [extra.color_one, extra.color_two];
  }

  if (name === "agroforms") {
    values = [
      extra.natural,
      extra.arable,
      extra.greenhouse,
      extra.parennial,
    ];
    colors = [
      extra.color_one,
      extra.color_two,
      extra.color_three,
      extra.color_four,
    ];
  }
    if (name === "beneficiars") {
    values = [
      extra.agro_credit,
      extra.agro_insurance,
      extra.plant_future,
    
    ];
    colors = [
      extra.color_one,
      extra.color_two,
      extra.color_three,
    ];
  }

  if (!values.some((v) => Number(v))) return true;

  const c = centroid(feature).geometry.coordinates;
  const center = L.latLng(c[1], c[0]);
console.log(values,colors);
  addPieMarker({ layer, center, values, colors });

  layer.once("remove", () => {
    if (layer.__farmingMarkers) {
      layer.__farmingMarkers.forEach((m) => m.remove());
      layer.__farmingMarkers = null;
    }
  });

  return true; // signal handled
}