import React from "react";
import styles from "./EmptyContent.module.scss";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import SearchIcon from "@mui/icons-material/Search";
import colors from "../../utils/colors";

function EmptyContent({ message, isAnimated }) {
  return (
    <div className={styles["empty-content"]}>
      <div className={styles["empty-icons"]}>
        <div className={styles["library-icon"]}>
          <VideoLibraryIcon style={{ fontSize: "50", color: colors.text }} />
        </div>
        <div
          className={
            styles[isAnimated ? "search-icon-animation" : "search-icon"]
          }
        >
          <SearchIcon
            style={{ fontSize: isAnimated ? "40" : "50", color: colors.green }}
          />
        </div>
      </div>

      <div className={styles["empty-content-message"]}>{message}</div>
    </div>
  );
}

export default EmptyContent;
