import Slider from "@mui/material/Slider";
import classes from "./ui.module.css";
import { useMaps } from "../Map/MapContext/MapContext";
export default function DiscreteSlider() {
  const { state, dispatch } = useMaps();
  const { opacity, weight } = state;
  return (
    <div className={classes.lineSlider}>
      <label htmlFor="opacity">
        <h6 style={{ fontSize: "10px", textAlign: "center" }}>გამჭვირვალობა</h6>
        <Slider
          id="opacity"
          aria-label="opacity"
          value={opacity}
          onChange={(e) =>
            dispatch({ type: "change/opacity", payload: e.target.value })
          }
          valueLabelDisplay="auto"
          step={10}
          marks
          min={10}
          max={100}
        />
      </label>
      <label htmlFor="weight">
        <h6 style={{ fontSize: "10px", textAlign: "center" }}>ხაზის სისქე</h6>
        <Slider
          id="weight"
          aria-label="linewidth"
          value={weight}
          onChange={(e) =>
            dispatch({ type: "change/weight", payload: e.target.value })
          }
          valueLabelDisplay="auto"
          step={10}
          marks
          min={10}
          max={100}
        />
      </label>
    </div>
  );
}
