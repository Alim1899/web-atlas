import MeritalChart from "./ChartsForLayer/MeritalChart";
import ConfigBarChart from "./ChartsForLayer/ConfigBarChart";
import ConfigMatrixChart from "./ChartsForLayer/ConfigMatrixChart";
import ClassChangeChart from "./ChartsForLayer/ClassChangeChart";
import ClassListChart from "./ChartsForLayer/ClassListChart";
import AreaShareChart from "./ChartsForLayer/AreaShareChart";
import StackChart from "./ChartsForLayer/StackChart";
import { layerConfig } from "../../Map/data/layerConfig";

// ფენის დიაგრამის არჩევა: ჯერ კონფიგი, შემდეგ ქორწინებრივი,
// დანარჩენი — კლასების წილი ფართობში (useChartData → areaRows)
const ChartPie = ({ selectedLayer, data, compact = false }) => {
  const cfg = layerConfig[selectedLayer];
  if (cfg?.noChart) return null;

  const ch = cfg?.chart ?? cfg?.panelChart;
  if (ch)
    return ch.type === "wheel" ? (
      <ConfigMatrixChart data={data} chart={ch} compact={compact} />
    ) : (
      <ConfigBarChart data={data} chart={ch} compact={compact} />
    );

  if (cfg?.stack) return <StackChart data={data} stack={cfg.stack} compact={compact} />;
  if (cfg?.years)
    return <ClassChangeChart data={data} years={cfg.years} compact={compact} />;
  if (cfg?.classList) return <ClassListChart data={data} compact={compact} />;

  if (["meritalmen", "meritalwomen"].includes(selectedLayer))
    return <MeritalChart data={data} layer={selectedLayer} compact={compact} />;

  return <AreaShareChart data={data} compact={compact} />;
};

export default ChartPie;