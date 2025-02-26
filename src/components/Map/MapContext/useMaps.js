import { useContext } from "react";
import MapsContext from "./MapsContext"; // Adjust the path if needed

const useMaps = () => {
  const context = useContext(MapsContext);
  if (!context) {
    throw new Error("useMaps must be used within a MapProvider");
  }
  return context;
};

export default useMaps;
