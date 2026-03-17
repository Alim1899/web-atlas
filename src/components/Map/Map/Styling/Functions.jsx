import { pieDoubleSvg,pieSvg } from "./StylesForLayer/symbols.js";
import { halfCircleSvg } from "./StylesForLayer/symbols.js";
import L from "leaflet";
export const addDoublePieMarker = ({
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
export const addHalfMarker = ({
  layer,
  center,
  oldValue,
  newValue,
  color_old,
  color_new,
  year_old,
  year_new,
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
      year_old,
      year_new,
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

 export const addPieMarker = ({ layer, center, values, colors, size = 70 }) => {

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