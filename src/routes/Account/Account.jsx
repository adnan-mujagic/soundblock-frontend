import React from "react";
import ContentType from "../../components/ContentType/ContentType";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./Account.module.scss";

function Account({ token, setToken }) {
  return (
    <div className={styles.account}>
      <Header token={token} setToken={setToken} />
      <div className={styles["content-wrapper"]}>
        <Sidebar />
        <div className={styles["main-content-wrapper"]}>
          <ContentType contentType={"Account Settings"} />
        </div>
      </div>
    </div>
  );
}

export default Account;
