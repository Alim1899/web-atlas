import { useState } from "react";
import classes from "./ui.module.css";
import { Stack, FormControlLabel, Switch } from "@mui/material";
import Accordion from "./Accordion";
import { useMaps } from "../Map/MapContext/MapContext";
import { getDatabase, get, ref } from "firebase/database";
import app from "../firebaseConfig.js";

const SwitchButton = ({ label, mapChecked, switchId, type }) => {
  const [checked, setChecked] = useState(mapChecked);
  const { dispatch } = useMaps();
  const getMaps = async (id) => {
    dispatch({ type: "loading" });
    const db = getDatabase(app);
    try {
      const projectsRef = ref(db, `geojson/${id}`);
      const snapshot = await get(projectsRef);
      if (snapshot.exists()) {
        dispatch({ type: "loaded" });
        dispatch({ type: id, payload: snapshot.val() });
      } else {
        console.log("No json data available for ");
      }
    } catch (error) {
      console.error("Error fetching json", error);
    }
  };

  const handleChecked = (e) => {
    if (checked) {
      dispatch({ type: `${e.target.id}`, payload: {} });
    } else {
      getMaps(e.target.id);
    }
    setChecked(!checked);
  };

  return (
    <div className={classes.box}>
      <Stack direction="row">
        <FormControlLabel
          label={label}
          control={<Switch id={switchId} />}
          onChange={(e) => handleChecked(e)}
          checked={checked}
        ></FormControlLabel>
        {checked && type === "polygon" && <Accordion />}
      </Stack>
    </div>
  );
};

export default SwitchButton;
