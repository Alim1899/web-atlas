// hooks/useChartData.js
import { useEffect, useMemo, useState } from "react";
import useMaps from "../Context/MapContext/useMaps";
import { layerConfig } from "../Map/data/layerConfig";

const COLOR_KEYS = ["first", "second", "third", "fourth", "fifth"];
const COLOR_FIELDS = ["color_one", "color_two", "color_three", "color_four", "color_five"];

// { first: p.color_one, second: p.color_two, ... } — n ფერი
const colorsOf = (p, n) =>
  Object.fromEntries(COLOR_KEYS.slice(0, n).map((k, i) => [k, p[COLOR_FIELDS[i]]]));

const MERITAL_FIELDS = {
  "იმყოფება ქორწინებაში": "married",
  "არასოდეს ყოფილა ქორწინებაში": "unmarried",
  ქვრივი: "widowed",
  "განქორწინებული, განშორებული": "divorced",
  "არ არის მითითებული": "no_info",
};

const meritalPart = (p, suffix) => ({
  ...Object.fromEntries(
    Object.entries(MERITAL_FIELDS).map(([label, key]) => [label, p[`${key}_${suffix}`]]),
  ),
  color: colorsOf(p, 5),
});

// კლასების წილი ფართობში (მ² → კმ²), ერთნაირი კლასები ერთიანდება
export const areaRows = (props, spec = {}) => {
  const label = spec.label ?? ((p) => p.name_ge || p.name_en || "—");
  const groups = new Map();

  props.forEach((p) => {
    const l = String(label(p) ?? "—");
    const g = spec.group ? spec.group(p) ?? null : null;
    const key = `${g ?? ""}|${l}`;
    const a = (Number(p.area) || 0) / 1e6;
    const idx = Number(p.index);
    const cur = groups.get(key) ?? {
      label: l,
      group: g,
      code: spec.code ? spec.code(p) : null,
      color: p.color,
      index: Number.isFinite(idx) ? idx : 999,
      area: 0,
    };
    cur.area += a;
    if (Number.isFinite(idx)) cur.index = Math.min(cur.index, idx);
    groups.set(key, cur);
  });

  const rows = [...groups.values()];
  const total = rows.reduce((s, r) => s + r.area, 0) || 1;
  rows.forEach((r) => (r.pct = (r.area / total) * 100));
  return rows.sort((a, b) => a.index - b.index || b.area - a.area);
};

// ===== ფენა → დიაგრამის მონაცემი =====
export const buildChart = (key, layer) => {
  const name = layer.layerName_en;
  const group = layer.group_en;
  const features = layer.features || [];
  const props = features.map((f) => f.properties || {});
  const cfg = layerConfig[key];
  const result = (data) => ({
    layerName: name || "",
    id: key,
    header: layer.legend_header,
    data,
  });

  if (cfg?.noChart) return result([]);

  // სვეტოვანი / ბორბალი (რუკაზეც) ან მხოლოდ პანელის სვეტები
  const ch = cfg?.chart ?? cfg?.panelChart;
  if (ch) {
    const fields = ch.bars ?? ch.items;
    const val = (p, f) =>
      ch.type === "wheel" ? (p[f] === ch.yes ? 1 : 0) : Number(p[f]) || 0;
    return result(
      props.map((p) => ({
        name_ge: p.name_ge,
        ...(ch.colorField && { color: p[ch.colorField] }),
        ...Object.fromEntries(fields.map((b) => [b.field, val(p, b.field)])),
      })),
    );
  }

  // შემადგენლობა მუნიციპალიტეტების მიხედვით (100%-იანი სვეტები)
  if (cfg?.stack) {
    return result(
      props.map((p) => ({
        name_ge: p.name_ge,
        ...Object.fromEntries(
          cfg.stack.fields.flatMap((f) => [
            [f.field, Number(p[f.field]) || 0],
            [`${f.field}__color`, p[f.colorField]],
          ]),
        ),
      })),
    );
  }

  // ქორწინებრივი მდგომარეობა
  if (group === "Merital" || ["meritalmen", "meritalwomen"].includes(key)) {
    return result({
      [name]: props.map((p) => ({
        name_ge: p.name_ge,
        old: meritalPart(p, "old"),
        new: meritalPart(p, "new"),
      })),
    });
  }

  // ორი წლის კლასები (შობადობა, მოკვდაობა)
  if (cfg?.years) {
    return result({
      [name]: props.map((p) => ({
        name_ge: p.name_ge,
        old: { rate: p.rate_one, color: colorsOf(p, 2) },
        new: { rate: p.rate_two, color: colorsOf(p, 2) },
      })),
    });
  }

  // კლასების სია ჯგუფებით (მოსახლეობის ცვლილება)
  if (cfg?.classList) {
    return result({
      [name]: props.map((p) => ({
        name_ge: p.name_ge,
        rate: p.type_en,
        color: p.color,
        group: p.sub_header,
        index: p.index,
      })),
    });
  }

  // დანარჩენი: თემატური ფენები — კლასების წილი ფართობში
  return result(areaRows(props, cfg?.area));
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