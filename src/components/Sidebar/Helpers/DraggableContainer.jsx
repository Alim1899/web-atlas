import useDraggable from "../../Hooks/useDraggable";
import { useRef } from "react";
import classes from "./DraggableContainer.module.css";
import remove from "../../../assets/delete.svg";
import useRightBar from "../../Context/RightBarContext/useRightBar";
const DraggableContainer = ({ header, children }) => {
  const chartRef = useRef(null);
  const { handleStart } = useDraggable(chartRef);
  const { dispatch: rightBarDispatch } = useRightBar();

  return (
    <div
      className={classes.container}
      ref={chartRef}
      onMouseDown={handleStart}
      onTouchStart={handleStart}
    >
      <div className={classes.head}>
        <h3 className={classes.header}>{header}</h3>
        <img
          className={classes.dragHandle}
          src={remove}
          onClick={() => rightBarDispatch({ type: "TOGGLE_PANEL" })}
          alt="remove"
        />
      </div>

      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default DraggableContainer;
