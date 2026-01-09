import { useContext } from "react";
import RightBarContext from "./RightBarContext";
const useRightBar = () => {
  const context = useContext(RightBarContext);

  if (!context) {
    throw new Error("useRightBar must be used within RightBarProvider");
  }
  return context;
};

export default useRightBar;
