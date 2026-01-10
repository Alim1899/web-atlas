import Select from "react-select";
import Nolayer from "../Nolayer";
const MapHeaders = ({
  activeLayers,
  chartData,
  selectedLayer,
  handleSelected,
  selectedChart,
  layer,
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

  return (
    <div>
      {activeLayers.length === 0 ? (
        <Nolayer layer="none" />
      ) : (
        <>
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
          {!selectedChart && <Nolayer layer={layer} />}
          {activeLayers.length > 0 && layer === "info" && (
            <Nolayer layer="info" />
          )}
        </>
      )}
    </div>
  );
};

export default MapHeaders;
