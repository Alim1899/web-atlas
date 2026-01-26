import { Stack, FormControlLabel, Switch } from "@mui/material";
import useMaps from "../Context/MapContext/useMaps";
import classes from "./ui.module.css";
const SwitchButton = ({ label, switchId, type, children }) => {
  const { state, dispatch } = useMaps();
  const { activeLayers } = state;

  const checked = activeLayers.some((layer) => layer.id === switchId);

  


  const handleChecked = () => {
  // Find chart data for this layer
  const chartEntry = state.dataChart.find(([id, ]) => id === switchId);
  const info = chartEntry?.[1]?.info || "";
  const group = chartEntry?.[1]?.group || "";

  dispatch({
    type: "TOGGLE_LAYER",
    layerId: switchId,
    label,
    info,
    group,
  });
};


  return (
    <div className={classes.box}>
      <Stack direction="row">
        <FormControlLabel
          label={label}
          control={
            <Switch id={switchId} checked={checked} onChange={handleChecked} />
          }
        />
        {checked && type === "polygon" && children}
      </Stack>
    </div>
  );
};

export default SwitchButton;
