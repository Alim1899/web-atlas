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
        if (group === "Farming" || group === "Religy") {
          const ownership = [];
          const status = [];
          const agro = [];
          const benef = [];
          const ethnicity = [];
          const religy = [];
          const name = layer.layerName_en;
          if (name === "Ownership") {
            layer.features.forEach(({ properties }) => {
              const {
                name_ge,
                private_owner,
                state_owner,
                color_one,
                color_two,
              } = properties;
              ownership.push({
                name_ge,
                კერძო: private_owner,
                სახელმწიფო: state_owner,
                color: { first: color_one, second: color_two },
              });
              summarized[name] = ownership;
            });
          } else if (name === "Status") {
            layer.features.forEach(({ properties }) => {
              const {
                name_ge,
                color_one,
                color_two,
                legal_farm,
                household_farm,
              } = properties;
              status.push({
                name_ge,
                "შინა მეურნეობა": household_farm,
                "იურიდიული პირი": legal_farm,
                color: { first: color_one, second: color_two },
              });
              summarized[name] = status;
            });
          } else if (name === "Agroforms") {
            layer.features.forEach(({ properties }) => {
              const {
                name_ge,
                color_one,
                color_two,
                color_three,
                color_four,
                greenhouse,
                arable,
                natural,
                parennial,
              } = properties;
              agro.push({
                name_ge,
                "სათიბი და საძოვარი": natural,
                ისახნავი: arable,
                "მრავალწლიანი ნარგავი": parennial,
                სათბური: greenhouse,
                color: {
                  first: color_one,
                  second: color_two,
                  third: color_three,
                  fourth: color_four,
                },
              });
              summarized[name] = agro;
            });
          }
          if (name === "Beneficiars") {
            layer.features.forEach(({ properties }) => {
              const {
                name_ge,
                color_one,
                color_two,
                color_three,
                agro_credit,
                agro_insurance,
                plant_future,
              } = properties;
              benef.push({
                name_ge,
                "დანერგე მომავალი": plant_future,
                "აგრო დაზღვევა": agro_insurance,
                "შეღავათიანი აგროკრედიტი": agro_credit,
                color: {
                  first: color_one,
                  second: color_two,
                  third: color_three,
                },
              });
              summarized[name] = benef;
            });
          } else if (name === "Religy") {
            layer.features.forEach(({ properties }) => {
              const {
                name_ge,
                color_one,
                color_two,
                color_three,
                color_four,
                Muslim,
                Orthodox,
                armenian,
                other,
              } = properties;
              religy.push({
                name_ge,
                მართლმადიდებულური: Orthodox,
                მუსლიმური: Muslim,
                "სომხური-სამოციქულო": armenian,
                სხვა: other,
                color: {
                  first: color_one,
                  second: color_two,
                  third: color_three,
                  color_four,
                },
              });
              summarized[name] = religy;
            });
          }else if (name === "Ethnics") {
            layer.features.forEach(({ properties }) => {
              const {
                name_ge,
                color_one,
                color_two,
                color_three,
                color_four,
                armenian,
                azerbaijan,
                georgian,
                others,
              } = properties;
              ethnicity.push({
                name_ge,
                ქართველი: georgian,
                აზერბაიჯანელი: azerbaijan,
                "სომეხი": armenian,
                სხვა: others,
                color: {
                  first: color_one,
                  second: color_two,
                  third: color_three,
                  color_four,
                },
              });
              summarized[name] = ethnicity;
            });
          }
        } else if (group === "Merital") {
          const merital = [];
          const name = layer.layerName_en;

          layer.features.forEach(({ properties }) => {
            const {
              name_ge,

              married_old,
              married_new,

              divorced_old,
              divorced_new,

              unmarried_old,
              unmarried_new,

              widowed_old,
              widowed_new,

              no_info_old,
              no_info_new,

              color_one,
              color_two,
              color_three,
              color_four,
              color_five,
            } = properties;

            merital.push({
              name_ge,

              old: {
                "იმყოფება ქორწინებაში": married_old,
                "არასოდეს ყოფილა ქორწინებაში": unmarried_old,
                ქვრივი: widowed_old,
                "განქორწინებული, განშორებული": divorced_old,
                "არ არის მითითებული": no_info_old,

                color: {
                  first: color_one,
                  second: color_two,
                  third: color_three,
                  fourth: color_four,
                  fifth: color_five,
                },
              },

              new: {
                "იმყოფება ქორწინებაში": married_new,
                "არასოდეს ყოფილა ქორწინებაში": unmarried_new,
                ქვრივი: widowed_new,
                "განქორწინებული, განშორებული": divorced_new,
                "არ არის მითითებული": no_info_new,

                color: {
                  first: color_one,
                  second: color_two,
                  third: color_three,
                  fourth: color_four,
                  fifth: color_five,
                },
              },
            });
          });

          summarized[name] = merital;
        } else if (group === "Population") {
          const birthrate = [];
          const pplchange = [];
          const name = layer.layerName_en;
          layer.features.forEach(({ properties }) => {
            const {
              name_ge,
              rate_one,
              type_en,
              rate_two,
              color_one,
              color_two,
              color,
            } = properties;
            if (name === "Birth rate" || name === "Death rate") {
              birthrate.push({
                name_ge,
                old: {
                  rate: rate_one,
                  color: {
                    first: color_one,
                    second: color_two,
                  },
                },
                new: {
                  rate: rate_two,
                  color: {
                    first: color_one,
                    second: color_two,
                  },
                },
              });
              summarized[name] = birthrate;
            } else if (name === "Population change") {
              pplchange.push({ name_ge: name_ge, rate: type_en, color: color });
              summarized[name] = pplchange;
            }
          });
        } else if (group === "Settlements") {
          const cName = layer.layerName_en;
          const densities = [];
          const change = [];
          if (cName === "Density") {
            layer.features.forEach(({ properties }) => {
              const { name_ge, color, density } = properties;
              densities.push({ name_ge: name_ge, rate: density, color: color });
              summarized[cName] = densities;
            });
          } else if (cName === "City population") {
            layer.features.forEach(({ properties }) => {
              const { name_ge, color_one, color_two, size_old, size_new } =
                properties;
              change.push({
                name_ge: name_ge,
                rate: { size_old, size_new },
                color: [color_one, color_two],
              });
              summarized[cName] = change;
            });
          }
        } else if (group === "Migrants") {
          const migrants = [];
          layer.features.forEach(({ properties }) => {
            const { name_ge, color_one, color_two, conflict, natural } =
              properties;
            migrants.push({
              name_ge: name_ge,
              old: {
                rate: conflict,
                color: { first: color_one, second: color_two },
              },
              new: {
                rate: natural,
                color: { first: color_one, second: color_two },
              },
              rate: { size_old: conflict, size_new: natural },
              color: [color_one, color_two],
            });
            summarized[migrants] = migrants;
          });
        } else if (group === "Precipitation") {
          layer.features.forEach(({ properties }) => {
            const { name_ge, description_en, color, area, index } = properties;
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
          });
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
                area: Number(area)?.toFixed(2) || "",
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
          header: header,
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
