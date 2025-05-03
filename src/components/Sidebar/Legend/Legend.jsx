import classes from "./Legend.module.css";
import { IoMdClose } from "react-icons/io";

const Legend = ({ onCloseModal }) => {
  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <h2 className={classes.head}>ლეგენდა</h2>
        <IoMdClose onClick={onCloseModal} />
      </div>
      <div className={classes.content}></div>
    </div>
  );
};

export default Legend;
