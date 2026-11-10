// hooks/useChartData.js
import { useEffect, useMemo, useState } from "react";
import useMaps from "../Context/MapContext/useMaps";
import { layerConfig } from "../Map/data/layerConfig";

// ===== სოფლის მეურნეობა, რელიგია, ეთნოსი: ლეგენდის სახელი → ველი =====
const FARMING_FIELDS = {
  Ownership: { კერძო: "private_owner", სახელმწიფო: "state_owner" },
  Status: {
    "შინა მეურნეობა": "household_farm",
    "იურიდიული პირი": "legal_farm",
  },
  Agroforms: {
    "სათიბი და საძოვარი": "natural",
    სახნავი: "arable",
    "მრავალწლიანი ნარგავი": "parennial",
    სათბური: "greenhouse",
  },
  Beneficiars: {
    "დანერგე მომავალი": "plant_future",
    "აგრო დაზღვევა": "agro_insurance",
    "შეღავათიანი აგროკრედიტი": "agro_credit",
  },
  Religy: {
    მართლმადიდებლური: "Orthodox",
    მუსლიმური: "Muslim",
    "სომხური-სამოციქულო": "armenian",
    სხვა: "other",
  },
  Ethnics: {
    ქართველი: "georgian",
    აზერბაიჯანელი: "azerbaijan",
    სომეხი: "armenian",
    სხვა: "others",
  },
};

const COLOR_KEYS = ["first", "second", "third", "fourth", "fifth"];
const COLOR_FIELDS = [
  "color_one",
  "color_two",
  "color_three",
  "color_four",
  "color_five",
];

// { first: p.color_one, second: p.color_two, ... } — n ფერი
const colorsOf = (p, n) =>
  Object.fromEntries(
    COLOR_KEYS.slice(0, n).map((k, i) => [k, p[COLOR_FIELDS[i]]]),
  );

const MERITAL_FIELDS = {
  "იმყოფება ქორწინებაში": "married",
  "არასოდეს ყოფილა ქორწინებაში": "unmarried",
  ქვრივი: "widowed",
  "განქორწინებული, განშორებული": "divorced",
  "არ არის მითითებული": "no_info",
};

const meritalPart = (p, suffix) => ({
  ...Object.fromEntries(
    Object.entries(MERITAL_FIELDS).map(([label, key]) => [
      label,
      p[`${key}_${suffix}`],
    ]),
  ),
  color: colorsOf(p, 5),
});

