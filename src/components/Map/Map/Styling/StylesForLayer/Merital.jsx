// MeritalStatus.js
import { pieDoubleSvg } from "./symbols.js";
import centerOfMass from "@turf/center-of-mass";
export function handleMerital({ enabled, feature, extra, L, layer }) {
  const addPieMarker = ({
    layer,
    center,
    oldValues,
    newValues,
    colors,
    size = 80,
  }) => {
    const place = () => {
      if (!layer._map) return;

      if (layer.__meritalMarkers?.length) {
        layer.__meritalMarkers.forEach((m) => m.remove());
      }

      const html = pieDoubleSvg({
        oldValues,
        newValues,
        colors,
        size,
      });

      const icon = L.divIcon({
        className: "merital-icon",
        html,
        iconSize: [size * 4, size * 4],
        iconAnchor: [size / 4, size / 2],
      });

      const marker = L.marker(center, {
        icon,
        interactive: false,
      }).addTo(layer._map);

      layer.__meritalMarkers = [marker];
    };

    if (layer._map) place();
    else layer.once("add", place);
  };

  if (!enabled) return true;

  const { name_ge } = feature.properties || {};
  if (!name_ge) return true;
console.log(extra);
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

  addPieMarker({ layer, center, oldValues, newValues, colors });

  layer.once("remove", () => {
    if (layer.__meritalMarkers) {
      layer.__meritalMarkers.forEach((m) => m.remove());
      layer.__meritalMarkers = null;
    }
  });

  return true;
}
