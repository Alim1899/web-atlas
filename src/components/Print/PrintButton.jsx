import { FaPrint } from "react-icons/fa";
import useMaps from "../Context/MapContext/useMaps";
import classes from "./Print.module.css";

const PrintButton = () => {
  const { state, dispatch } = useMaps();
  if (state.printMode) return null;

  return (
    <button
      className={classes.printButton}
      title="ბეჭდვის რეჟიმი"
      onClick={() => dispatch({ type: "SET_PRINT_MODE", payload: true })}
    >
      <FaPrint />
    </button>
  );
};

export default PrintButton;