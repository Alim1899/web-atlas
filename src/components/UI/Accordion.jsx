import classes from "./ui.module.css";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import LineSlider from "./LineSlider";
import { MdOutlineExpandMore } from "react-icons/md";
export default function AccordionExpandIcon({ layerId, expanded, onChange }) {
  return (
    <div className={classes.accordion}>
      <Accordion expanded={expanded} onChange={onChange}>
        <AccordionSummary
          className={classes.header}
          id="panel1-header"
          aria-controls="panel1"
          expandIcon={<MdOutlineExpandMore className={classes.expand} />}
        ></AccordionSummary>
        <AccordionDetails className={classes.details}>
          <LineSlider layerId={layerId} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
