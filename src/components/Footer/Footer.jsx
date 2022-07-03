import React from "react";
import styles from "./Footer.module.scss";

function Footer() {
  return (
    <div className={styles["footer"]}>
      ©{new Date().getFullYear()} Rattle, by Adnan Mujagic
    </div>
  );
}

export default Footer;
