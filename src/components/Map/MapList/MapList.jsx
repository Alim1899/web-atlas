import classes from "./MapList.module.css";
import { HiMenu } from "react-icons/hi";
import { useState } from "react";
import SwitchButton from "../../UI/SwitchButton";
import AccordionExpandIcon from "../../UI/Accordion";
const MapList = () => {
  const [showMenu, setSHowMenu] = useState(false);
  const [query, setQuery] = useState("");
  return (
    <div className={classes.mapHeaders}>
      <div className={classes.searchBar}>
        <input
          className={classes.searchMap}
          type="text"
          placeholder="მოძებნე რუკა"
          value={query}
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
            <AccordionExpandIcon layerId={"agroclimate"} />
          </SwitchButton>
          <SwitchButton
            label="გეოლოგია"
            switchId="geology"
            mapChecked={false}
            type="polygon"
          >
            <AccordionExpandIcon layerId={"geology"} />
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
            <AccordionExpandIcon layerId={"vegetation"} />
          </SwitchButton>
        </div>
      )}
    </div>
  );
};

export default MapList;
