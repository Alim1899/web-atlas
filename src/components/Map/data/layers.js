const CARTO_KEY = import.meta.env.VITE_CARTO_KEY;
const cartoAttr =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>';

const carto = (style) =>
  `https://{s}.basemaps.cartocdn.com/${style}/{z}/{x}/{y}{r}.png?key=${CARTO_KEY}`;

export const basemaps = {
  light: {
    name: "Light",
    url: carto("light_nolabels"),
    labels: null,
    attribution: cartoAttr,
    subdomains: "abcd",
  },
  voyager: {
    name: "Voyager",
    url: carto("rastertiles/voyager_nolabels"),
    labels: null,
    attribution: cartoAttr,
    subdomains: "abcd",
  },
  dark: {
    name: "Dark",
    url: carto("dark_nolabels"),
    labels: null,
    attribution: cartoAttr,
    subdomains: "abcd",
  },
  satellite: {
    name: "Satellite",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    labels: null,
    attribution: "&copy; Esri, " + cartoAttr,
    subdomains: "abcd",
  },
  topo: {
    name: "Topo",
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    labels: null,
    attribution:
      '&copy; <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA), &copy; OpenStreetMap contributors',
    subdomains: "abc",
    maxZoom: 17,
  },
};
