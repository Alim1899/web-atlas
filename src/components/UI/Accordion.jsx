import classes from "./ui.module.css";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import LineSlider from "./LineSlider";
import { MdOutlineExpandMore } from "react-icons/md";
export default function AccordionExpandIcon({ layerId }) {
  return (
    <div className={classes.accordion}>
      <Accordion disableGutters>
        <AccordionSummary
          className={classes.header}
          id="panel1-header"
          aria-controls="panel1"
          expandIcon={<MdOutlineExpandMore className={classes.expand} />}
          sx={{ minHeight: 48 }}
        ></AccordionSummary>
        <AccordionDetails className={classes.details}>
          <LineSlider layerId={layerId} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
