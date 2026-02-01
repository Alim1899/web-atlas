import { useEffect, useMemo } from "react";
import useMaps from "../Context/MapContext/useMaps";
import useRightBar from "../Context/RightBarContext/useRightBar";
export const useLegend = () => {
  const { state } = useMaps();
  const { dataChart } = state;
  const { dispatch: rightBarDispatch } = useRightBar();
  console.log(dataChart);

  const legendData = useMemo(() => {
    return dataChart.reduce((acc, el) => {
      const shape = el[1].shape;
      const features = el[1].features;
      const group = el[1].group_ge || "default";
      const data = [];

      if (shape === "polygon") {
        features.forEach((feature) => {
          const { name_ge, description_ge, color } = feature.properties;

          const txt = description_ge || name_ge;
          if (txt && !data.some((d) => d.txt === txt && d.color === color)) {
            data.push({ txt, color });
          }
        });
      }

      if (shape === "points" || shape === "line") {
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

      if (!acc[group]) acc[group] = [];

      acc[group].push({
        name: el[0],
        shape,
        data,
      });

      return acc;
    }, {});
  }, [dataChart]);
  useEffect(() => {
    rightBarDispatch({
      type: "DATA_ARRIVED",
      payload: legendData,
    });
    console.log(Object.keys(legendData));
  }, [legendData, rightBarDispatch]);
  return { legendData };
};
