import { basemaps } from "../Map/data/layers";
import classes from "./Sidebar.module.css";
import useMaps from "../Map/MapContext/useMaps";
const Layers = () => {
  const { dispatch } = useMaps();

  return (
    <ul className={classes.layers}>
      {Object.entries(basemaps).map((el) => {
        return (
          <li
            key={el[0]}
            onClick={() =>
              dispatch({
                type: "SET_MAP",
                url: basemaps[el[0]].url,
                attribution: basemaps[el[0]].attribution,
              })
            }
          >
            {el[0]}
          </li>
        );
      })}
    </ul>
  );
};

export default Layers;
