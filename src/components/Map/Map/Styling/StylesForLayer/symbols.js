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
  const cx = r - 50;
  const cy = r - 70;

  // how far labels go outside
  const pad = Math.round(size * 1); // tweak: 0.6–1.0

  // IMPORTANT: bigger "canvas"
  const vbX = -pad;
  const vbY = -pad;

  let a0 = -Math.PI / 2;

  const labelRadius = r * 1.95;
  const elbowRadius = r * 1.68;

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
    const tx = lp.x + (isRight ? 10 : -10);

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

// |||||||| MARITAL |||||||||||||\
export const pieDoubleSvg = ({ oldValues, newValues, colors, size = 120 }) => {
  const cx = size / 2;
  const cy = size / 2;

  const innerInner = size * 0.18;
  const innerOuter = size * 0.3;

  const outerInner = size * 0.33;
  const outerOuter = size * 0.48;

  const oldLabelRadius = size * 1.5;
  const oldElbowRadius = size * 0.42;

  const newLabelRadius = size * 0.85;
  const newElbowRadius = size * 0.65;

  const polar = (r, a) => ({
    x: cx + r * Math.cos(a),
    y: cy + r * Math.sin(a),
  });

  const arc = (r1, r2, start, end) => {
    const p1 = polar(r2, start);
    const p2 = polar(r2, end);
    const p3 = polar(r1, end);
    const p4 = polar(r1, start);

    const large = end - start > Math.PI ? 1 : 0;

    return `
      M ${p1.x} ${p1.y}
      A ${r2} ${r2} 0 ${large} 1 ${p2.x} ${p2.y}
      L ${p3.x} ${p3.y}
      A ${r1} ${r1} 0 ${large} 0 ${p4.x} ${p4.y}
      Z
    `;
  };
  const sumOld = oldValues.reduce((a, b) => a + b, 0) || 1;
  const sumNew = newValues.reduce((a, b) => a + b, 0) || 1;

  let aOld = -Math.PI / 2;
  let aNew = -Math.PI / 2;

  const innerSlices = [];
  const outerSlices = [];

  // INNER (OLD)
  oldValues.forEach((v, i) => {
    const da = (v / sumOld) * Math.PI * 2;
    const a1 = aOld + da;
    const mid = (aOld + a1) / 2;

    const fill = colors[i] ?? "#999";

    const edge = polar(innerOuter, mid);
    const elbow = polar(oldElbowRadius, mid);
    const label = polar(oldLabelRadius, mid);

    const right = label.x >= cx;
    const tx = label.x + (right ? 8 : -8);

    innerSlices.push({
      path: arc(innerInner, innerOuter, aOld, a1),
      fill,
      edgeX: edge.x,
      edgeY: edge.y,
      elbowX: elbow.x,
      elbowY: elbow.y,
      tx,
      ty: label.y,
      anchor: right ? "start" : "end",
      value: v,
    });

    aOld = a1;
  });

  // OUTER (NEW)
  newValues.forEach((v, i) => {
    const da = (v / sumNew) * Math.PI * 2;
    const a1 = aNew + da;
    const mid = (aNew + a1) / 2;

    const fill = colors[i] ?? "#999";

    const edge = polar(outerOuter, mid);
    const elbow = polar(newElbowRadius, mid);
    const label = polar(newLabelRadius, mid);

    const right = label.x >= cx;
    const tx = label.x + (right ? 10 : -10);

    outerSlices.push({
      path: arc(outerInner, outerOuter, aNew, a1),
      fill,
      edgeX: edge.x,
      edgeY: edge.y,
      elbowX: elbow.x,
      elbowY: elbow.y,
      tx,
      ty: label.y,
      anchor: right ? "start" : "end",
      value: v,
    });

    aNew = a1;
  });

  // --- LABEL COLLISION FIX (simple vertical separation) ---

  const separate = (arr, minGap = 14) => {
    const left = arr
      .filter((a) => a.anchor === "end")
      .sort((a, b) => a.ty - b.ty);
    const right = arr
      .filter((a) => a.anchor === "start")
      .sort((a, b) => a.ty - b.ty);

    const fix = (list) => {
      for (let i = 1; i < list.length; i++) {
        if (list[i].ty - list[i - 1].ty < minGap) {
          list[i].ty = list[i - 1].ty + minGap;
        }
      }
    };

    fix(left);
    fix(right);
  };

  separate(innerSlices);
  separate(outerSlices);

  return `
  <svg width="${size}" height="${size}" style="overflow:visible">

    ${innerSlices
      .map(
        (s) =>
          `<path d="${s.path}" fill="${s.fill}" stroke="#fff" stroke-width="1"/>`,
      )
      .join("")}

    ${outerSlices
      .map(
        (s) =>
          `<path d="${s.path}" fill="${s.fill}" stroke="#fff" stroke-width="1"/>`,
      )
      .join("")}

    ${innerSlices
      .map(
        (s) => `
      <path d="M ${s.edgeX} ${s.edgeY} L ${s.elbowX} ${s.elbowY} L ${s.tx} ${s.ty}"
            stroke="${s.fill}" stroke-width="1.2" fill="none"/>

      <text x="${s.tx}" y="${s.ty}"
            text-anchor="${s.anchor}"
            dominant-baseline="middle"
            font-size="12"
            font-weight="700"
            fill="${s.fill}">
        ${s.value}
      </text>
    `,
      )
      .join("")}

    ${outerSlices
      .map(
        (s) => `
      <path d="M ${s.edgeX} ${s.edgeY} L ${s.elbowX} ${s.elbowY} L ${s.tx} ${s.ty}"
            stroke="${s.fill}" stroke-width="1.5" fill="none"/>

      <text x="${s.tx}" y="${s.ty}"
            text-anchor="${s.anchor}"
            dominant-baseline="middle"
            font-size="12"
            font-weight="700"
            fill="${s.fill}">
        ${s.value}
      </text>
    `,
      )
      .join("")}

    <text
      x="${cx}"
      y="${cy + 4}"
      text-anchor="middle"
      font-size="12"
      font-weight="700"
      fill="#333"
    >
      2002
    </text>

    <text
      x="${cx}"
      y="14"
      text-anchor="middle"
      font-size="12"
      font-weight="700"
      fill="#333"
    >
      2024
    </text>

  </svg>
  `;
};

