import classes from "./MapList.module.css";
import useLeftBar from "../../Context/LeftBarContext/useLeftBar";
import { mapCategories } from "./Categories";

const CategoriesList = () => {
  const { dispatch } = useLeftBar();
  return (
    <>
      {mapCategories.map(({ key, name, icon: Icon }) => (
        <div
          key={key}
          className={classes.type}
          onClick={() => dispatch({ type: "SELECT_CATEGORY", payload: key })}
        >
          <Icon className={classes.typeIcon} />
          <h6 className={classes.typeName}>{name}</h6>
        </div>
      ))}
    </>
  );
};

export default CategoriesList;
