import useMaps from "../../../Context/MapContext/useMaps";
import { layerConfig } from "../../data/layerConfig";
import { getLayerYear } from "../Styling/StylesForLayer/YearLayer";
import classes from "./YearToggle.module.css";
// წლის გადამრთველი — ჩანს, როცა ბოლოს ჩართულ ფენას წლები აქვს
const YearToggle = () => {
  const { state, dispatch } = useMaps();
  const topId = state.activeLayers.at(-1)?.id;
  const cfg = layerConfig[topId];
  if (!cfg?.years) return null;

  const current = getLayerYear(cfg, state.layerYear, topId);

  return (
    <div className={`${classes.toggle} no-print`}>
      {cfg.years.map((y) => (
        <button
          key={y.key}
          className={y.key === current.key ? classes.active : ""}
          onClick={() =>
            dispatch({ type: "SET_LAYER_YEAR", payload: { id: topId, year: y.key } })
          }
        >
          {y.label}
        </button>
      ))}
    </div>
  );
};

export default YearToggle;