export const ATLAS_TITLE = "ქვემო ქართლის რეგიონის ინტერაქტიული ატლასი";
export const DEFAULT_SOURCE = "ქვემო ქართლის რეგიონის ატლასი";

export const today = () => new Date().toLocaleDateString("ka-GE");

// ბოლოს ჩართული ფენა და მისი მონაცემი
export const getTopLayer = (activeLayers, dataChart) => {
  const id = activeLayers.at(-1)?.id;
  const data = dataChart.find(([key]) => key === id)?.[1];
  return { id, data };
};