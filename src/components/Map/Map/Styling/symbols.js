// utils/farmingSymbols.js
const polar = (cx, cy, r, a) => ({
  x: cx + r * Math.cos(a),
  y: cy + r * Math.sin(a),
});

const arcPath = (cx, cy, r, a0, a1) => {
  const p0 = polar(cx, cy, r, a0);
  const p1 = polar(cx, cy, r, a1);
  const large = a1 - a0 > Math.PI ? 1 : 0;

  return `M ${cx} ${cy} L ${p0.x} ${p0.y} A ${r} ${r} 0 ${large} 1 ${p1.x} ${p1.y} Z`;
};

export const pieSvg = ({ values = [], colors = [], size = 70 }) => {
  const cleanValues = values.map((v) => Number(v) || 0);
  const total = cleanValues.reduce((a, b) => a + b, 0) || 1;

  const r = size / 2;
  const cx = r;
  const cy = r;

  // how far labels go outside
  const pad = Math.round(size * 0.8); // tweak: 0.6–1.0

  // IMPORTANT: bigger "canvas"
  const vbX = -pad;
  const vbY = -pad;

  let a0 = -Math.PI / 2;

  const labelRadius = r * 1.45;
  const elbowRadius = r * 1.08;

  const slices = cleanValues.map((v, i) => {
    const da = (v / total) * Math.PI * 2;
    const a1 = a0 + da;
    const mid = (a0 + a1) / 2;

    const fill = colors[i] ?? colors[colors.length - 1] ?? "#999";

    const path = arcPath(cx, cy, r, a0, a1);

    const edge = polar(cx, cy, r, mid);
    const elbow = polar(cx, cy, elbowRadius, mid);
    const lp = polar(cx, cy, labelRadius, mid);

    const isRight = lp.x >= cx;
    const tx = lp.x + (isRight ? 6 : -6);

    const showLabel = true;

    a0 = a1;

    return {
      path,
      fill,
      edgeX: edge.x,
      edgeY: edge.y,
      elbowX: elbow.x,
      elbowY: elbow.y,
      tx,
      ty: lp.y,
      anchor: isRight ? "start" : "end",
      label: showLabel ? String(Math.round(v)) : "",
      showLabel,
    };
  });

  return `
  <svg xmlns="http://www.w3.org/2000/svg"
       viewBox="${vbX} ${vbY} ${size} ${size}"
       style="overflow: visible">
    ${slices
      .map(
        (s) =>
          `<path d="${s.path}" fill="${s.fill}" stroke="#fff" stroke-width="1" />`,
      )
      .join("")}

    ${slices
      .filter((s) => s.showLabel)
      .map(
        (s) => `
        <path d="M ${s.edgeX} ${s.edgeY} L ${s.elbowX} ${s.elbowY} L ${s.tx} ${s.ty}"
              fill="none" stroke="${s.fill}" stroke-width="1.5" />
        <text x="${s.tx}" y="${s.ty}"
              text-anchor="${s.anchor}" dominant-baseline="left"
              font-size="10" font-weight="700" font-family="Arial"
              fill="${s.fill}" stroke="#fff" stroke-width="2" paint-order="stroke"
        >${s.label}</text>
      `,
      )
      .join("")}
  </svg>`;
};

export const bubbleSvg = (
  legal,
  household,
  maxHousehold,
  minR = 16,
  maxR = 34,
) => {
  const v = Number(household) || 0;
  const m = Number(maxHousehold) || 1;

  // sqrt scaling for proportional circle sizes
  const t = Math.sqrt(v / m);
  const r = minR + (maxR - minR) * (Number.isFinite(t) ? t : 0);

  const size = Math.ceil((maxR + 16) * 2);
  const cx = size / 2;
  const cy = size / 2;
  const stemTop = cy - r - 14;

  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <line x1="${cx}" y1="${stemTop}" x2="${cx}" y2="${cy - r}" stroke="#222" stroke-width="2"/>
    <text x="${cx}" y="${stemTop - 4}" text-anchor="middle" font-size="12" font-family="Arial" fill="#111">${legal ?? ""}</text>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="#d58ac8" stroke="#222" stroke-width="1"/>
    <text x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="middle"
          font-size="13" font-family="Arial" fill="#111">${household ?? ""}</text>
  </svg>`;
};
