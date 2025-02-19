import { createContext, useContext, useMemo, useReducer } from "react";
const MapContext = createContext();
const initialState = {
  agroclimate: {},
  geology: {},
  rivers: {},
  rockfall: {},
  isLoading: false,
  loaded: false,
  opacity: 90,
  weight: 90,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "agroclimate":
      return { ...state, agroclimate: action.payload, isLoading: false };
    case "geology":
      return { ...state, geology: action.payload, isLoading: false };
    case "rivers":
      return { ...state, rivers: action.payload, isLoading: false };
    case "rockfall":
      return { ...state, rockfall: action.payload, isLoading: false };
    case "change/opacity":
      return { ...state, opacity: action.payload, isLoading: false };
    case "change/weight":
      return { ...state, weight: action.payload };
    case "loading":
      return { ...state, isLoading: true };
    case "loaded":
      return { ...state, isLoading: false, loaded: true };

    default:
      throw new Error("Unknown action type");
  }
};

const MapsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const mapsValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return (
    <MapContext.Provider value={mapsValue}>{children}</MapContext.Provider>
  );
};

const useMaps = () => {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error("Maps provider used outside of a its wrapping element");
  }
  return context;
};

export { MapsProvider, useMaps };
