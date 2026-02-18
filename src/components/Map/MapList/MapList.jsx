import classes from "./MapList.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";

import useMaps from "../../Context/MapContext/useMaps";
import useLeftBar from "../../Context/LeftBarContext/useLeftBar";

import CategoriesList from "./CategoriesList";
import LayersList from "./LayerList";
import { useEffect } from "react";

const MapList = () => {
  const { state: barState, dispatch: barDispatch } = useLeftBar();
  const { dispatch: mapDispatch } = useMaps();
  const { isOpen, selectedCategory, expandedLayer } = barState;
  useEffect(() => {
    if (!selectedCategory) return;
    mapDispatch({ type: "SET_QUERY", payload: selectedCategory });
  }, [selectedCategory, mapDispatch]);
  return (
    <div className={classes.mapHeaders}>
      {isOpen && (
        <div className={classes.menu}>
          <div className={classes.header}>
            {selectedCategory ? (
              <button
                className={classes.backButton}
                onClick={() => barDispatch({ type: "BACK_TO_CATEGORIES" })}
              >
                <IoIosArrowBack />
              </button>
            ) : (
              <div />
            )}

            <h5 className={classes.head}>
              აირჩიე {selectedCategory ? "ფენა" : "კატეგორია"}
            </h5>
            <div />
          </div>
          <div className={selectedCategory ? classes.list : classes.category}>
            {selectedCategory ? (
              <LayersList
                categoryKey={selectedCategory}
                expandedLayer={expandedLayer}
                uiDispatch={barDispatch}
                mapDispatch={mapDispatch}
              />
            ) : (
              <CategoriesList />
            )}
          </div>
        </div>
      )}

      <div
        className={isOpen ? classes.leftArrow : classes.rightArrow}
        onClick={() => barDispatch({ type: "TOGGLE_MENU" })}
      >
        {isOpen ? <BiSolidLeftArrow /> : <BiSolidRightArrow />}
      </div>
    </div>
  );
};

export default MapList;
