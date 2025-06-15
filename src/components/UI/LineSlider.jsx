import { Slider } from "@mui/material";
import useMaps from "../Map/MapContext/useMaps"; // Import your map context
import classes from "./ui.module.css";
const DiscreteSlider = ({ layerId }) => {
  const { state, dispatch } = useMaps();

  const layerState = state.activeLayers.find(
    (layer) => layer.id === layerId
  ) || { opacity: 1, weight: 0.5 };
  const onOpacityChange = (e, newValue) => {
    dispatch({ type: "SET_OPACITY", layerId, payload: newValue / 100 });
  };

  const onWeightChange = (e, newValue) => {
    dispatch({ type: "SET_WEIGHT", layerId, payload: newValue });
  };
  return (
    <div className={classes.lineSlider}>
      <label htmlFor="opacity">
        <h6>გამჭვირვალობა</h6>
        <Slider
          id="opacity"
          aria-label="opacity"
          value={layerState.opacity * 100} // Convert to percentage
          onChange={onOpacityChange}
          step={10}
          marks
          min={10}
          max={100}
        />
      </label>
      <label htmlFor="weight">
        <h6>ხაზის სისქე</h6>
        <Slider
          id="weight"
          aria-label="linewidth"
          value={layerState.weight}
          onChange={onWeightChange}
          valueLabelDisplay="auto"
          step={0.1}
          marks
          min={0.1}
          max={1}
        />
      </label>
    </div>
  );
};
export default DiscreteSlider;
