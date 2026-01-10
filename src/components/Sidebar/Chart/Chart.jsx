// Chart.jsx
import classes from "./Chart.module.css";
import ChartPie from "./Pie";
import Nolayer from "../Nolayer";
import Select from "react-select";
import DraggableContainer from "../Helpers/DraggableContainer";

const Chart = ({
  handleChart,
  chartData,
  activeLayers,
  selectedLayer,
  handleSelected,
}) => {
  const options = [...activeLayers]
    .sort((a, b) => a.id.localeCompare(b.id))
    .map((el) => {
      const hasChart = chartData.some((chart) => chart.id === el.id);
      return {
        value: el.id,
        label: `${el.label} ${hasChart ? "" : "⚠️ No Data"}`,
      };
    });
  const selectedChart = chartData.find((el) => el.id === selectedLayer);
  return (
    <DraggableContainer header="დიაგრამა" handleChart={handleChart}>
      {activeLayers.length === 0 ? (
        <Nolayer layer="none" />
      ) : (
        <div className={classes.chart}>
          <Select
            value={options.find((option) => option.value === selectedLayer)}
            onChange={(selectedOption) => handleSelected(selectedOption.value)}
            options={options}
            formatOptionLabel={(option) => {
              const [id, warning] = option.label.split(" ⚠️ ");
              return (
                <div style={{ fontWeight: "900" }}>
                  {id}
                  {warning && (
                    <span style={{ color: "red", fontSize: "0.7em" }}>
                      {" "}
                      ⚠️ {warning}
                    </span>
                  )}
                </div>
              );
            }}
          />

          {selectedChart ? (
            <div className={classes.diagram}>
              <ChartPie
                key={selectedChart.id}
                data={Object.values(selectedChart.data)}
                dataKey="totalArea"
                nameKey="nameGe"
              />
            </div>
          ) : (
            <Nolayer layer="have" />
          )}
        </div>
      )}
    </DraggableContainer>
  );
};

export default Chart;
