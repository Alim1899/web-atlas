// LayersList.jsx
import SwitchButton from "../../UI/SwitchButton";
import AccordionExpandIcon from "../../UI/Accordion";
import { mapCategories } from "./Categories";
const LayersList = ({
  categoryKey,
  expandedLayer,
  uiDispatch,
  mapDispatch,
}) => {
  const category = mapCategories.find((c) => c.key === categoryKey);
  if (!category) return null;

  return (
    <>
      {category.layers.map((layer) => (
        <SwitchButton
          key={layer.id}
          label={layer.label}
          switchId={layer.id}
          mapChecked={false}
          type={layer.type}
          onChange={() =>
            mapDispatch({
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
              uiDispatch({ type: "TOGGLE_ACCORDION", payload: layer.id })
            }
          />
        </SwitchButton>
      ))}
    </>
  );
};

export default LayersList;
