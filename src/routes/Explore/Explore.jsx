import React from "react";
import ContentType from "../../components/ContentType/ContentType";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./Explore.module.scss";

function Explore({ token, setToken }) {
  return (
    <div className={styles.explore}>
      <Header token={token} setToken={setToken} />
      <div className={styles["content-wrapper"]}>
        <Sidebar />
        <div className={styles["main-content-wrapper"]}>
          <ContentType contentType={"Explore"} />
        </div>
      </div>
    </div>
  );
}

export default Explore;
