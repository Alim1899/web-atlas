import { useEffect, useState } from "react";
import logo from "../../assets/logo.svg";
import classes from "./Navbar.module.css";
import { TiThMenu } from "react-icons/ti";

const Navbar = () => {
  const [dropList, showDropList] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleDropList = () => {
    showDropList(!dropList);
  };
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    if (windowWidth > 676) showDropList(false);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth]);
  return (
    <div className={classes.main}>
      <div className={classes.head}>
        <img className={classes.logo} src={logo} alt="logo" />
        <h3 className={classes.headText}>
          ქვემო ქართლის რეგიონის ინტერაქტიული ატლასი
        </h3>
      </div>
      <TiThMenu className={classes.menuIcon} onClick={() => handleDropList()} />
      <div className={dropList ? classes.dropLinks : classes.links}>
        <h3 className={classes.headText}>მთავარი</h3>
        <h3 className={classes.headText}>ატლასი</h3>
        <h3 className={classes.headText}>გუნდი</h3>
        <h3 className={classes.headText}>კონტაქტი</h3>
      </div>
    </div>
  );
};

export default Navbar;
