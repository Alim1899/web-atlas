import { useEffect, useMemo } from "react";
import useMaps from "../Context/MapContext/useMaps";
import useRightBar from "../Context/RightBarContext/useRightBar";
const sortLegendData = (arr = []) => {
  const getMin = (txt = "") => {
    const t = String(txt).trim();

    if (t.startsWith("<")) return -Infinity;
    if (t.startsWith(">")) return Infinity;

    // "1000-1500"
    const first = t.split("-")[0];
    const n = Number(first);
    return Number.isFinite(n) ? n : 0;
  };

  return [...arr].sort((a, b) => getMin(a.txt) - getMin(b.txt));
};

export const useLegend = () => {
  const { state } = useMaps();
  const { dataChart } = state;
  const { dispatch: rightBarDispatch } = useRightBar();
  const legendData = useMemo(() => {
    return dataChart.reduce((acc, el) => {
      const hasSubHeader = el[1]?.sub_header || false;
      const shape = el[1].shape;
      const features = el[1].features;
      const group = el[1].group_ge || "default";
      const groupEn = el[1].group_en;
      const data = [];
      const header = el[1].legend_header || el[1].layerName_ge;
      if (shape === "polygon") {
        if (el[1].group_en === "Geology") {
          features.forEach((feature) => {
            const { name_ge, description_ge, index, color, unicode } =
              feature.properties;
            const txt = description_ge || name_ge;
            if (!data.some((d) => d.txt === txt)) {
              data.push({
                txt,
                color,
                unicode,
                index,
              });
            }
            data.sort((a, b) => (a.index ?? 0) - (b.index ?? 0));
          });
        } else if (
          groupEn === "Fresh groundwater" ||
          groupEn === "Geomorphology"
        ) {
          const grouped = [];
          features.forEach((feature) => {
            const {
              name_ge,
              unicode,
              description_ge,
              subheader,
              color,
              index,
            } = feature.properties;

            const txt = description_ge || name_ge;
            if (!txt) return;

            const key = subheader || "";

            if (!grouped[key]) {
              grouped[key] = [];
            }

            const exists = grouped[key].some(
              (d) => d.txt === txt && d.color === color,
            );

            if (!exists) {
              grouped[key].push({
                txt,
                color,
                subheader,
                index,
                unicode: unicode || index,
              });
            }
          });
          data.push(
            ...Object.entries(grouped)
              .map(([subheader, items]) => ({
                subheader,
                items: items.sort((a, b) => (a.index ?? 0) - (b.index ?? 0)), // sort inside each group
              }))
              .sort(
                (a, b) => (a.items[0]?.index ?? 0) - (b.items[0]?.index ?? 0),
              ),
          );
        } else if (el[1].group_en === "Precipitation") {
          features.forEach((feature) => {
            const { description_en, color } = feature.properties;
            const txt = description_en;
            if (txt && !data.some((d) => d.txt === txt)) {
              data.push({ txt, color });
            }
          });
        } else if (groupEn === "Landscape" || groupEn === "Soils") {
          features.forEach((feature) => {
            const { name_ge, color, index } = feature.properties;
            const txt = name_ge;
            if (!data.some((d) => d.txt === txt)) {
              data.push({
                txt,
                color,
                unicode: index,
              });
            }
            data.sort((a, b) => (a.unicode ?? 0) - (b.unicode ?? 0));
          });
        } else if (el[1].layerName_en === "Agroclimatic Zones") {
          const grouped = {}; // <-- temp object

          features.forEach((feature) => {
            const { name_ge, description_ge, color, subheader, index } =
              feature.properties;

            const txt = description_ge || name_ge;
            if (!txt) return;

            const key = subheader || "";

            if (!grouped[key]) {
              grouped[key] = [];
            }

            // avoid duplicates
            const exists = grouped[key].some(
              (d) => d.txt === txt && d.color === color,
            );

            if (!exists) {
              grouped[key].push({ txt, color, subheader, index });
            }
          });

          // 👉 convert to final array structure
          data.push(
            ...Object.entries(grouped)
              .map(([subheader, items]) => ({
                subheader,
                items: items.sort((a, b) => (a.index ?? 0) - (b.index ?? 0)), // sort inside each group
              }))
              .sort(
                (a, b) => (a.items[0]?.index ?? 0) - (b.items[0]?.index ?? 0),
              ), // sort groups by first index
          );
        } else if (groupEn === "Warm days") {
          features.forEach((feature) => {
            const { name_ge, description_ge, color } = feature.properties;
            const txt = description_ge || name_ge;

            if (txt && !data.some((d) => d.txt === txt && d.color === color)) {
              data.push({ txt, color });
            }
          });
        } else {
          let i = 1;
          features.forEach((feature) => {
            const { name_ge, description_ge, color, index } =
              feature.properties;

            const txt = description_ge || name_ge;
            if (txt && !data.some((d) => d.txt === txt && d.color === color)) {
              data.push({ txt, color, index: index || i, unicode: i });
              i++;
            }
          });

          data.sort((a, b) => (a.index ?? 0) - (b.index ?? 0));
        }
      }
      if (shape === "points" || shape === "line") {
        if (el[1].layerName_en === "Instrumental period") {
          const getIconSize = (size) => {
            const n = Number(size) || 0;
            if (!size) return { type: "", size: [20, 20] };
            if (n < 3) return { type: "≤ 3 ", size: [20, 20] };
            if (n >= 3 && n < 4) return { type: "3 - 4 ", size: [27, 27] };
            if (n >= 4 && n < 5) return { type: "4 - 5 ", size: [35, 35] };
            if (n >= 5 && n < 6) return { type: "5 - 6 ", size: [40, 40] };
            if (n >= 6) return { type: "> 6 ", size: [50, 50] };
          };
          const resizeSvg = (sign, size) => {
            const { size: wh } = getIconSize(size);
            const [w, h] = wh;
            return sign.replace(
              /<svg\b([^>]*)>/i,
              `<svg$1 width="${w}" height="${h}">`,
            );
          };

          features.forEach((feature) => {
            const size = feature.properties?.size ?? feature.size;
            const sizedSvg = resizeSvg(feature.sign, size);
            const label = `${getIconSize(size).type} მაგნიტუდა`;

            if (!data.some((d) => d.name === label)) {
              data.push({
                name: `${getIconSize(size).type} მაგნიტუდა`,
                sign: sizedSvg,
                location: "",
                size: getIconSize(size).size,
              });
            }
          });
        } else if (groupEn === "Area monitoring") {
          features.forEach((feature) => {
            const { type_ge } = feature.properties;
            const sign = feature.sign;
            if (!data.some((d) => d.name === type_ge)) {
              data.push({
                name: type_ge,
                sign,
              });
            }
          });
        } else if (groupEn === "Hail") {
          const type = el[0];
          const getIconSize = (size) => {
            const n = Number(size) || 0;
            if (type === "hail100") {
              if (!size) return { type: "", size: [20, 20] };
              if (n < 1) return { type: "≤ 1 ", size: [15, 15] };
              if (n >= 1 && n < 2)
                return { type: " 1  -   2 ", size: [21, 21] };
              if (n >= 2 && n < 3)
                return { type: " 2  -   3 ", size: [26, 26] };
              if (n >= 3 && n < 4)
                return { type: " 3  -   4 ", size: [32, 32] };
              if (n >= 4 && n < 5)
                return { type: " 4  -   5 ", size: [37, 37] };
              if (n >= 5 && n < 7)
                return { type: "  5 -   7 ", size: [43, 43] };
              if (n >= 7) return { type: "> 7 ", size: [50, 50] };
            } else {
              if (!size) return { type: "", size: [20, 20] };
              if (n < 1) return { type: "≤ 1 ", size: [15, 15] };
              if (n >= 1 && n < 2) return { type: "1 -  2 ", size: [21, 21] };
              if (n >= 2 && n < 3) return { type: "2  -  3 ", size: [30, 30] };
              if (n >= 3 && n < 4) return { type: "3  -  4 ", size: [40, 40] };
              if (n >= 4) return { type: "> 4", size: [50, 50] };
            }
          };
          const resizeSvg = (sign, size) => {
            const { size: wh } = getIconSize(size);
            const [w, h] = wh;
            return sign.replace(
              /<svg\b([^>]*)>/i,
              `<svg$1 width="${w}" height="${h}">`,
            );
          };

          features.forEach((feature) => {
            const size = feature.properties?.size ?? feature.size;
            const sizedSvg = resizeSvg(feature.sign, size);
            const label = `${getIconSize(size).type} `;

            if (!data.some((d) => d.name === label)) {
              data.push({
                name: `${getIconSize(size).type} `,
                sign: sizedSvg,
                location: "",
                size: getIconSize(size).size,
              });
            }
          });
          data.sort((a, b) => {
            const aSize = Array.isArray(a?.size)
              ? Number(a.size[0])
              : -Infinity;
            const bSize = Array.isArray(b?.size)
              ? Number(b.size[0])
              : -Infinity;

            return bSize - aSize; // [50,50] first
          });
        } else if (el[1].group_en === "Geology") {
          features.forEach((feature) => {
            const { type_ge, name_ge } = feature.properties;
            const sign = feature.sign;

            if (!data.some((d) => d.sign === sign)) {
              data.push({
                name: type_ge || name_ge,
                sign,
                location: "",
              });
            }
          });
        } else if (el[1].group_en === "Fresh groundwater") {
          features.forEach((feature) => {
            const { name_ge, type_ge, description_ge, location_ge } =
              feature.properties;
            const sign = feature.sign;
            if (!data.some((d) => d.type_ge === type_ge)) {
              data.push({
                name: `${description_ge} ${name_ge}. ${type_ge}`,
                sign,
                location: location_ge || "",
              });
            }
          });
        } else if (groupEn === "Wars") {
          const signs = [];
          const wars = [];
          const restored = []
          features.forEach((feature) => {
            const { name_ge, index, unicode, type_ge, type_en } =
              feature.properties;
            const sign = feature.sign;

            if (!signs.some((d) => d.sign === sign)) {
              type_en !== "Restored" &&
                signs.push({
                  sign,
                  type: type_ge,
                });
            }

             if (!wars.some((d) => d.index === index)) {

        type_en !== "Restored"? wars.push({
                name: name_ge,
                index,
                year:unicode,
                type:type_ge,
                sign,
                type_en
                 }):restored.push({
                name: name_ge,
                index,
                sign,
                year:unicode,
                type:type_ge,
                type_en

                 })
            }
          });
          wars.sort((a,b)=>a.year-b.year)
         data.push(signs,wars,restored);

        }else if(groupEn==='Defensive buildings'){
          features.forEach((feature) => {
            const { type_ge, location_ge } = feature.properties;
            const sign = feature.sign;

            if (!data.some((d) => d.sign === sign)) {
              data.push({
                name:type_ge,
                sign,
                type:type_ge,
                location: location_ge || "",
              });
            }
          });
        } else {
          features.forEach((feature) => {
            const { name_ge, location_ge } = feature.properties;
            const sign = feature.sign;

            if (!data.some((d) => d.name === name_ge)) {
              data.push({
                name: name_ge,
                sign,
                location: location_ge || "",
              });
            }
          });
        }
      }
      const name = el[0] || "unnamed";

      const finalData =
        name === "activetemperature" ? sortLegendData(data) : data;
      if (!acc[group]) acc[group] = [];
      acc[group].push({
        name,
        shape,
        hasSubHeader,
        data: finalData,
        header,
      });
console.log(acc);
      return acc;
    }, {});
  }, [dataChart]);
  useEffect(() => {
    rightBarDispatch({
      type: "DATA_ARRIVED",
      payload: legendData,
    });
  }, [legendData, rightBarDispatch]);
  return { legendData };
};
