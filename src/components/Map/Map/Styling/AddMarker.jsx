import { addPieMarker } from "./Functions";
import L from "leaflet";
export const addTextMarker = ({
  layer,
  center,
  html,
  iconSize = [120, 40],
  iconAnchor = [20, 20],
}) => {
  const place = () => {
    if (!layer._map) return;

    // remove old markers
    if (layer.__rateMarkers?.length) {
      layer.__rateMarkers.forEach((m) => m.remove());
    }

    const icon = L.divIcon({
      className: "rate-text-icon",
      html,
      iconSize,
      iconAnchor,
    });
const zoom = layer._map.getZoom();
const offsetLng = 0.0005 / Math.pow(2, zoom - 10);

const shiftedCenter = L.latLng(center.lat, center.lng + offsetLng);
    const marker = L.marker(shiftedCenter, {
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
};

export const getTextMarkerHTML = (name_ge, size = 12) => `
  <div class="rate-text">
    <span class="rate-icon">
      <svg width="${size}" height="${size}" viewBox="0 0 24~ 24" fill="currentColor">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5
        c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12
        2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    </span>
    ${name_ge || "-"}
  </div>
`;

export const addPieWithCleanup = ({ layer, center, values, colors }) => {
  addPieMarker({ layer, center, values, colors });

  layer.once("remove", () => {
    if (layer.__farmingMarkers) {
      layer.__farmingMarkers.forEach((m) => m.remove());
      layer.__farmingMarkers = null;
    }
  });
};