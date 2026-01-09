import { useReducer } from "react";
import PropTypes from "prop-types";
import rightBarReducer, { RightBarState } from "./RightBarReducer";
import RightBarContext from "./RightBarContext";

const RightBarProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rightBarReducer, RightBarState);

  return (
    <RightBarContext.Provider value={{ state, dispatch }}>
      {children}
    </RightBarContext.Provider>
  );
};

RightBarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RightBarProvider;
