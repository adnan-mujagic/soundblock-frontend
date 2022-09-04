import React from "react";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import styles from "./Loading.module.scss";

function Loading({ margin = false }) {
  return (
    <div data-testid="loading">
      <MusicNoteIcon
        className={margin ? styles["load-with-margin"] : styles.load}
      />
    </div>
  );
}

export default Loading;
