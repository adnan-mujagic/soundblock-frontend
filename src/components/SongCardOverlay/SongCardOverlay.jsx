import { PauseCircleFilled, PlayCircle } from "@mui/icons-material";

import React from "react";
import colors from "../../utils/colors";
import CustomButtonFilled from "../CustomButtonFilled";
import styles from "./SongCardOverlay.module.scss";

function SongCardOverlay({
  isPlaying,
  canBuy,
  handlePlay,
  handlePause,
  showPlayPause,
  handleBuy,
  handleArtistClick,
  showViewArtist,
}) {
  return (
    <div className={styles["song-card-overlay"]}>
      <div className={styles["song-controls"]}>
        {showPlayPause && (
          <>
            {isPlaying ? (
              <PauseCircleFilled
                style={{
                  cursor: "pointer",
                  color: colors.green,
                  fontSize: "60",
                }}
                onClick={(event) => handlePause(event)}
              />
            ) : (
              <PlayCircle
                style={{
                  cursor: "pointer",
                  fontSize: "60",
                  color: colors.green,
                }}
                onClick={(event) => handlePlay(event)}
              />
            )}
          </>
        )}
      </div>
      {canBuy && (
        <div className={styles["song-options"]}>
          <CustomButtonFilled text="Buy" onClick={handleBuy} />
        </div>
      )}
      {showViewArtist && (
        <div
          style={{
            position: "absolute",
            top: "32px",
            left: "12px",
            fontSize: "12px",
            cursor: "pointer",
            color: colors.green,
            textDecoration: "underline",
          }}
          onClick={handleArtistClick}
        >
          Artist Profile
        </div>
      )}
    </div>
  );
}

export default SongCardOverlay;
