import { useReducer } from "react";
import PropTypes from "prop-types";
import mapReducer, { initialState } from "./mapReducer"; // Ensure this is correct
import MapsContext from "./MapsContext"; // Import from the new file

const MapsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mapReducer, initialState);

  return (
    <MapsContext.Provider value={{ state, dispatch }}>
      {children}
    </MapsContext.Provider>
  );
};

MapsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MapsProvider;
