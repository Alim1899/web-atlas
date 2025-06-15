import classes from "./Legend.module.css";
import { IoMdClose } from "react-icons/io";
import translit from "translit-geo";
import Resizeable from "../Resizeable/Resizeable";
const Legend = ({ onCloseModal, selectedChart }) => {
  return (
    <div className={classes.wrapper}>
      <Resizeable>
        <div className={classes.main}>
          <div className={classes.header}>
            <h2 className={classes.head}>ლეგენდა</h2>
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
              <p className={classes.nolayer}>
                <span>🚫</span>ფენა არჩეული არ არის
              </p>
            )}
          </div>
        </div>
      </Resizeable>
    </div>
  );
};

export default Legend;
