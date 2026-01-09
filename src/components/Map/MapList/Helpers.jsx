import SwitchButton from "../../UI/SwitchButton";
import AccordionExpandIcon from "../../UI/Accordion";
import { mapCategories } from "./Categories";

export const renderCategories = (dispatch, classes) =>
  mapCategories.map(({ key, name, icon: Icon }) => (
    <div
      key={key}
      className={classes.mapTypes}
      onClick={() => dispatch({ type: "SELECT_CATEGORY", payload: key })}
    >
      <Icon className={classes.typeIcon} />
      <h6 className={classes.typeName}>{name}</h6>
    </div>
  ));

export const renderLayers = (
  categoryKey,
  expandedLayer,
  uiDispatch,
  dispatch,
  classes
) => {
  const category = mapCategories.find((c) => c.key === categoryKey);

  return category.layers.map((layer) => (
    <SwitchButton
      key={layer.id}
      label={layer.label}
      switchId={layer.id}
      mapChecked={false}
      type={layer.type}
      className={classes.type}
      onChange={() =>
        dispatch({
          type: "TOGGLE_LAYER",
          layerId: layer.id,
          label: layer.label,
        })
      }
    >
      <AccordionExpandIcon
        layerId={layer.id}
        expanded={expandedLayer === layer.id}
        onChange={() =>
          uiDispatch({
            type: "TOGGLE_ACCORDION",
            payload: layer.id,
          })
        }
      />
    </SwitchButton>
  ));
};
