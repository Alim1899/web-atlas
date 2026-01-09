import { useContext } from "react";
import LeftBarContext from "./LeftBarContext";
const useMapUI = () => {
  const context = useContext(LeftBarContext);
  if (!context) {
    throw new Error("useLeftBar must be used within LeftBarProvider");
  }
  return context;
};

export default useMapUI;
