export const sortLegendData = (arr = []) => {
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