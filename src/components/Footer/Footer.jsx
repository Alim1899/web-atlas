import classes from "./Footer.module.css";
import { FaFacebook } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className={classes.list}>
      <div className={classes.social}>
        <FaFacebook className={classes.icon} />
        <IoIosCall className={classes.icon} />
      </div>
      <div className={classes.year}>
        <span>ყველა უფლება დაცულია - {currentYear}©</span>
      </div>
      <div className={classes.organisation}>
        <h6 className={classes.name}>
          ვახუშტი ბაგრატიონის გეოგრაფიის ინსტიტუტი
        </h6>
        <h6 className={classes.name}>
          შოთა რუსთაველის ეროვნული სამეცნიერო ფონდი
        </h6>
        <h6 className={classes.name}>
          ივანე ჯავახიშვილის თბილისის სახელმწიფო უნივერსიტეტი
        </h6>
      </div>
    </div>
  );
};

export default Footer;
