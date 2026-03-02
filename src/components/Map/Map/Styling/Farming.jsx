// Farming.js
import { centroid } from "@turf/turf";
import { pieSvg } from "./Symbols";

export function handleFarming({ name, enabled, feature, extra, L, layer }) {

  const addPieMarker = ({ layer, center, values, colors, size = 70 }) => {

    const place = () => {
      if (!layer._map) return;

      if (layer.__farmingMarkers?.length) {
        layer.__farmingMarkers.forEach((m) => m.remove());
      }

      const html = pieSvg({ values, colors, size });

      const icon = L.divIcon({
        className: "farming-icon",
        html,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      });

      const marker = L.marker(center, {
        icon,
        interactive: false,
      }).addTo(layer._map);

      layer.__farmingMarkers = [marker];
    };

    if (layer._map) place();
    else layer.once("add", place);
  };

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

  if (!values.some((v) => Number(v))) return true;

  const c = centroid(feature).geometry.coordinates;
  const center = L.latLng(c[1], c[0]);

  addPieMarker({ layer, center, values, colors });

  layer.once("remove", () => {
    if (layer.__farmingMarkers) {
      layer.__farmingMarkers.forEach((m) => m.remove());
      layer.__farmingMarkers = null;
    }
  });

  return true; // signal handled
}