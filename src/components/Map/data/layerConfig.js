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

// ===== სოციალური დაცვა (სვეტოვანი დიაგრამები) =====

const thousands = (v) => (v / 1000).toFixed(1);
const num = (v) => Number(v).toLocaleString("ka-GE");

const subsistence = {
  popup: (p) =>
    `<strong>${p.name_ge}</strong><br>
     დარეგისტრირებული ოჯახი: ${num(p.registered)}<br>
     მიმღები ოჯახი: ${num(p.receiving)}`,
  chart: {
    max: 10000,
    height: 80,
    format: thousands,
    bars: [
      {
        field: "registered",
        label: "დარეგისტრირებული ოჯახი",
        color: "#E9B23F",
      },
      { field: "receiving", label: "მიმღები ოჯახი", color: "#D2502B" },
    ],
  },
};

const pension = {
  popup: (p) =>
    `<strong>${p.name_ge}</strong><br>პენსიის მიმღები: ${num(p.pension)}`,
  chart: {
    max: 25000,
    height: 90,
    format: thousands,
    bars: [{ field: "pension", label: "პენსიის მიმღები", color: "#7DB36A" }],
  },
};

const socialPackage = {
  popup: (p) =>
    `<strong>${p.name_ge}</strong><br>სოციალური პაკეტის მიმღები: ${num(p.social_package)}`,
  chart: {
    max: 6000,
    height: 80,
    format: thousands,
    bars: [
      {
        field: "social_package",
        label: "სოციალური პაკეტის მიმღები",
        color: "#D88BB5",
      },
    ],
  },
};

// ===== სამედიცინო მომსახურება =====

const medicalItems = [
  {
    field: "planned_outpatient",
    label: "გეგმიური და გადაუდებელი ამბულატორიული მომსახურება",
    color: "#F08CB4",
  },
  {
    field: "planned_inpatient",
    label: "გეგმიური და გადაუდებელი სტაციონარული მომსახურება",
    color: "#C77DBA",
  },
  {
    field: "childbirth",
    label: "მშობიარობა და საკეისრო კვეთა",
    color: "#B5D33D",
  },
  { field: "gynecology", label: "გინეკოლოგიური მომსახურება", color: "#3BAA4A" },
  {
    field: "oncology",
    label: "ონკოლოგიური დაავადებების ადრეული გამოვლენა და სკრინინგი",
    color: "#F5A623",
  },
  {
    field: "infectious",
    label: "ინფექციური დაავადებების მართვა",
    color: "#F2E14C",
  },
  {
    field: "chemotherapy",
    label: "ქიმიოთერაპია და ჰორმონოთერაპია",
    color: "#4B4FA3",
  },
  { field: "dialysis", label: "დიალიზი", color: "#8E8CD8" },
  { field: "ophthalmology", label: "ოფთალმოლოგია", color: "#29ABE2" },
  { field: "immunization", label: "იმუნიზაცია", color: "#E53935" },
];

const medicalServices = {
  popup: (p) => {
    const yes = medicalItems.filter((it) => p[it.field] === "კი");
    return `<strong>${p.name_ge}</strong> (${yes.length} / ${medicalItems.length})<br>
      ${yes.map((it) => `• ${it.label}`).join("<br>")}`;
  },
  chart: {
    type: "wheel",
    yes: "კი",
    size: 58,
    items: medicalItems,
    icon: {
      field: "emergency",
      label: "სასწრაფო სამედიცინო დახმარების სადგური",
      color: "#E53935",
    },
  },
};

const staffBars = (doctors, nurses, max) => ({
  popup: (p) =>
    `<strong>${p.name_ge}</strong><br>ექიმი: ${num(p[doctors])}<br>ექთანი: ${num(p[nurses])}`,
  chart: {
    max,
    height: 80,
    bars: [
      { field: doctors, label: "ექიმი", color: "#1F78B4" },
      { field: nurses, label: "ექთანი", color: "#6EC6EA" },
    ],
  },
});

const outpatientClinics = {
  popup: ({ type_ge, name_ge, location_ge }) =>
    `<strong>${type_ge} ${name_ge}</strong><br>${location_ge}`,
  classField: "type_en",
  classes: [{ value: "outpatient", label: "სოფლის ამბულატორია", size: 9 }],
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
  cchf_humans: leptoCases,
  cchf_animals: leptoCases,
  subsistence,
  pension,
  social_package: socialPackage,
  medical_services: medicalServices,
  medical_staff: staffBars("doctors", "nurses", 900),
  outpatient_staff: staffBars("doctors_outpatient", "nurses_outpatient", 60),
  outpatient_clinics: outpatientClinics,
};
