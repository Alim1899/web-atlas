import Select from "react-select";
import Nolayer from "../Nolayer";
import useMaps from "../../Context/MapContext/useMaps";
const MapHeaders = ({
  selectedLayer,
  handleSelected,
  selectedChart,
  layer,
}) => {
   const {state} = useMaps();
   const {activeLayers} = state;

  const options = [...activeLayers]
    .sort((a, b) => a.id.localeCompare(b.id))
    .map((el) => {
   
      return {
        value: el.id,
        label: el.label
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
      
              return (
                <div style={{ fontWeight: "900" }}>
               <option style={{fontSize:"1rem",fontWeight:"900"}}>{option.label}</option>
                 
                </div>
              );
            }}
          />
          {!selectedChart  && <Nolayer layer={layer} />}
          
        </>
      )}
    </div>
  );
};

export default MapHeaders;
