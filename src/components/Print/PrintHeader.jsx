import useMaps from "../Context/MapContext/useMaps";
import { ATLAS_TITLE, getTopLayer, today } from "./printUtils";
import classes from "./Print.module.css";

const PrintHeader = () => {
  const { state } = useMaps();
  const { activeLayers, dataChart } = state;
  const { data: top } = getTopLayer(activeLayers, dataChart);

  return (
    <header className={classes.sheetHeader}>
      <div className={classes.headerLeft}>
        <h1 className={classes.title}>{top?.layerName_ge ?? ATLAS_TITLE}</h1>
        {top?.group_ge && <span className={classes.subtitle}>{top.group_ge}</span>}
      </div>
      <div className={classes.headerRight}>
        {top && `${ATLAS_TITLE} · `}
        {today()}
      </div>
    </header>
  );
};

export default PrintHeader;