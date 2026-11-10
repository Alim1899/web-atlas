import L from "leaflet";
import { pointOnFeature } from "@turf/turf";

export const barChartSvg = (values, chart) => {
  const bw = chart.barWidth ?? 16;
  const gap = chart.gap ?? 6;
  const H = chart.height ?? 80;
  const labelH = 15;
  const content = values.length * bw + (values.length - 1) * gap;
  const w = Math.max(content + 6, 40);
  const pad = (w - content) / 2;
  const totalH = H + labelH + 1;
  const fmt = chart.format ?? ((v) => v);

  const defs = chart.bars
    .map(
      (b) => `<linearGradient id="bc-${b.field}" x1="0" x2="1">
        <stop offset="0" stop-color="${b.color}" stop-opacity="0.75"/>
        <stop offset="0.45" stop-color="${b.color}"/>
        <stop offset="1" stop-color="${b.color}" stop-opacity="0.85"/>
      </linearGradient>`,
    )
    .join("");

  const bars = values
    .map((v, i) => {
      const h = Math.max(1, (v / chart.max) * H);
      const x = pad + i * (bw + gap);
      const y = labelH + H - h;
      const b = chart.bars[i];
      return `<rect x="${x}" y="${y}" width="${bw}" height="${h}" rx="1.5"
          fill="url(#bc-${b.field})" stroke="rgba(0,0,0,.35)" stroke-width="0.6"/>
        <text x="${x + bw / 2}" y="${y - 3}" text-anchor="middle"
          font-size="10" font-weight="700" style="fill:var(--background-color)"
          stroke="#fff" stroke-width="3" paint-order="stroke">${fmt(v)}</text>`;
    })
    .join("");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" style="overflow:visible"
      width="${w}" height="${totalH}" viewBox="0 0 ${w} ${totalH}">
    <defs>${defs}</defs>${bars}
    <line x1="0" y1="${totalH - 0.5}" x2="${w}" y2="${totalH - 0.5}"
      style="stroke:var(--background-color)" stroke-width="1"/>
  </svg>`;

  return { svg, w, h: totalH };
};

export function addBarChart({ cfg, feature, layer, enabled }) {
  if (!enabled) return;

  const p = feature.properties || {};
  const values = cfg.chart.bars.map((b) => Number(p[b.field]) || 0);

  // chart_lng / chart_lat-ით დიაგრამის ადგილი ხელით შეიძლება მიეთითოს
  const [lng, lat] =
    p.chart_lng != null
      ? [p.chart_lng, p.chart_lat]
      : pointOnFeature(feature).geometry.coordinates;

  const { svg, w, h } = barChartSvg(values, cfg.chart);
  const html = `
    <div style="position:relative;width:${w}px;height:${h}px;pointer-events:none">
      ${svg}
      <div style="position:absolute;top:${h + 2}px;left:50%;transform:translateX(-50%);
        white-space:nowrap;font-size:12px;font-weight:700;color:var(--background-color);
        text-shadow:0 0 3px #fff,0 0 3px #fff">${p.name_ge ?? ""}</div>
    </div>`;

  const place = () => {
    if (!layer._map) return;
    layer.__barMarker?.remove();
    layer.__barMarker = L.marker(L.latLng(lat, lng), {
      icon: L.divIcon({ className: "", html, iconSize: [w, h], iconAnchor: [w / 2, h] }),
      interactive: false,
      keyboard: false,
    }).addTo(layer._map);
  };

  if (layer._map) place();
  else layer.once("add", place);

  layer.once("remove", () => {
    layer.__barMarker?.remove();
    layer.__barMarker = null;
  });
}