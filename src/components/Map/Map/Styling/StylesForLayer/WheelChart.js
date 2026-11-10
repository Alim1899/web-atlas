import L from "leaflet";
import { pointOnFeature } from "@turf/turf";

export const wheelSvg = (flags, chart) => {
  const size = chart.size ?? 58;
  const r = size / 2 - 1;
  const c = size / 2;
  const step = (2 * Math.PI) / flags.length;
  const pt = (a) => [c + r * Math.sin(a), c - r * Math.cos(a)];

  const slices = flags
    .map((on, i) => {
      const [x1, y1] = pt(i * step);
      const [x2, y2] = pt((i + 1) * step);
      const fill = on ? chart.items[i].color : "#E9E9E9";
      return `<path d="M${c},${c} L${x1.toFixed(2)},${y1.toFixed(2)} A${r},${r} 0 0 1 ${x2.toFixed(2)},${y2.toFixed(2)} Z"
        fill="${fill}" stroke="#fff" stroke-width="1"/>`;
    })
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    ${slices}
    <circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="#2f3c49" stroke-width="1"/>
    <circle cx="${c}" cy="${c}" r="3.5" fill="#fff" stroke="#2f3c49" stroke-width="1.2"/>
    <circle cx="${c}" cy="${c}" r="1.3" fill="#2f3c49"/>
  </svg>`;
};

export const ambulanceSvg = (color = "#E53935", w = 26) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${w * 0.62}" viewBox="0 0 26 16">
    <path d="M1 3 h14 v9 h-14 z" fill="${color}"/>
    <path d="M15 6 h5 l4 4 v2 h-9 z" fill="${color}"/>
    <path d="M17 7 h2.6 l2.4 2.6 h-5 z" fill="#fff"/>
    <path d="M6.6 5 h1.8 v2 h2 v1.8 h-2 v2 h-1.8 v-2 h-2 v-1.8 h2 z" fill="#fff"/>
    <circle cx="5" cy="13" r="2.2" fill="#2f3c49" stroke="#fff" stroke-width="0.8"/>
    <circle cx="19" cy="13" r="2.2" fill="#2f3c49" stroke="#fff" stroke-width="0.8"/>
  </svg>`;

export function addWheelChart({ cfg, feature, layer, enabled }) {
  if (!enabled) return;

  const p = feature.properties || {};
  const { chart } = cfg;
  const size = chart.size ?? 58;
  const flags = chart.items.map((it) => p[it.field] === chart.yes);

  const [lng, lat] =
    p.chart_lng != null
      ? [p.chart_lng, p.chart_lat]
      : pointOnFeature(feature).geometry.coordinates;

  const icon =
    chart.icon && p[chart.icon.field] === chart.yes
      ? `<div style="position:absolute;left:${size + 4}px;top:${size / 2 - 8}px">
           ${ambulanceSvg(chart.icon.color)}
         </div>`
      : "";

  const html = `
    <div style="position:relative;width:${size}px;height:${size}px;pointer-events:none">
      ${wheelSvg(flags, chart)}
      ${icon}
      <div style="position:absolute;top:${size + 2}px;left:50%;transform:translateX(-50%);
        white-space:nowrap;font-size:12px;font-weight:700;color:var(--background-color);
        text-shadow:0 0 3px #fff,0 0 3px #fff">${p.name_ge ?? ""}</div>
    </div>`;

  const place = () => {
    if (!layer._map) return;
    layer.__chartMarker?.remove();
    layer.__chartMarker = L.marker(L.latLng(lat, lng), {
      icon: L.divIcon({
        className: "",
        html,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      }),
      interactive: false,
      keyboard: false,
    }).addTo(layer._map);
  };

  if (layer._map) place();
  else layer.once("add", place);

  layer.once("remove", () => {
    layer.__chartMarker?.remove();
    layer.__chartMarker = null;
  });
}