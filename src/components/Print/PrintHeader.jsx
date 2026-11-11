import useMaps from "../Context/MapContext/useMaps";
import { ATLAS_TITLE, getTopLayer, today } from "./printUtils";
import classes from "./Print.module.css";
import { getLayerYear } from "../Map/Map/Styling/StylesForLayer/YearLayer";
import { layerConfig } from "../Map/data/layerConfig";
const PrintHeader = () => {
  const { state } = useMaps();
  const { activeLayers, dataChart } = state;
const { id: topId, data: top } = getTopLayer(activeLayers, dataChart);
const year = getLayerYear(layerConfig[topId], state.layerYear, topId);
const subtitle = [top?.group_ge, year?.label].filter(Boolean).join(" · ");

  return (
    <header className={classes.sheetHeader}>
      <div className={classes.headerLeft}>
        <h1 className={classes.title}>{top?.layerName_ge ?? ATLAS_TITLE}</h1>
{subtitle && <span className={classes.subtitle}>{subtitle}</span>}      </div>
      <div className={classes.headerRight}>
        {top && `${ATLAS_TITLE} · `}
        {today()}
      </div>
    </header>
  );
};

export default PrintHeader;