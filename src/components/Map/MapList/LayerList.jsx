import SwitchButton from "../../UI/SwitchButton";
import AccordionExpandIcon from "../../UI/Accordion";
import { mapCategories } from "./Categories";
import classes from "./MapList.module.css";
const LayersList = ({ categoryKey, expandedLayer, uiDispatch }) => {
  const category = mapCategories.find((c) => c.key === categoryKey);
  if (!category) return null;
  return (
    <>
      {category.layers.map((layerObj) => {
        const [groupTitle, layers] = Object.entries(layerObj)[0];
        return (
          <div key={groupTitle} className={classes.group}>
            <h4 className={classes.groupTitle}>{groupTitle}</h4>

            {layers.map((el) => (
              <SwitchButton
                key={el.id}
                label={el.label}
                switchId={el.id}
                mapChecked={false}
                type={el.type}
                queryKey={categoryKey}
              >
                <AccordionExpandIcon
                  layerId={el.id}
                  expanded={expandedLayer === el.id}
                  onChange={() =>
                    uiDispatch({
                      type: "TOGGLE_ACCORDION",
                      payload: el.id,
                    })
                  }
                />
              </SwitchButton>
            ))}
          </div>
        );
      })}
    </>
  );
};

export default LayersList;
