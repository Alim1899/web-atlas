// hooks/useChartData.js
import { useEffect, useMemo, useState } from "react";
import { getColor } from "../Utils/ColorScales";
import useMaps from "../Context/MapContext/useMaps";
const useChartData = () => {
  const { state } = useMaps();
  const { dataChart, activeLayers } = state;
  const [selectedLayer, setSelectedLayer] = useState(
    sessionStorage.getItem("selectedLayer") || ""
  );

  // Computed chart data
  const chartData = useMemo(() => {
    return dataChart
      .filter((el) => el[1].type === "polygon")
      .map(([key, layer]) => {
        const summarized = {};

        const layerName = layer.layerName;
        layer.features.forEach(({ properties }) => {
          const { nameGe, nameEn, description, descriptionGe, area, length } =
            properties;
          const name = nameGe || nameEn;
          if (!summarized[name]) {
            summarized[name] = {
              nameGe: nameGe || "",
              nameEn: nameEn || "",
              description: description || "",
              descriptionGe: descriptionGe || "",
              area: area.toFixed(2) || "",
              length: length.toFixed(2) || "",
              totalArea: 0,
              totalLength: 0,
              color: getColor(key, name),
            };
          }

          summarized[name].totalArea += properties.area;
          summarized[name].totalLength += properties.length;
        });
        return { layerName: layerName || "", id: key, data: summarized };
      });
  }, [dataChart]);
  // Keep selected layer in sync with active layers
  useEffect(() => {
    if (activeLayers.length === 0) {
      setSelectedLayer("");
      sessionStorage.removeItem("selectedLayer");
    } else {
      const exists = activeLayers.some((l) => l.id === selectedLayer);
      if (!exists) {
        const fallback = activeLayers[0].id;
        setSelectedLayer(fallback);
        sessionStorage.setItem("selectedLayer", fallback);
      }
    }
  }, [activeLayers, selectedLayer]);

  // Update selected layer manually
  const handleSelected = (layerId) => {
    setSelectedLayer(layerId);
    sessionStorage.setItem("selectedLayer", layerId);
  };

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
