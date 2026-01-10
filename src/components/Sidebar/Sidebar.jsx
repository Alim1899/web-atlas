import useChartData from "../Hooks/useChartData";
import {
  FaChevronUp,
  FaChevronDown,
  FaLayerGroup,
  FaMap,
  FaInfoCircle,
  FaChartPie,
} from "react-icons/fa";

import classes from "./Sidebar.module.css";
import Layers from "./Layers";
import Chart from "./Chart/Chart";
import Legend from "./Legend/Legend";
import Info from "./Legend/Info";
import useRightBar from "../Context/RightBarContext/useRightBar";

const Sidebar = () => {
  const { state: rightBarState, dispatch: rightBarDispatch } = useRightBar();
  const { isExpanded, activePanel } = rightBarState;

  const {
    chartData,
    selectedLayer,
    selectedChart,
    activeLayers,
    handleSelected,
  } = useChartData();

  const toggleExpand = () => {
    rightBarDispatch({ type: "TOGGLE_EXPAND" });
  };

  const togglePanel = (panel) => {
    rightBarDispatch({ type: "TOGGLE_PANEL", payload: panel });
  };

  return (
    <aside className={classes.main}>
      {isExpanded ? (
        <article className={classes.content}>
          <div className={classes.closeIcon} onClick={toggleExpand}>
            <FaChevronUp className={classes.close} />
          </div>

          <div className={classes.icons}>
            <FaChartPie
              onClick={() => togglePanel("chart")}
              className={classes.icon}
              title="დიაგრამა"
            />

            <FaLayerGroup
              onClick={() => togglePanel("layers")}
              className={classes.icon}
              title="ფენები"
            />

            <FaMap
              onClick={() => togglePanel("legend")}
              className={classes.icon}
              title="ლეგენდა"
            />

            <FaInfoCircle
              onClick={() => togglePanel("info")}
              className={classes.icon}
              title="ინფორმაცია"
            />
          </div>

          {activePanel === "chart" && (
            <Chart
              selectedChart={selectedChart}
              chartData={chartData}
              activeLayers={activeLayers}
              selectedLayer={selectedLayer}
              handleSelected={handleSelected}
            />
          )}

          {activePanel === "layers" && <Layers />}

          {activePanel === "legend" && (
            <Legend
              selectedChart={selectedChart}
              chartData={chartData}
              activeLayers={activeLayers}
              selectedLayer={selectedLayer}
              handleSelected={handleSelected}
            />
          )}

          {activePanel === "info" && (
            <Info
              selectedChart={selectedChart}
              chartData={chartData}
              activeLayers={activeLayers}
              selectedLayer={selectedLayer}
              handleSelected={handleSelected}
            />
          )}
        </article>
      ) : (
        <div className={classes.toggleWrapper} onClick={toggleExpand}>
          <FaChevronDown title="ჩამოშალე" className={classes.open} />
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