export const halfCircleSvg = ({
  oldValue,
  newValue,
  color_old,
  color_new,
  size = 120,
  year_old,
  year_new,
}) => {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.48;

  const leftX = cx - r / 2;
  const rightX = cx + r / 2;

  return `
  <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">

    <!-- LEFT half -->
    <path
      d="
        M ${cx} ${cy - r}
        A ${r} ${r} 0 0 1 ${cx} ${cy + r}
        L ${cx} ${cy}
        Z
      "
      fill="${color_old}"
    />

    <!-- RIGHT half -->
    <path
      d="
        M ${cx} ${cy + r}
        A ${r} ${r} 0 0 1 ${cx} ${cy - r}
        L ${cx} ${cy}
        Z
      "
      fill="${color_new}"
    />

    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#fff" stroke-width="2"/>

    <line
      x1="${cx}"
      y1="${cy - r}"
      x2="${cx}"
      y2="${cy + r}"
      stroke="#abccba"
      stroke-width="2"
    />

    <!-- LEFT year -->
    <text
      x="${leftX}"
      y="${cy - 10}"
      text-anchor="middle"
      font-size="12"
      font-weight="600"
      fill="#112233"
    >
      ${year_old}
    </text>

    <!-- LEFT value -->
    <text
      x="${leftX}"
      y="${cy + 8}"
      text-anchor="middle"
      font-size="12"
      font-weight="700"
      fill="#112233"
    >
      ${oldValue}
    </text>

    <!-- RIGHT year -->
    <text
      x="${rightX}"
      y="${cy - 10}"
      text-anchor="middle"
      font-size="12"
      font-weight="600"
      fill="#112233"
    >
      ${year_new}
    </text>

    <!-- RIGHT value -->
    <text
      x="${rightX}"
      y="${cy + 8}"
      text-anchor="middle"
      font-size="12"
      font-weight="700"
      fill="#112233"
    >
      ${newValue}
    </text>

  </svg>
  `;
};
