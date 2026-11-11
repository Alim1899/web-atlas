// MeritalStatus.js — ორმაგი რგოლი ბეჭდური ატლასის მიხედვით:
// შიდა რგოლი 2002, გარე რგოლი 2014, მნიშვნელობები სეგმენტებთან
import centerOfMass from "@turf/center-of-mass";

const FIELDS = ["married", "unmarried", "widowed", "divorced", "no_info"];
const COLOR_FIELDS = ["color_one", "color_two", "color_three", "color_four", "color_five"];

// მუნიციპალიტეტები, რომელთა სიმბოლო გვერდზე გადის (გამყვანი ხაზით),
// როგორც ბეჭდურზე — [lng, lat]
const OFFSETS = {
  რუსთავი: [44.84, 41.63],
   გარდაბანი: [45.1, 41.65],
    მარნეული: [44.9, 41.45],
};

const S = 170; // SVG-ის ზომა წარწერებიანად
const C = S / 2;
const RINGS = {
  old: { r0: 24, r1: 31, labelR: 17, outside: false }, // 2002
  new: { r0: 35, r1: 44, labelR: 53, outside: true }, // 2014
};

const polar = (r, a) => [C + r * Math.sin(a), C - r * Math.cos(a)];
const f = (n) => n.toFixed(2);

const arcPath = (r0, r1, a0, a1) => {
  const large = a1 - a0 > Math.PI ? 1 : 0;
  const [x0, y0] = polar(r1, a0);
  const [x1, y1] = polar(r1, a1);
  const [x2, y2] = polar(r0, a1);
  const [x3, y3] = polar(r0, a0);
  return `M${f(x0)},${f(y0)} A${r1},${r1} 0 ${large} 1 ${f(x1)},${f(y1)}
    L${f(x2)},${f(y2)} A${r0},${r0} 0 ${large} 0 ${f(x3)},${f(y3)} Z`;
};

// ფერის ჩამუქება წარწერისთვის (ყვითელი/ნაცრისფერი თეთრ ფონზე რომ იკითხებოდეს)
const darken = (hex, k = 0.25) => {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex || "");
  if (!m) return "#333";
  const n = parseInt(m[1], 16);
  const ch = (s) => Math.round(((n >> s) & 255) * (1 - k));
  return `rgb(${ch(16)},${ch(8)},${ch(0)})`;
};

const ring = (values, colors, { r0, r1, labelR, outside }) => {
  const total = values.reduce((s, v) => s + v, 0);
  if (!total) return "";
  const gap = 0.025;
  const minSep = outside ? 0.3 : 0.55; // რადიანი: უფრო ახლოს — წარწერა გადაიწევა
  let a = 0;
  let prevMid = null;
  let shift = 0;
  let out = "";

  values.forEach((v, i) => {
    const span = (v / total) * Math.PI * 2;
    if (v > 0 && span > gap) {
      const a0 = a + gap / 2;
      const a1 = Math.min(a + span - gap / 2, Math.PI * 2 - 0.0001);
      out += `<path d="${arcPath(r0, r1, a0, a1)}" fill="${colors[i]}"/>`;

      // წარწერა — თუ სეგმენტი 1.5%-ზე მეტია
      if (v / total >= 0.015) {
        const mid = a + span / 2;
        shift = prevMid !== null && mid - prevMid < minSep ? shift + 1 : 0;
        prevMid = mid;
        const r = outside ? labelR + shift * 9 : labelR - (shift % 2) * 7;
        const [x, y] = polar(r, mid);
        out += `<text x="${f(x)}" y="${f(y + 3)}" text-anchor="middle"
          font-size="9" font-weight="700" fill="${darken(colors[i])}"
          stroke="#fff" stroke-width="2.5" paint-order="stroke">${v}</text>`;
      }
    }
    a += span;
  });
  return out;
};

export const ringsSvg = (oldValues, newValues, colors, scale = 1) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${S * scale}" height="${S * scale}"
     viewBox="0 0 ${S} ${S}" style="overflow:visible">
    <circle cx="${C}" cy="${C}" r="${RINGS.old.r0}" fill="#fff" fill-opacity="0.85"/>
    ${ring(oldValues, colors, RINGS.old)}
    ${ring(newValues, colors, RINGS.new)}
  </svg>`;

export function handleMerital({ enabled, feature, extra, L, layer }) {
  if (!enabled) return true;

  const p = extra || feature.properties || {};
  const { name_ge } = p;
  if (!name_ge) return true;

  const oldValues = FIELDS.map((k) => Number(p[`${k}_old`]) || 0);
  const newValues = FIELDS.map((k) => Number(p[`${k}_new`]) || 0);
  const colors = COLOR_FIELDS.map((k) => p[k]);
  if (!oldValues.some(Boolean) && !newValues.some(Boolean)) return true;

  const [cLng, cLat] = centerOfMass(feature).geometry.coordinates;
  const [lng, lat] = OFFSETS[name_ge] ?? [cLng, cLat];
  const moved = !!OFFSETS[name_ge];

  const html = `
    <div style="position:relative;width:${S}px;height:${S}px;pointer-events:none">
      ${ringsSvg(oldValues, newValues, colors)}
      <div style="position:absolute;top:${C + RINGS.new.r1 + 14}px;left:50%;
        transform:translateX(-50%);white-space:nowrap;font-size:12px;font-weight:700;
        color:var(--background-color);text-shadow:0 0 3px #fff,0 0 3px #fff">${name_ge}</div>
    </div>`;

  const remove = () => {
    layer.__meritalMarkers?.forEach((m) => m.remove());
    layer.__meritalMarkers = null;
  };

  const place = () => {
    const map = layer._map;
    if (!map) return;
    remove();

    const markers = [];
    // გამყვანი ხაზი: მუნიციპალიტეტის ცენტრიდან გადატანილ სიმბოლომდე
    if (moved) {
      markers.push(
        L.polyline(
          [
            [cLat, cLng],
            [lat, lng],
          ],
          { color: "#333", weight: 1, interactive: false },
        ).addTo(map),
      );
    }
    markers.push(
      L.marker([lat, lng], {
        icon: L.divIcon({ className: "", html, iconSize: [S, S], iconAnchor: [C, C] }),
        interactive: false,
        keyboard: false,
      }).addTo(map),
    );
    layer.__meritalMarkers = markers;
  };

  if (layer._map) place();
  else layer.once("add", place);
  layer.once("remove", remove);

  return true;
}