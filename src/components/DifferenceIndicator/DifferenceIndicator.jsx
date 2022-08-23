import React from "react";
import colors from "../../utils/colors";
import EastIcon from "@mui/icons-material/East";
import styles from "./DifferenceIndicator.module.scss";

function Line({ text, backgroundColor = "white" }) {
  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        padding: "5px",
        marginBottom: "2px",
        fontSize: "14px",
      }}
    >
      {text}
    </div>
  );
}

function DifferenceIndicator({ current, next }) {
  const hasChanged = (key) => {
    return current[key] !== next[key];
  };

  return (
    <div className={styles["difference-indicator"]}>
      <div className={styles["current"]}>
        {Object.keys(current).map((key) => (
          <Line text={`${key}: "${current[key]}"`} />
        ))}
      </div>
      <div className={styles["middle"]}>
        <EastIcon style={{ fontSize: "24px" }} />
      </div>
      <div className={styles["next"]}>
        {Object.keys(current).map((key) => (
          <Line
            text={`${key}: "${next[key]}"`}
            backgroundColor={hasChanged(key) ? colors.lightgreen : "white"}
          />
        ))}
      </div>
    </div>
  );
}

export default DifferenceIndicator;
