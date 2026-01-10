import classes from "./Legend.module.css";
import Nolayer from "../Nolayer";
import DraggableContainer from "../Helpers/DraggableContainer";

const Info = ({ selectedChart }) => {
  return (
    <DraggableContainer header="დამატებითი ინფორმაცია" className={classes.main}>
      <div className={classes.content}>
        {selectedChart ? (
          <h2 className={classes.info}>
            დამატებითი ინფორმაცია ამ ფენისთვის არ არის ხელმისაწვდომი
          </h2>
        ) : (
          <Nolayer layer="none" />
        )}
      </div>
    </DraggableContainer>
  );
};

export default Info;
