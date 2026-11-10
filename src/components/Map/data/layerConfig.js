// ===== დამხმარე ფუნქციები =====

export const sizeSvg = (sign, w, h = w) =>
  sign.replace(/<svg\b([^>]*)>/i, `<svg$1 width="${w}" height="${h}">`);

export const matchesClass = (c, v) => {
  const inRange =
    (c.min != null || c.max != null) &&
    Number.isFinite(Number(v)) &&
    Number(v) >= (c.min ?? -Infinity) &&
    Number(v) <= (c.max ?? Infinity);

  const textMatch = (c.match ?? [c.value]).map(String).includes(String(v));

  return inRange || textMatch;
};

export const getClass = (cfg, props) =>
  cfg.classes?.find((c) => matchesClass(c, props?.[cfg.classField]));

// ===== ბრუცელოზი, ტულარემია (კლასი type_en ველში) =====

const casesClasses = [
  { value: "37", size: 55 },
  { value: "20-30", size: 36 },
  { value: "6-19", match: ["6-19", "9"], size: 25 },
  { value: "1-5", size: 15 },
];

const casesPopup = ({ type_ge, name_ge, location_ge, size }) =>
  `<strong>${type_ge} ${name_ge} - ${location_ge} - ${size} შემთხვევა</strong>`;

const cases = {
  popup: casesPopup,
  classField: "type_en",
  classes: casesClasses,
};

// ===== ენცეფალიტი (კლასი size ველიდან ითვლება) =====

const smallCasesClasses = [
  { value: "6-8", min: 6, max: 8, size: 22 },
  { value: "1-5", min: 1, max: 5, size: 15 },
];
const sizeCases = {
  popup: ({ type_ge, size }) =>
    `<strong>${type_ge} - ${size} შემთხვევა</strong>`,
  classField: "size",
  classes: smallCasesClasses,
};
const leptoCases = {
  popup: ({ name_ge, location_ge, type_en }) =>
    `<strong>${name_ge}, ${location_ge} - ${type_en} შემთხვევა</strong>`,
  classField: "type_en",
  classes: smallCasesClasses,
};

// ===== ფენები =====

export const layerConfig = {
  brucela_humans: cases,
  brucela_animals: cases,
  tularemia_humans: cases,
  tularemia_animals: cases,
  encepalite_animals: sizeCases,
  encepalite_humans: sizeCases,
  leptospirosis: leptoCases,
};
