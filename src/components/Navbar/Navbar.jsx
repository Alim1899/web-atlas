import logo from "../../assets/logo.png";
import classes from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={classes.main}>
      <img src={logo} alt="logo" />
    </div>
  );
};

export default Navbar;
