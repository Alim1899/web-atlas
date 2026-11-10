import { useState } from "react";
import { FaLayerGroup } from "react-icons/fa";
import classes from "./BasemapSwitcher.module.css";
import { basemaps } from "../../../data/layers";
import useMaps from "../../../../Context/MapContext/useMaps";

export default function BasemapSwitcher() {
  const { state, dispatch } = useMaps();
  const [open, setOpen] = useState(false);

  return (
    <div className={classes.wrapper}>
      {open && (
        <ul className={classes.list}>
          {Object.entries(basemaps).map(([id, b]) => (
            <li
              key={id}
              className={state.baselayer.url === b.url ? classes.active : ""}
              onClick={() => {
                dispatch({ type: "SET_MAP", payload: b });
                setOpen(false);
              }}
            >
              {b.name}
            </li>
          ))}
        </ul>
      )}
      <button className={classes.toggle} onClick={() => setOpen((o) => !o)} title="საბაზისო რუკა">
        <FaLayerGroup />
      </button>
    </div>
  );
}