export const sizeSvg = (sign, w, h = w) =>
  sign.replace(/<svg\b([^>]*)>/i, `<svg$1 width="${w}" height="${h}">`);

// კლასის პოვნა feature-ის მიხედვით
export const getClass = (cfg, props) =>
  cfg.classes?.find((c) => String(c.value) === String(props?.[cfg.classField]));

// ---- ბრუცელოზი ----
const brucelaClasses = [
  // მასივის რიგი = ლეგენდის რიგი
  { value: "37", size: 55 },
  { value: "20-30", size: 36 },
  { value: "6-19", size: 25 },
  { value: "1-5", size: 15 },
];

const brucelaPopup = ({ type_ge, name_ge, location_ge, size }) =>
  `<strong>${type_ge} ${name_ge} - ${location_ge} - ${size} შემთხვევა</strong>`;

export const layerConfig = {
  brucela_humans: {
    popup: brucelaPopup,
    classField: "type_en",
    classes: brucelaClasses,
  },
  brucela_animals: {
    popup: brucelaPopup,
    classField: "type_en",
    classes: brucelaClasses,
  },
};