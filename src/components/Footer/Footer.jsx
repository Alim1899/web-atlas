import classes from "./Footer.module.css";
import { FaGithub } from "react-icons/fa";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <ul className={classes.list}>
      <li className={classes.listItem}>
        {" "}
        <a href="https://github.com/Alim1899" rel="noreferrer" target="_blank">
          <FaGithub className={classes.icon} />
        </a>
      </li>
      <li className={classes.listItem}>All Rights Reserved</li>
      <li className={classes.listItem}>{currentYear}</li>
    </ul>
  );
};

export default Footer;
