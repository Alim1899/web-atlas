import Slider from "@mui/material/Slider";
import classes from "./ui.module.css";
import PropTypes from "prop-types";
export default function DiscreteSlider({ opacity, weight }) {
  const onOpacityChange = (e) => {
    console.log(e.target.value);
  };
  const onWeightChange = (e) => {
    console.log(e.target.value);
  };
  return (
    <div className={classes.lineSlider}>
      <label htmlFor="opacity">
        <h6 style={{ fontSize: "10px", textAlign: "center" }}>გამჭვირვალობა</h6>
        <Slider
          id="opacity"
          aria-label="opacity"
          value={opacity}
          onChange={onOpacityChange}
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
          onChange={onWeightChange}
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

DiscreteSlider.propTypes = {
  opacity: PropTypes.number.isRequired,
  weight: PropTypes.number.isRequired,
};
