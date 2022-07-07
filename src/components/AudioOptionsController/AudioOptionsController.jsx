import React, { useState } from "react";
import { CustomIconButton } from "../SongsDatatable/SongsDatatable";
import styles from "./AudioOptionsController.module.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import RepeatIcon from "@mui/icons-material/Repeat";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import { Badge, IconButton } from "@mui/material";
import colors from "../../utils/colors";

function AudioOptionsController({ audioDetails, setAudioDetails, audio }) {
  const [replayOn, setReplayOn] = useState(false);
  const [shuffleOn, setShuffleOn] = useState(false);
  const handlePlay = () => {};
  const handlePause = () => {};
  const handleSkip = () => {};
  const handleRewind = () => {};
  const handleOnReplayChange = () => {
    setReplayOn(!replayOn);
  };

  const handleOnShuffleChange = () => {
    setShuffleOn(!shuffleOn);
  };
  return (
    <div className={styles["audio-options-controller"]}>
      <div />
      <div className={styles["options-wrapper"]}>
        <IconButton
          onClick={handleOnShuffleChange}
          style={{ color: shuffleOn ? colors.green : null }}
        >
          <ShuffleIcon />
        </IconButton>
        <IconButton>
          <FirstPageIcon />
        </IconButton>
        <CustomIconButton onClick={handlePlay}>
          <PlayArrowIcon />
        </CustomIconButton>
        <IconButton>
          <LastPageIcon />
        </IconButton>
        <IconButton
          onClick={handleOnReplayChange}
          style={{ color: replayOn ? colors.green : null }}
        >
          <RepeatIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default AudioOptionsController;
