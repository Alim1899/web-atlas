import logo from "../../assets/logo.svg";
import classes from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={classes.main}>
      <div className={classes.head}>
        <img className={classes.logo} src={logo} alt="logo" />
        <h3 className={classes.headText}>
          ქვემო ქართლის რეგიონის ინტერაქტიული ატლასი
        </h3>
      </div>
      <div className={classes.links}>
        <h3 className={classes.headText}>მთავარი</h3>
        <h3 className={classes.headText}>ატლასი</h3>
        <h3 className={classes.headText}>გუნდი</h3>
        <h3 className={classes.headText}>კონტაქტი</h3>
      </div>
    </div>
  );
};

export default Navbar;
