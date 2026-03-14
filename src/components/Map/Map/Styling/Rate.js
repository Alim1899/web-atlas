// MeritalStatus.js
import { halfCircleSvg } from "./symbols.js";
import centerOfMass from "@turf/center-of-mass";

export function Rate({ enabled, feature, extra, L, layer }) {

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

  const { name_ge } = feature.properties || {};
  if (!name_ge) return true;

  const oldValue = extra.rate_one;
  const newValue = extra.rate_two;

  const color_old = extra.color_one;
  const color_new = extra.color_two;

  const c = centerOfMass(feature).geometry.coordinates;
  const center = L.latLng(c[1], c[0]);

  addHalfMarker({
    layer,
    center,
    oldValue,
    newValue,
    color_old,
    color_new
  });

  layer.once("remove", () => {
    if (layer.__rateMarkers) {
      layer.__rateMarkers.forEach((m) => m.remove());
      layer.__rateMarkers = null;
    }
  });

  return true;
}