// ===== ფენა → დიაგრამის მონაცემი =====
const buildChart = (key, layer) => {
  const name = layer.layerName_en;
  const group = layer.group_en;
  const features = layer.features || [];
  const props = features.map((f) => f.properties || {});
  const result = (data) => ({
    layerName: name || "",
    id: key,
    header: layer.legend_header,
    data,
  });

  // კონფიგით აღწერილი სვეტოვანი დიაგრამები
  const cfg = layerConfig[key];
  if (cfg?.chart) {
    const fields = cfg.chart.bars ?? cfg.chart.items;
    const val = (p, f) =>
      cfg.chart.type === "wheel"
        ? p[f] === cfg.chart.yes
          ? 1
          : 0
        : Number(p[f]) || 0;
    return result(
      props.map((p) => ({
        name_ge: p.name_ge,
        ...Object.fromEntries(fields.map((b) => [b.field, val(p, b.field)])),
      })),
    );
  }

  // სოფლის მეურნეობა, რელიგია, ეთნოსი
  if (group === "Farming" || group === "Religy") {
    const fields = FARMING_FIELDS[name];
    if (!fields) return result({});
    const n = Object.keys(fields).length;
    return result({
      [name]: props.map((p) => ({
        name_ge: p.name_ge,
        ...Object.fromEntries(
          Object.entries(fields).map(([label, field]) => [label, p[field]]),
        ),
        color: colorsOf(p, n),
      })),
    });
  }

  if (group === "Merital") {
    return result({
      [name]: props.map((p) => ({
        name_ge: p.name_ge,
        old: meritalPart(p, "old"),
        new: meritalPart(p, "new"),
      })),
    });
  }

  if (group === "Population") {
    if (name === "Birth rate" || name === "Death rate") {
      return result({
        [name]: props.map((p) => ({
          name_ge: p.name_ge,
          old: { rate: p.rate_one, color: colorsOf(p, 2) },
          new: { rate: p.rate_two, color: colorsOf(p, 2) },
        })),
      });
    }
    if (name === "Population change") {
      return result({
        [name]: props.map((p) => ({
          name_ge: p.name_ge,
          rate: p.type_en,
          color: p.color,
        })),
      });
    }
    return result({});
  }

  if (group === "Settlements") {
    if (name === "Density") {
      return result({
        [name]: props.map((p) => ({
          name_ge: p.name_ge,
          rate: p.density,
          color: p.color,
        })),
      });
    }
    if (name === "City population") {
      return result({
        [name]: props.map((p) => ({
          name_ge: p.name_ge,
          rate: { size_old: p.size_old, size_new: p.size_new },
          color: [p.color_one, p.color_two],
        })),
      });
    }
    return result({});
  }

  if (group === "Migrants") {
    return result({
      [name]: props.map((p) => ({
        name_ge: p.name_ge,
        old: { rate: p.conflict, color: colorsOf(p, 2) },
        new: { rate: p.natural, color: colorsOf(p, 2) },
        rate: { size_old: p.conflict, size_new: p.natural },
        color: [p.color_one, p.color_two],
      })),
    });
  }

  if (group === "Precipitation") {
    const summarized = {};
    props.forEach((p) => {
      const k = p.description_en;
      if (!summarized[k]) {
        summarized[k] = {
          name_ge: p.description_en || "",
          description_en: p.name_ge ? p.name_ge : [],
          area: p.area?.toFixed?.(2) || "",
          totalArea: 0,
          color: p.color,
          index: p.index,
        };
      }
      summarized[k].totalArea += Number(p.area) || 0;
    });
    return result(summarized);
  }

  // დანარჩენი: ფართობები სახელის მიხედვით
  const summarized = {};
  props.forEach((p) => {
    const k = p.name_ge || p.name_en;
    const area = Number(p.area) || 0;
    if (!summarized[k]) {
      summarized[k] = {
        name_ge: p.name_ge || "",
        name_en: p.name_en || "",
        description_en: p.description_en ? [p.description_en] : [],
        description_ge: p.description_ge ? [p.description_ge] : [],
        area: area ? area.toFixed(2) : "",
        totalArea: 0,
        color: p.color,
        index: p.index,
      };
    } else {
      if (
        p.description_en &&
        !summarized[k].description_en.includes(p.description_en)
      )
        summarized[k].description_en.push(p.description_en);
      if (
        p.description_ge &&
        !summarized[k].description_ge.includes(p.description_ge)
      )
        summarized[k].description_ge.push(p.description_ge);
    }
    summarized[k].totalArea += area;
  });
  return result(summarized);
};

const useChartData = () => {
  const { state } = useMaps();
  const { dataChart, activeLayers } = state;
  const [selectedLayer, setSelectedLayer] = useState("");

  const chartData = useMemo(
    () =>
      dataChart
        .filter((el) => el[1].shape === "polygon")
        .map(([key, layer]) => buildChart(key, layer)),
    [dataChart],
  );

  // ფენების სია შეიცვალა → ბოლოს ჩართული ფენა
const activeKey = activeLayers.map((l) => l.id).join("|");
useEffect(() => {
  setSelectedLayer(activeLayers.at(-1)?.id ?? "");
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [activeKey]);

  const handleSelected = (layerId) => setSelectedLayer(layerId);

  const selectedChart = chartData.find((el) => el.id === selectedLayer);

  return {
    chartData,
    selectedLayer,
    selectedChart,
    activeLayers,
    handleSelected,
  };
};

export default useChartData;
