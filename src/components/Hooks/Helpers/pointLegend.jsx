const pointLegend = (data, features = [], layer, groupEn, type) => {
  const handlers = {
    "Instrumental period": () => {
      const getIconSize = (size) => {
        const n = Number(size) || 0;
        if (!size) return { type: "", size: [20, 20] };
        if (n < 3) return { type: "≤ 3 ", size: [20, 20] };
        if (n >= 3 && n < 4) return { type: "3 - 4 ", size: [27, 27] };
        if (n >= 4 && n < 5) return { type: "4 - 5 ", size: [35, 35] };
        if (n >= 5 && n < 6) return { type: "5 - 6 ", size: [40, 40] };
        return { type: "> 6 ", size: [50, 50] };
      };

      const resizeSvg = (sign, size) => {
        const [w, h] = getIconSize(size).size;
        return sign.replace(/<svg\b([^>]*)>/i, `<svg$1 width="${w}" height="${h}">`);
      };

      features.forEach((feature) => {
        const size = feature.properties?.size ?? feature.size;
        const sizedSvg = resizeSvg(feature.sign, size);
        const label = `${getIconSize(size).type} მაგნიტუდა`;

        if (!data.some((d) => d.name === label)) {
          data.push({
            name: label,
            sign: sizedSvg,
            location: "",
            size: getIconSize(size).size,
          });
        }
      });
    },

    "Area monitoring": () => {
      features.forEach((feature) => {
        const { type_ge } = feature.properties || {};
        const sign = feature.sign;
        if (type_ge && !data.some((d) => d.name === type_ge)) {
          data.push({ name: type_ge, sign });
        }
      });
    },

    Hail: () => {
      const getIconSize = (size) => {
        const n = Number(size) || 0;

        if (type === "hail100") {
          if (!size) return { type: "", size: [20, 20] };
          if (n < 1) return { type: "≤ 1 ", size: [15, 15] };
          if (n >= 1 && n < 2) return { type: " 1  -   2 ", size: [21, 21] };
          if (n >= 2 && n < 3) return { type: " 2  -   3 ", size: [26, 26] };
          if (n >= 3 && n < 4) return { type: " 3  -   4 ", size: [32, 32] };
          if (n >= 4 && n < 5) return { type: " 4  -   5 ", size: [37, 37] };
          if (n >= 5 && n < 7) return { type: "  5 -   7 ", size: [43, 43] };
          return { type: "> 7 ", size: [50, 50] };
        }

        // other hail
        if (!size) return { type: "", size: [20, 20] };
        if (n < 1) return { type: "≤ 1 ", size: [15, 15] };
        if (n >= 1 && n < 2) return { type: "1 -  2 ", size: [21, 21] };
        if (n >= 2 && n < 3) return { type: "2  -  3 ", size: [30, 30] };
        if (n >= 3 && n < 4) return { type: "3  -  4 ", size: [40, 40] };
        return { type: "> 4", size: [50, 50] };
      };

      const resizeSvg = (sign, size) => {
        const [w, h] = getIconSize(size).size;
        return sign.replace(/<svg\b([^>]*)>/i, `<svg$1 width="${w}" height="${h}">`);
      };

      features.forEach((feature) => {
        const size = feature.properties?.size ?? feature.size;
        const sizedSvg = resizeSvg(feature.sign, size);
        const label = `${getIconSize(size).type} `;

        if (!data.some((d) => d.name === label)) {
          data.push({
            name: label,
            sign: sizedSvg,
            location: "",
            size: getIconSize(size).size,
          });
        }
      });

      data.sort((a, b) => {
        const aSize = Array.isArray(a?.size) ? Number(a.size[0]) : -Infinity;
        const bSize = Array.isArray(b?.size) ? Number(b.size[0]) : -Infinity;
        return bSize - aSize;
      });
    },

    Geology: () => {
      features.forEach((feature) => {
        const { type_ge, name_ge } = feature.properties || {};
        const sign = feature.sign;
        if (sign && !data.some((d) => d.sign === sign)) {
          data.push({ name: type_ge || name_ge, sign, location: "" });
        }
      });
    },

    "Fresh groundwater": () => {
      features.forEach((feature) => {
        const { name_ge, type_ge, description_ge, location_ge } = feature.properties || {};
        const sign = feature.sign;

        if (!data.some((d) => d.type_ge === type_ge)) {
          data.push({
            name: `${description_ge} ${name_ge}. ${type_ge}`,
            sign,
            location: location_ge || "",
            type_ge, // keep because your condition uses it
          });
        }
      });
    },

    Wars: () => {
      const signs = [];
      const wars = [];
      const restored = [];

      features.forEach((feature) => {
        const { name_ge, index, unicode, type_ge, type_en } = feature.properties || {};
        const sign = feature.sign;

        if (!signs.some((d) => d.sign === sign)) {
          if (type_en !== "Restored") signs.push({ sign, type: type_ge });
        }

        if (!wars.some((d) => d.index === index)) {
          if (type_en !== "Restored") {
            wars.push({ name: name_ge, index, year: unicode, type: type_ge, sign, type_en });
          } else {
            restored.push({ name: name_ge, index, sign, year: unicode, type: type_ge, type_en });
          }
        }
      });

      wars.sort((a, b) => a.year - b.year);
      data.push(signs, wars, restored);
    },

    "Defensive buildings": () => {
      features.forEach((feature) => {
        const { type_ge, location_ge } = feature.properties || {};
        const sign = feature.sign;

        if (sign && !data.some((d) => d.sign === sign)) {
          data.push({ name: type_ge, sign, type: type_ge, location: location_ge || "" });
        }
      });
    },

    "Orthodox church eparchies": () => {
      const signs = [];
      const grouped = {};

      features.forEach((feature) => {
        const { name_ge, unicode, index, type_ge, eparchy } = feature.properties || {};
        const sign = feature.sign;

        if (sign && !signs.some((d) => d.sign === sign)) {
          signs.push({ type: type_ge, sign });
        }

        if (unicode > 0) {
          grouped[eparchy] ||= [];
          if (!grouped[eparchy].some((d) => d.unicode === unicode)) {
            grouped[eparchy].push({ name: name_ge, sign, unicode, index, type: type_ge, eparchy });
          }
        }
      });

      data.push(signs, grouped);
    },
    Germans: () => {
      const signs = [];
      const wars = [];
      const restored = [];

      features.forEach((feature) => {
        const { name_ge, index, unicode, type_ge, type_en } = feature.properties || {};
        const sign = feature.sign;

        if (!signs.some((d) => d.sign === sign)) {
          if (type_en !== "Restored") signs.push({ sign, type: type_ge });
        }

        if (!wars.some((d) => d.index === index)) {
          if (type_en !== "Restored") {
            wars.push({ name: name_ge, index, year: unicode, type: type_ge, sign, type_en });
          } else {
            restored.push({ name: name_ge, index, sign, year: unicode, type: type_ge, type_en });
          }
        }
      });

      wars.sort((a, b) => a.year - b.year);
      data.push(signs, wars, restored);
    },

    default: () => {
      features.forEach((feature) => {
        const { name_ge, location_ge } = feature.properties || {};
        const sign = feature.sign;

        if (name_ge && !data.some((d) => d.name === name_ge)) {
          data.push({ name: name_ge, sign, location: location_ge || "" });
        }
      });
    },
  };

  // choose handler: layer-based has priority, then groupEn-based
  const handler =
    handlers[layer] ||
    handlers[groupEn] ||
    (groupEn === "Hail" ? handlers.Hail : null) ||
    handlers.default;

  handler();
};

export default pointLegend;
