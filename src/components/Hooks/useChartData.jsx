// hooks/useChartData.js
import { useEffect, useMemo, useState } from "react";
import useMaps from "../Context/MapContext/useMaps";

const useChartData = () => {
  const { state } = useMaps();
  const { dataChart, activeLayers } = state;
  const [selectedLayer, setSelectedLayer] = useState(
    sessionStorage.getItem("selectedLayer") || "",
  );

  // Computed chart data
  const chartData = useMemo(() => {
    return dataChart
      .filter((el) => el[1].shape === "polygon")
      .map(([key, layer]) => {
        const summarized = {};
        const layerName = layer.layerName_en;
        const group = layer.group_en;
        const header = layer.legend_header;
        if (group === "Precipitation") {
          
          layer.features.forEach(({properties})=>{
            
            const {name_ge,description_en,color,area,index}= properties;
            
            const name = description_en;
            if (!summarized[name]) {
              summarized[name] = {
                name_ge: description_en || "",
             
                description_en: name_ge ? name_ge : [],
                area: area?.toFixed(2) || "",
                totalArea: 0,
                color,
                index,
              };
            }
               summarized[name].totalArea += area;

          })
          
        } else {
          layer.features.forEach(({ properties }) => {
            const {
              name_ge,
              name_en,
              description_en,
              description_ge,
              area,
              color,
              index,
            } = properties;
            const name = name_ge || name_en;

            if (!summarized[name]) {
              summarized[name] = {
                name_ge: name_ge || "",
                name_en: name_en || "",
                description_en: description_en ? [description_en] : [],
                description_ge: description_ge ? [description_ge] : [],
                area: area?.toFixed(2) || "",
                totalArea: 0,
                color: color,
                index: index,
              };
            } else {
              // Push new descriptions if they are unique
              if (
                description_en &&
                !summarized[name].description_en.includes(description_en)
              ) {
                summarized[name].description_en.push(description_en);
              }
              if (
                description_ge &&
                !summarized[name].description_ge.includes(description_ge)
              ) {
                summarized[name].description_ge.push(description_ge);
              }
            }

            summarized[name].totalArea += properties.area;
          });
        }
        return {
          layerName: layerName || "",
          id: key,
          header:header,
          data: summarized,
        };
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
