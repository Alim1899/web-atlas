import { pieDoubleSvg,pieSvg } from "./StylesForLayer/symbols.js";
import { halfCircleSvg } from "./StylesForLayer/symbols.js";
import L from "leaflet";
export const addDoublePieMarker = ({
  layer,
  center,
  oldValues,
  newValues,
  colors,
  size = 120,
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
console.log(values);
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

  export   const getIconSize = (size, type,layerName) => {
      if (["ecomigrants", "warmigrants"].includes(layerName)) {
  switch(layerName){
    case "warmigrants":{
      if (size === 7) return [15, 15];
        if (size === 6) return [20, 20];
        if (size === 5) return [25, 25];
        if (size == 4) return [30, 30];
        if (size == 3) return [35, 35];
        if (size == 2) return [45, 45];
        if (size == 1) return [50, 50];
    }
    break;
    case "ecomigrants":{
        if (size === 5) return [15, 15];
        if (size == 4) return [22, 22];
        if (size == 3) return [30, 30];
        if (size == 2) return [35, 35];
        if (size == 1) return [42, 42];
    }
  }
        
      }
      if (layerName==='villages') {
        if (size <= 10) return [15, 15];
        if (size >= 11 && size < 100) return [22, 22];
        if (size >= 100 && size < 500) return [28, 28];
        if (size >= 500 && size < 1500) return [35, 35];
        if (size >= 1500 && size < 3000) return [42, 42];
        if (size >= 3000 && size < 5000) return [49, 49];
        if (size >= 5000) return [60, 60];
      }
      if (!type) {
        if (name === "Hail - total") {
          if (!size) return [[20, 20]];
          if (size < 1) return [10, 10];
          if (size >= 1 && size < 2) return [13, 13];
          if (size >= 2 && size < 3) return [18, 18];
          if (size >= 3 && size < 4) return [23, 23];
          if (size >= 4 && size < 5) return [28, 28];
          if (size >= 5 && size < 7) return [32, 32];
          if (size >= 7) return [38, 38];
        } else if (name === "Hail - 100") {
          if (!size) return [[20, 20]];
          if (size < 1) return [13, 12];
          if (size >= 1 && size < 2) return [19, 19];
          if (size >= 2 && size < 3) return [24, 24];
          if (size >= 3 && size < 4) return [30, 30];
          if (size >= 5) return [38, 38];
        } else {
          if (!size) return [[20, 20]];
          if (size < 3) return [11, 11];
          if (size >= 3 && size < 4) return [17, 17];
          if (size >= 4 && size < 5) return [23, 23];
          if (size >= 5 && size < 6) return [29, 29];
          if (size >= 6) return [35, 35];
        }
      } else if (type === "Hydroelectric power plant") {
        if (!size) return [[20, 20]];
        if (size < 1) return [11, 11];
        if (size >= 1 && size < 5) return [17, 17];
        if (size >= 5 && size < 14) return [23, 23];
        if (size >= 15) return [65, 65];
      }
      if (type === "Thermal power plant") {
        if (!size) return [[20, 20]];
        if (size === 110) return [11, 11];
        if (size >= 230 && size < 270) return [17, 17];
        if (size === 300) return [65, 65];
      }
  
      return [40, 40]; // fallback
    };