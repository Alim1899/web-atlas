import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import classes from "./Resizeable.module.css";
import { RiExpandDiagonal2Line } from "react-icons/ri";

const Resizeable = ({ children }) => {
  return (
    <ResizableBox
      width={280}
      height={280}
      minConstraints={[200, 100]}
      maxConstraints={[window.innerWidth, window.innerHeight]}
      resizeHandles={["nw"]}
      className={classes.box}
      handle={
        <span className={classes.icon}>
          <RiExpandDiagonal2Line />
        </span>
      }
    >
      {children}
    </ResizableBox>
  );
};

export default Resizeable;
