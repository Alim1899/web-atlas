import chart from "../../assets/chart.svg";
import layers from "../../assets/sidebar/layers.svg";
import { useState } from "react";
import classes from "./Sidebar.module.css";
import Layers from "./Layers";
import Chart from "./Chart";
const Sidebar = () => {
  const [showChart, setShowChart] = useState(false);
  const [showLayer, setShowLayer] = useState(false);
  const handleChart = (e) => {
    e.preventDefault();
    setShowChart(!showChart);
  };
  const handleLayers = (e) => {
    e.preventDefault();
    setShowLayer(!showLayer);
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
      {showChart && <Chart handleChart={handleChart} />}
      {showLayer && <Layers />}
    </div>
  );
};

export default Sidebar;
