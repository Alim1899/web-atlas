import { Stack, FormControlLabel, Switch } from "@mui/material";
import useMaps from "../Map/MapContext/useMaps";
import PropTypes from "prop-types";
import classes from "./ui.module.css";

const SwitchButton = ({ label, switchId, type, children }) => {
  const { state, dispatch } = useMaps();
  const checked = state.activeLayers.some((layer) => layer.id === switchId);
  const handleChecked = () => {
    dispatch({ type: "TOGGLE_LAYER", layerId: switchId });
  };
  return (
    <div className={classes.box}>
      <Stack direction="row">
        <FormControlLabel
          label={label}
          control={
            <Switch id={switchId} onChange={handleChecked} checked={checked} />
          }
        />
        {checked && type === "polygon" && children}
      </Stack>
    </div>
  );
};

SwitchButton.propTypes = {
  label: PropTypes.string.isRequired,
  switchId: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["polygon", "point", "polyline"]).isRequired,
};

export default SwitchButton;
