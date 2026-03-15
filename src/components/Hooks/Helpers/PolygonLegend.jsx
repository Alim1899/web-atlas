const polygonLegend = (data, features, groupEn, layer) => {
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
  } else if (groupEn === "Fresh groundwater" || groupEn === "Geomorphology") {
    const grouped = [];
    features.forEach((feature) => {
      const { name_ge, unicode, description_ge, subheader, color, index } =
        feature.properties;

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
        .sort((a, b) => (a.items[0]?.index ?? 0) - (b.items[0]?.index ?? 0)),
    );
  } else if (groupEn === "Precipitation") {
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
        .sort((a, b) => (a.items[0]?.index ?? 0) - (b.items[0]?.index ?? 0)), // sort groups by first index
    );
  } else if (groupEn === "Warm days") {
    features.forEach((feature) => {
      const { name_ge, description_ge, color } = feature.properties;
      const txt = description_ge || name_ge;

      if (txt && !data.some((d) => d.txt === txt && d.color === color)) {
        data.push({ txt, color });
      }
    });
  } else if (groupEn === "Botanics") {
    let i = 1;
    features.forEach((feature) => {
      const { name_ge, description_ge, color, index, unicode } =
        feature.properties;
      const txt = description_ge || name_ge;
      if (txt && !data.some((d) => d.txt === txt && d.color === color)) {
        data.push({
          txt,
          color,
          index: index || i,
          unicode: unicode || index || i,
        });
        i++;
      }
    });

    data.sort((a, b) => (a.index ?? 0) - (b.index ?? 0));
  } else if (groupEn === "Farming") {
    const { color_one, color_two, color_three, color_four, index } =
      features[0].properties;
    if (layer === "Ownership") {
      data.push({ txt: "კერძო საკუთრება", color: color_one, index });
      data.push({ txt: "სახელმწიფო საკუთრება", color: color_two, index });
    } else if (layer === "Status") {
      data.push({ txt: "შინა მეურნეობა", color: color_one, index });
      data.push({ txt: "იურიდიული პირი", color: color_two, index });
    } else if (layer === "Agroforms") {
      data.push({
        txt: "ბუნებრივი სათიბი და საძოვარი",
        color: color_one,
        index,
      });
      data.push({ txt: "სახნავი", color: color_two, index });
      data.push({ txt: "მრავალწლიანი ნარგავი", color: color_three, index });
      data.push({ txt: "სათბური", color: color_four, index });
    } else if (layer === "Beneficiars") {
      data.push({ txt: "დანერგე მომავალი", color: color_one, index });
      data.push({ txt: "აგროდაზღვევა", color: color_two, index });
      data.push({ txt: "შეღავათიანი აგროკრედიტი", color: color_three, index });
    }
  } else if (groupEn === "Sunshine") {
    let i = 1;
    features.forEach((feature) => {
      const { name_ge, color, index } = feature.properties;

      const txt = name_ge;
      if (txt && !data.some((d) => d.txt === txt && d.color === color)) {
        data.push({ txt, color, index: index || i, unicode: index });
        i++;
      }
    });

    data.sort((a, b) => (a.index ?? 0) - (b.index ?? 0));
  } else if (groupEn === "Merital") {
    features.forEach((feature) => {
      const { color_one, color_two, color_three, color_four, color_five } =
        feature.properties;

      const items = [
        { txt: "იმყოფება ქორწინებაში", color: color_one, index: 1 },
        { txt: "არასოდეს ყოფილა ქორწინებაში", color: color_two, index: 2 },
        { txt: "ქვრივი", color: color_three, index: 3 },
        { txt: "განქორწინებული, განშორებული", color: color_four, index: 4 },
        { txt: "არ არის მითითებული", color: color_five, index: 5 },
      ];

      items.forEach((item) => {
        const exists = data.some((d) => d.index === item.index);

        if (!exists) {
          data.push(item);
        }
      });
    });

    data.sort((a, b) => (a.index ?? 0) - (b.index ?? 0));
  } else if (groupEn === "Population") {
    const getValue = (txt) => {
      if (txt.startsWith(">")) return parseFloat(txt.replace(">", ""));
      if (txt.includes("-")) return parseFloat(txt.split("-")[1]);
      return parseFloat(txt);
    };
    if (layer === "Death rate") {
      const legendMap = new Map();

      features.forEach((feature) => {
        const { rate_one, rate_two, color_one, color_two } = feature.properties;

        if (rate_one && !legendMap.has(rate_one)) {
          legendMap.set(rate_one, { txt: rate_one, color: color_one });
        }

        if (rate_two && !legendMap.has(rate_two)) {
          legendMap.set(rate_two, { txt: rate_two, color: color_two });
        }
      });

      const arr = Array.from(legendMap.values());
      arr.sort((a, b) => getValue(b.txt) - getValue(a.txt));

      arr.forEach((d, i) => {
        data.push({
          txt: d.txt,
          color: d.color,
          index: i + 1,
          unicode: d.txt,
        });
      });
    }
    if (layer === "Birth rate") {
      const legendMap = new Map([
        ["> 14.5", { txt: "> 14.5", color: "#e5738a" }],
        ["13.1 - 14.4", { txt: "13.1 - 14.4", color: "#e996a8" }],
        ["11.5 - 12.9", { txt: "11.5 - 12.9", color: "#efb7c3" }],
        ["10.0 - 11.4", { txt: "10.0 - 11.4", color: "#e6cfd5" }],
        ["< 9.9", { txt: "< 9.9", color: "#e0e0e0" }],
      ]);
      const arr = Array.from(legendMap.values());
      arr.sort((a, b) => getValue(b.txt) - getValue(a.txt));

      arr.forEach((d, i) => {
        data.push({
          txt: d.txt,
          color: d.color,
          index: i + 1,
          unicode: d.txt,
        });
      });
    }
    if(layer==='Population change'){
      const grouped = {}
      features.forEach((feature) => {
        const {color,type_en,sub_header,index } = feature.properties;
const txt =  type_en;
 const key = sub_header || "";
      if (!grouped[key]) {
        grouped[key] = [];
      }

      // avoid duplicates
      const exists = grouped[key].some(
        (d) => d.txt === txt && d.color === color,
      );
      if (!exists) {
        grouped[key].push({ txt, color, subheader:sub_header, index });
      }
      });
      
       data.push(
      ...Object.entries(grouped)
        .map(([subheader, items]) => ({
          subheader,
          items: items.sort((a, b) => (a.index ?? 0) - (b.index ?? 0)), // sort inside each group
        }))
        .sort((a, b) => (a.items[0]?.index ?? 0) - (b.items[0]?.index ?? 0)), // sort groups by first index
    );
    }
  } else {
    let i = 1;
    features.forEach((feature) => {
      const { name_ge, description_ge, color, index } = feature.properties;

      const txt = description_ge || name_ge;
      if (txt && !data.some((d) => d.txt === txt && d.color === color)) {
        data.push({ txt, color, index: index || i, unicode: i });
        i++;
      }
    });

  }
};
export default polygonLegend;
