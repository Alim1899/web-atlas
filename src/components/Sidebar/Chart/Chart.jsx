import classes from "./Chart.module.css";
import ChartPie from "./Pie";
import DraggableContainer from "../Helpers/DraggableContainer";
import MapHeaders from "../Helpers/MapHeaders";

const Chart = ({ chartData, activeLayers, selectedLayer, handleSelected }) => {
  const selectedChart = chartData.find((el) => el.id === selectedLayer);
  return (
    <DraggableContainer header="დიაგრამა">
      <div className={classes.chart}>
        <MapHeaders
          activeLayers={activeLayers}
          chartData={chartData}
          selectedLayer={selectedLayer}
          handleSelected={handleSelected}
          selectedChart={selectedChart}
          layer="diagram"
        />

        {selectedChart && (
          <div className={classes.diagram}>
            <ChartPie
              key={selectedChart.id}
              data={Object.values(selectedChart.data)}
              dataKey="totalArea"
              nameKey="nameGe"
            />
          </div>
        )}
      </div>
    </DraggableContainer>
  );
};

export default Chart;
