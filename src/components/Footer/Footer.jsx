import classes from "./Footer.module.css";
import { FaFacebook } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { LuMail } from "react-icons/lu";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className={classes.list}>
      <div className={classes.social}>
        <div className={classes.links}>
          <a
            href="https://www.facebook.com/share/16T4kGbA1b/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className={classes.icon} />
          </a>
          <a href="tel:0322391686">
            <IoIosCall className={classes.icon} />
          </a>
          <a href="mailto:contact_vbig@tsu.ge">
            <LuMail className={classes.icon} />
          </a>
        </div>
        <div className={classes.address}>
          <p>მ. თამარაშვილის ქუჩა 6, 0177, თბილისი, საქართველო</p>
        </div>
      </div>
      <div className={classes.year}>
        <span>ყველა უფლება დაცულია - {currentYear}©</span>
      </div>
      <div className={classes.organisation}>
        <p className={classes.name}>ვახუშტი ბაგრატიონის გეოგრაფიის ინსტიტუტი</p>
        <p className={classes.name}>
          შოთა რუსთაველის ეროვნული სამეცნიერო ფონდი
        </p>
        <p className={classes.name}>
          ივანე ჯავახიშვილის თბილისის სახელმწიფო უნივერსიტეტი
        </p>
      </div>
    </div>
  );
};

export default Footer;
