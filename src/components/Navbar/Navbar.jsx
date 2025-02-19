import { useState, useEffect } from "react";

import classes from "./Navbar.module.css";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [dropDown, setDropDown] = useState(window.innerWidth <= 725);

  useEffect(() => {
    const handleResize = () => {
      setDropDown(window.innerWidth <= 725);
      setShowNavbar(false);
    };

    const debouncedHandleResize = debounce(handleResize, 100);
    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, []);

  const debounce = (func, delay) => {
    let debounceTimer;
    return function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(this, arguments), delay);
    };
  };

  const showList = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <div className={classes.main}>
      {!dropDown && (
          <ul className={classes.list}>
            {["მთავარი", "ჩვენს შესახებ", "გალერეა", "კონტაქტი"].map((path) => (
              <li
                key={path}
                className={
                  window.location.pathname === `/${path}`
                    ? classes.activeItem
                    : classes.listItem
                }
              >{path}</li>
            ))}
          </ul>
      )}
      {dropDown && (
   

          <div className={classes.dropDown}>
            <div className={classes.lines} onClick={showList}>
              <div className={!showNavbar ? classes.line : classes.close}></div>
              <div className={!showNavbar ? classes.line : classes.close}></div>
              <div className={!showNavbar ? classes.line : classes.close}></div>
            </div>
            {showNavbar&&<ul className={showNavbar ? classes.dropMenu : classes.navlinks}>
              {["მთავარი", "ჩვენს შესახებ", "გალერეა", "კონტაქტი"].map(
                (path) => (
                  <li
                    key={path}
                    className={
                      window.location.pathname === `/${path}`
                        ? classes.activeItem
                        : classes.listItem
                    }
                  >{path}</li>
                )
              )}
            </ul>}
          </div>
 
      )}
   
    </div>
  );
};

export default Navbar;
