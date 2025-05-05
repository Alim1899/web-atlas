import chart from "../../assets/chart.svg";
import layers from "../../assets/sidebar/layers.svg";
import info from "../../assets/sidebar/info.svg";

import legend from "../../assets/sidebar/legend.svg";
import right from "../../assets/sidebar/up.png";
import left from "../../assets/sidebar/down.png";

import { useState } from "react";
import classes from "./Sidebar.module.css";
import Layers from "./Layers";
import Chart from "./Chart/Chart";
import Legend from "./Legend/Legend";
const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [showLayer, setShowLayer] = useState(false);
  const [showLegend, setShowLegend] = useState(false);
  const openSidebar = (e) => {
    e.preventDefault();
    if (showSidebar) return;
    setShowSidebar(true);
  };
  const closeSidebar = (e) => {
    e.preventDefault();
    if (!showSidebar) return;
    setShowSidebar(false);
  };
  const handleChart = (e) => {
    e.preventDefault();
    setShowChart(!showChart);
  };
  const handleLayers = (e) => {
    e.preventDefault();
    setShowLayer(!showLayer);
  };
  const handleLegend = (e) => {
    e.preventDefault();
    setShowLegend(!showLegend);
  };
  return (
    <aside className={classes.main}>
      {showSidebar ? (
        <article className={classes.content}>
          <div className={classes.closeIcon} onClick={closeSidebar}>
            <img src={right} className={classes.close} />
          </div>
          <div className={classes.icons}>
            <img
              onClick={handleChart}
              className={classes.icon}
              src={chart}
              alt="დიაგრამა"
              title="დიაგრამა"
            />
            <img
              onClick={handleLayers}
              className={classes.icon}
              src={layers}
              alt="layers"
              title="ფენები"
            />
            <img
              onClick={handleLegend}
              className={classes.icon}
              src={legend}
              alt="legend"
              title="ლეგენდა"
            />
            <img
              onClick={handleLegend}
              className={classes.icon}
              src={info}
              alt="info"
              title="ინფორმაცია"
            />
          </div>

          {showChart && <Chart handleChart={handleChart} />}
          {showLayer && <Layers />}
          {showLegend && <Legend onCloseModal={handleLegend} />}
        </article>
      ) : (
        <div className={classes.toggleWrapper} onClick={openSidebar}>
          <img src={left} alt="open" title="გახსნა" className={classes.open} />
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
