import * as d3 from "d3";

export const geologyScale = d3
  .scaleOrdinal()
  .domain(["K", "Q", "yPz", "J", "P", "PR+Pz1", "N"])
  .range(d3.schemeOranges[7]);

export const agroScale = d3
  .scaleOrdinal()
  .domain(["Cold", "mid_cold", "moderate", "warm"])
  .range(d3.schemeGreens[5]);

export const vegetationScale = d3
  .scaleOrdinal()
  .domain([
    "East Georgian lowland, downhill and superior plateau vegetation",
    "Mountainous forest plants Broadleaf forests",
    "High Mountain vegetation",
    "Steppe vegetation of south Georgian mountains",
    "Bright Coniferous forests",
  ])
  .range(d3.schemeBrBG[9].slice(1));

export function getColor(layerType, layerName) {
  switch (layerType) {
    case "geology":
      return geologyScale(layerName) || "#abccba";
    case "agroclimate":
      return agroScale(layerName) || "#443";
    case "vegetation":
      return vegetationScale(layerName) || "#123321";
    case "hydrogeology":
      return vegetationScale(layerName) || "#fffaaa";
    case "landscape":
      return vegetationScale(layerName) || "#ccbbff";
    default:
      return "#ccc";
  }
}
