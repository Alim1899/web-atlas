import classes from "./Legend.module.css";
import { IoMdClose } from "react-icons/io";
import translit from "translit-geo";
import Resizeable from "../Resizeable/Resizeable";
import Nolayer from "../Nolayer";
import { useRef } from "react";
import useDraggable from "../../Hooks/useDraggable";

const Info = ({ onCloseModal, selectedChart }) => {
  const infoRef = useRef(null);
  const { handleStart } = useDraggable(infoRef);

  return (
    <div
      className={classes.infoWrapper}
      ref={infoRef}
      onMouseDown={handleStart}
      onTouchStart={handleStart}
    >
      <Resizeable>
        <div className={classes.main}>
          <div className={classes.header}>
            <h2 className={classes.head}>ინფორმაცია</h2>
            <IoMdClose onClick={onCloseModal} />
          </div>
          <div className={classes.content}>
            {selectedChart ? (
              Object.values(selectedChart.data).map((item) => (
                <div key={item.layerName} className={classes.legend}>
                  <div
                    style={{
                      backgroundColor: item.color,
                    }}
                  />
                  <span>{translit(item.layerDesc)}</span>
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

export default Info;
