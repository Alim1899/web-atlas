import chart from "../../assets/chart.svg";
import layers from "../../assets/sidebar/layers.svg";
import legend from "../../assets/sidebar/legend.svg";
import { useState } from "react";
import classes from "./Sidebar.module.css";
import Layers from "./Layers";
import Chart from "./Chart/Chart";
import Legend from "./Legend/Legend";
const Sidebar = () => {
  const [showChart, setShowChart] = useState(false);
  const [showLayer, setShowLayer] = useState(false);
  const [showLegend, setShowLegend] = useState(false);
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
    <div className={classes.main}>
      <img
        onClick={(e) => handleChart(e)}
        className={classes.icon}
        src={chart}
        alt="pie-chart"
      />
      <img
        onClick={(e) => handleLayers(e)}
        className={classes.icon}
        src={layers}
        alt="layers"
      />
      <img
        onClick={(e) => handleLegend(e)}
        className={classes.icon}
        src={legend}
        alt="pie-chart"
      />
      {showChart && <Chart handleChart={handleChart} />}
      {showLayer && <Layers />}
      {showLegend && <Legend onCloseModal={handleLegend} />}
    </div>
  );
};

export default Sidebar;
