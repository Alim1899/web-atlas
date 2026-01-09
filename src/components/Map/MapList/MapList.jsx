import classes from "./MapList.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { renderCategories, renderLayers } from "./Helpers";

import useMaps from "../../Context/MapContext/useMaps";
import useLeftBar from "../../Context/LeftBarContext/useLeftBar";

const MapList = () => {
  const { state, dispatch } = useLeftBar();
  const { mapDispatch } = useMaps();
  const { isOpen, selectedCategory, expandedLayer } = state;
  console.log(isOpen, selectedCategory, expandedLayer);
  return (
    <div className={classes.mapHeaders}>
      {isOpen && (
        <div className={classes.menu}>
          <div className={classes.header}>
            {selectedCategory && (
              <button
                className={classes.backButton}
                onClick={() => dispatch({ type: "BACK_TO_CATEGORIES" })}
              >
                <IoIosArrowBack />
              </button>
            )}
            {!selectedCategory && <div></div>}

            <h5 className={classes.head}>
              აირჩიე {selectedCategory ? "ფენა" : "კატეგორია"}
            </h5>
          </div>

          <div className={selectedCategory ? classes.list : classes.category}>
            {selectedCategory
              ? renderLayers(
                  selectedCategory,
                  expandedLayer,
                  dispatch,
                  mapDispatch,
                  classes
                )
              : renderCategories(dispatch, classes)}
          </div>
        </div>
      )}

      <div
        className={isOpen ? classes.leftArrow : classes.rightArrow}
        onClick={() => dispatch({ type: "TOGGLE_MENU" })}
      >
        {isOpen ? <BiSolidLeftArrow /> : <BiSolidRightArrow />}
      </div>
    </div>
  );
};

export default MapList;
