import React from "react";
import styles from "./Footer.module.scss";

function Footer() {
  return (
    <div data-testid="footer" className={styles["footer"]}>
      ©{new Date().getFullYear()} Rattle, by Adnan Mujagic
    </div>
  );
}

export default Footer;
