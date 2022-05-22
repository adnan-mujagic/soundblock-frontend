import PlayCircleIcon from "@mui/icons-material/PlayCircle";

import getColorFromString from "../../utils/getColorFromString";
import { useState } from "react";
import typography from "../../utils/typography";
import colors from "../../utils/colors";
import styles from "./SongCard.module.scss";

function SongCard(data) {
  let { song } = data;

  return (
    <div className={styles["song-card"]}>
      <div>
        <div
          style={{
            aspectRatio: "1/1",
            background: `url("${
              song.cover
                ? song.cover
                : "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
            }")`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            borderRadius: "8px",
            marginBottom: "16px",
          }}
          className="image-container"
        ></div>
      </div>
      <div className="song-card-info">
        {song?.name && <div>{song.name}</div>}
        {song?.artist[0] && (
          <div
            style={{
              fontSize: typography.tiny,
              color: getColorFromString(song.artist[0].username),
            }}
          >
            {song.artist[0].username
              ? song.artist[0].username
              : song.artist[0].walletAddress}
          </div>
        )}
      </div>
      <div className="song-card-controls">
        <PlayCircleIcon
          style={{ cursor: "pointer", color: colors.green }}
          onClick={() => {
            console.log("Play button clicked!");
          }}
        />
      </div>
    </div>
  );
}

export default SongCard;
