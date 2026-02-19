const polygonLegend = ( data, features,groupEn,layer ) => {
   if (groupEn === "Geology") {
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
        } else if (groupEn=== "Precipitation") {
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
        } else if (layer === "Agroclimatic Zones") {
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
};
export default polygonLegend;
