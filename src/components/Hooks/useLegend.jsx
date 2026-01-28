import useMaps from "../Context/MapContext/useMaps";
const useLegend = () => {
  const { state } = useMaps();
  const {dataChart } = state;

  const legendData = dataChart.map((el) => {
    const shape = el[1].shape;
    const data = [];
    const features = el[1].features;
    if (shape === "polygon") {
      features.map((feature) => {
        const props = feature.properties;
        const { name_ge, description_ge, color } = props;
        if (description_ge) {
          if (
            !data.some((el) => el.txt === description_ge && el.color === color)
          ) {
            data.push({ txt: description_ge, color });
          }
        } else if (name_ge) {
          
          if (!data.some((el) => el.txt === name_ge && el.color === color)) {
            data.push({ txt: name_ge, color });
          }
        }
      });
    } else if (shape === "points") {
      features.map((feature) => {
        const sign = feature.sign;
        const props = feature.properties;

        const { name_ge, location_ge } = props;

        data.push({ name: name_ge, sign: sign, location: location_ge || "" });
      });
    }
    return { name: el[0],shape:shape, data: data };
  });

  return {
   
    legendData
  };
};
export default useLegend;
