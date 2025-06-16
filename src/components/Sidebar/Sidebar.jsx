import useChartData from "../Hooks/useChartData";
import {
  FaChevronUp,
  FaChevronDown,
  FaLayerGroup,
  FaMap,
  FaInfoCircle,
  FaChartPie,
} from "react-icons/fa";

import { useState } from "react";
import classes from "./Sidebar.module.css";
import Layers from "./Layers";
import Chart from "./Chart/Chart";
import Legend from "./Legend/Legend";
import Info from "./Legend/Info";
const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [showLayer, setShowLayer] = useState(false);
  const [showLegend, setShowLegend] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
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
  const handleInfo = (e) => {
    e.preventDefault();
    setShowInfo(!showInfo);
  };
  const {
    chartData,
    selectedLayer,
    selectedChart,
    activeLayers,
    handleSelected,
  } = useChartData();
  return (
    <aside className={classes.main}>
      {showSidebar ? (
        <article className={classes.content}>
          <div className={classes.closeIcon} onClick={closeSidebar}>
            <FaChevronUp className={classes.close} />
          </div>
          <div className={classes.icons}>
            <FaChartPie
              onClick={handleChart}
              className={classes.icon}
              alt="დიაგრამა"
              title="დიაგრამა"
            />

            <FaLayerGroup
              onClick={handleLayers}
              className={classes.icon}
              alt="layers"
              title="ფენები"
            />

            <FaMap
              onClick={handleLegend}
              className={classes.icon}
              alt="legend"
              title="ლეგენდა"
            />

            <FaInfoCircle
              onClick={handleInfo}
              className={classes.icon}
              alt="info"
              title="ინფორმაცია"
            />
          </div>

          {showChart && (
            <Chart
              handleChart={handleChart}
              chartData={chartData}
              activeLayers={activeLayers}
              selectedLayer={selectedLayer}
              handleSelected={handleSelected}
            />
          )}
          {showLayer && <Layers />}
          {showLegend && (
            <Legend onCloseModal={handleLegend} selectedChart={selectedChart} />
          )}
          {showInfo && (
            <Info onCloseModal={handleInfo} selectedChart={selectedChart} />
          )}
        </article>
      ) : (
        <div className={classes.toggleWrapper} onClick={openSidebar}>
          <FaChevronDown alt="open" title="ჩამოშალე" className={classes.open} />
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
