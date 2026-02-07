import { useEffect, useMemo } from "react";
import useMaps from "../Context/MapContext/useMaps";
import useRightBar from "../Context/RightBarContext/useRightBar";
export const useLegend = () => {
  const { state } = useMaps();
  const { dataChart } = state;
  const { dispatch: rightBarDispatch } = useRightBar();

  const legendData = useMemo(() => {
    return dataChart.reduce((acc, el) => {
      const shape = el[1].shape;
      const features = el[1].features;
      const group = el[1].group_ge || "default";
      const data = [];
      const header = el[1].legend_header || el[1].layerName_ge;
      if (shape === "polygon") {
        if (el[1].group_en === "Geology") {
          features.forEach((feature) => {
            const { name_ge, description_ge, color, unicode } =
              feature.properties;
            const txt = description_ge || name_ge;
            if (!data.some((d) => d.txt === txt)) {
              data.push({
                txt,
                color,
                unicode,
              });
            }
          });
        } else if (el[1].group_en === "Precipitation") {
          features.forEach((feature) => {
            const { name_ge, description_en, color } = feature.properties;
            data.push({ header: name_ge, txt:description_en, color });
          });
        } else {
          features.forEach((feature) => {
            const { name_ge, description_ge, color } = feature.properties;

            const txt = description_ge || name_ge;
            if (txt && !data.some((d) => d.txt === txt && d.color === color)) {
              data.push({ txt, color });
            }
          });
        }
      }

      if (shape === "points" || shape === "line") {
        if (el[1].layerName_en === "Instrumental period") {
          const getIconSize = (size) => {
            const n = Number(size) || 0;
            if (!size) return { type: "", size: [20, 20] };
            if (n < 3) return { type: "<3 ", size: [15, 15] };
            if (n >= 3 && n < 4) return { type: ">3 - <4 ", size: [20, 20] };
            if (n >= 4 && n < 5) return { type: ">4 - <5 ", size: [25, 25] };
            if (n >= 5 && n < 6) return { type: ">5 - <6 ", size: [30, 30] };
            if (n >= 6) return { type: ">6 ", size: [35, 35] };
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

      if (!acc[group]) acc[group] = [];
      acc[group].push({
        name: el[0],
        shape,
        data,
        header,
      });
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
