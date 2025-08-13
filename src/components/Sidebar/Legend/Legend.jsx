import classes from "./Legend.module.css";
import { IoMdClose } from "react-icons/io";
import translit from "translit-geo";
import Resizeable from "../../Hooks/Resizeable/Resizeable";
import Nolayer from "../Nolayer";
import { useRef } from "react";
import useDraggable from "../../Hooks/useDraggable";

const Legend = ({ onCloseModal, selectedChart }) => {
  const legendRef = useRef(null);
  const { handleStart } = useDraggable(legendRef);
  console.log(selectedChart);
  return (
    <div className={classes.wrapper} ref={legendRef}>
      <Resizeable>
        <div className={classes.main}>
          <div
            className={classes.header}
            onMouseDown={handleStart}
            onTouchStart={handleStart}
          >
            <h2 className={classes.head}>ლეგენდა</h2>
            <IoMdClose onClick={onCloseModal} />
          </div>
          <div className={classes.content}>
            {selectedChart && (
              <h6 className={classes.layerName}>{selectedChart.layerName}</h6>
            )}
            {selectedChart ? (
              Object.values(selectedChart.data).map((item) => (
                <div key={item.nameGe} className={classes.legend}>
                  <div
                    style={{
                      backgroundColor: item.color,
                    }}
                  />
                  <span>{translit(item.nameGe)}</span>
                </div>
              ))
            ) : (
              <Nolayer layer="none" />
            )}
          </div>
        </div>
      </Resizeable>
    </div>
  );
};

export default Legend;
