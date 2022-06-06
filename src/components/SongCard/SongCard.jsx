import PlayCircleIcon from "@mui/icons-material/PlayCircle";

import getColorFromString from "../../utils/getColorFromString";
import { useRef, useState } from "react";
import typography from "../../utils/typography";
import colors from "../../utils/colors";
import styles from "./SongCard.module.scss";
import { PauseCircleFilled } from "@mui/icons-material";

function SongCard({ audio, audioDetails, setAudioDetails, song }) {
  let { isPlaying, source } = audioDetails;

  let ownSongLocation = song.songLocation;

  const handlePlay = (event) => {
    audio.load();
    audio.src = ownSongLocation;
    audio.play();
    setAudioDetails({ isPlaying: true, source: ownSongLocation });
  };

  const handlePause = (event) => {
    audio.pause();
    setAudioDetails({ isPlaying: false, source: ownSongLocation });
  };

  return (
    <div className={styles["song-card"]}>
      <div>
        <div
          style={{
            aspectRatio: "1/1",
            background: `url("${
              song.image
                ? song.image
                : "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
            }")`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            borderRadius: "8px",
            marginBottom: "16px",
          }}
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
        {ownSongLocation && (
          <>
            {ownSongLocation === source && isPlaying ? (
              <PauseCircleFilled
                style={{ color: colors.green, cursor: "pointer" }}
                onClick={(event) => handlePause(event)}
              />
            ) : (
              <PlayCircleIcon
                style={{ cursor: "pointer" }}
                onClick={(event) => handlePlay(event)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default SongCard;
