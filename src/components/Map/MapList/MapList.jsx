import classes from "./MapList.module.css";
import { useState } from "react";

import SwitchButton from "../../UI/SwitchButton";
import AccordionExpandIcon from "../../UI/Accordion";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { mapCategories } from "./Categories";
const MapList = () => {
  const [showMenu, setSHowMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null); // NEW
  const [expandedPanel, setExpandedPanel] = useState(null);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : null);
  };

  // Define categories and associated map layer ids

  return (
    <div className={classes.mapHeaders}>
      {showMenu && (
        <div className={classes.menu}>
          <h5 className={classes.head}>
            აირჩიე {selectedCategory ? "ფენა" : "კატეგორია"}
          </h5>
          {selectedCategory && (
            <input
              className={classes.searchMap}
              type="text"
              placeholder="მოძებნე რუკა"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          )}
          <div className={classes.mapTypes}>
            {mapCategories.map((cat) => {
              const Icon = cat.icon;
              return selectedCategory === cat.key ? (
                <div key={cat.key}>
                  {cat.layers.map((layer) => (
                    <SwitchButton
                      key={layer.id}
                      label={layer.label}
                      switchId={layer.id}
                      mapChecked={false}
                      type={layer.type}
                    >
                      <AccordionExpandIcon
                        layerId={layer.id}
                        expanded={expandedPanel === layer.id}
                        onChange={handleAccordionChange(layer.id)}
                      />
                    </SwitchButton>
                  ))}
                  <button
                    className={classes.backButton}
                    onClick={() => setSelectedCategory(null)}
                  >
                    უკან
                  </button>
                </div>
              ) : (
                selectedCategory === null && (
                  <div
                    key={cat.key}
                    className={classes.type}
                    onClick={() => setSelectedCategory(cat.key)}
                  >
                    <Icon className={classes.typeIcon} />
                    <h6 className={classes.typeName}>{cat.name}</h6>
                  </div>
                )
              );
            })}
          </div>
        </div>
      )}

      <div className={classes.arrows} onClick={() => setSHowMenu(!showMenu)}>
        {showMenu ? <BiSolidLeftArrow /> : <BiSolidRightArrow />}
      </div>
    </div>
  );
};

export default MapList;
