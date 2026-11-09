import { basemaps } from "../Map/data/layers";
import classes from "./Sidebar.module.css";
import useMaps from "../Context/MapContext/useMaps";
const Layers = () => {
  const { dispatch } = useMaps();

  return (
    <ul className={classes.layers}>
   {Object.entries(basemaps).map(([id, b]) => (
  <li key={id} onClick={() => dispatch({ type: "SET_MAP", payload: b })}>
    {b.name}
  </li>
))}
    </ul>
  );
};

export default Layers;
