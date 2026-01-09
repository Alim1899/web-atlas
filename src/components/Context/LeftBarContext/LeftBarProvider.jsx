import { useReducer } from "react";
import PropTypes from "prop-types";
import leftBarReducer, { uiInitialState } from "./LeftBarReducer";
import LeftBarContext from "./LeftBarContext";

const LeftBarProvider = ({ children }) => {
  const [state, dispatch] = useReducer(leftBarReducer, uiInitialState);

  return (
    <LeftBarContext.Provider value={{ state, dispatch }}>
      {children}
    </LeftBarContext.Provider>
  );
};

LeftBarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LeftBarProvider;
