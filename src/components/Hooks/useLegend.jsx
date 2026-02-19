import { useEffect, useMemo } from "react";
import useMaps from "../Context/MapContext/useMaps";
import useRightBar from "../Context/RightBarContext/useRightBar";
import polygonLegend from "./Helpers/PolygonLegend";
import pointLegend from "./Helpers/pointLegend";
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
      const layer = el[1].layerName_en
      const features = el[1].features;
      const group = el[1].group_ge || "default";
      const groupEn = el[1].group_en;
      const data = [];
      const header = el[1].legend_header || el[1].layerName_ge;
      const type = el[0]

      // |||||    POLYGON FEATURES     ||||||||||||
      if (shape === "polygon") {
     polygonLegend(data,features,groupEn,layer)
      }

      // ||||||||||       POINTS AND LINES         ||||||| |
      if (shape === "points" || shape === "line") {
        pointLegend(data,features,layer,groupEn,type)
      }

      // |||||||||||||||||||||||||   LAST TOUCHES TO DATA      ||||||||||||||||||||||||||||||||||||||||||||\\
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
