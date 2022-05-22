import React from "react";
import ContentType from "../../components/ContentType/ContentType";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./Dashboard.module.scss";

function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <div className={styles["dashboard-wrapper"]}>
        <ContentType contentType={"Dashboard"} />
      </div>
    </div>
  );
}

export default Dashboard;
