import { useState } from "react";
import classes from "./ui.module.css";
import { Stack, FormControlLabel, Switch } from "@mui/material";
import Accordion from "./Accordion";
import { useMaps } from "../Map/MapContext/MapContext";
import PropTypes from "prop-types";

const SwitchButton = ({ label, mapChecked, switchId, type }) => {
  const [checked, setChecked] = useState(mapChecked);
  const { dispatch, fetchMaps } = useMaps();

  const handleChecked = () => {
    setChecked((prev) => !prev);

    if (!checked) {
      fetchMaps(switchId, dispatch); // Fetch map data
    } else {
      dispatch({ type: switchId, payload: {} }); // Remove layer
    }
  };

  return (
    <div className={classes.box}>
      <Stack direction="row">
        <FormControlLabel
          label={label}
          control={<Switch id={switchId} />}
          onChange={handleChecked}
          checked={checked}
        />
        {checked && type === "polygon" && <Accordion />}
      </Stack>
    </div>
  );
};

SwitchButton.propTypes = {
  label: PropTypes.string.isRequired,
  mapChecked: PropTypes.bool.isRequired,
  switchId: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["polygon", "point", "polyline"]).isRequired,
};

export default SwitchButton;
