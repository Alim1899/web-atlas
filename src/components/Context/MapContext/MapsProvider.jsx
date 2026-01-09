import { useReducer } from "react";
import mapReducer, { initialState } from "./mapReducer";
import MapsContext from "./MapsContext";

const MapsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mapReducer, initialState);

  return (
    <MapsContext.Provider value={{ state, dispatch }}>
      {children}
    </MapsContext.Provider>
  );
};

export default MapsProvider;
