// MapList.jsx
import classes from "./MapList.module.css";
import { HiMenu } from "react-icons/hi";
import { useState } from "react";
import SwitchButton from "../../UI/SwitchButton";
import AccordionExpandIcon from "../../UI/Accordion";

const MapList = () => {
  const [showMenu, setSHowMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [expandedPanel, setExpandedPanel] = useState(null); // add this line

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : null);
  };

  return (
    <div className={classes.mapHeaders}>
      <div className={classes.searchBar}>
        <input
          className={classes.searchMap}
          type="text"
          placeholder="მოძებნე რუკა"
          value={query}
          onClick={() => setSHowMenu(true)}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <HiMenu
          onClick={() => setSHowMenu(!showMenu)}
          className={classes.menuIcon}
        />
      </div>

      {showMenu && (
        <div className={classes.menu}>
          <h4 className={classes.header}>რუკის ტიპები</h4>

          <SwitchButton
            label="აგროკლიმატი"
            switchId="agroclimate"
            mapChecked={false}
            type="polygon"
          >
            <AccordionExpandIcon
              layerId="agroclimate"
              expanded={expandedPanel === "agroclimate"}
              onChange={handleAccordionChange("agroclimate")}
            />
          </SwitchButton>

          <SwitchButton
            label="გეოლოგია"
            switchId="geology"
            mapChecked={false}
            type="polygon"
          >
            <AccordionExpandIcon
              layerId="geology"
              expanded={expandedPanel === "geology"}
              onChange={handleAccordionChange("geology")}
            />
          </SwitchButton>

          <SwitchButton
            label="ქვათაცვენები"
            switchId="rockfall"
            mapChecked={false}
          />

          <SwitchButton
            label="მდინარეები"
            switchId="rivers"
            mapChecked={false}
          />

          <SwitchButton
            label="ვეგეტაცია"
            switchId="vegetation"
            mapChecked={false}
            type="polygon"
          >
            <AccordionExpandIcon
              layerId="vegetation"
              expanded={expandedPanel === "vegetation"}
              onChange={handleAccordionChange("vegetation")}
            />
          </SwitchButton>
        </div>
      )}
    </div>
  );
};

export default MapList;
