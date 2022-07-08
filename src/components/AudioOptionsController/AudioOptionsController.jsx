import React, { useEffect, useState } from "react";
import { CustomIconButton } from "../SongsDatatable/SongsDatatable";
import styles from "./AudioOptionsController.module.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import RepeatIcon from "@mui/icons-material/Repeat";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import { IconButton, Slider } from "@mui/material";
import colors from "../../utils/colors";
import formatTime from "../../utils/formatTime";
import CustomSlider from "../CustomSlider";

function AudioOptionsController({ audioDetails, setAudioDetails, audio }) {
  const { isPlaying, source, image, name } = audioDetails;
  const [replayOn, setReplayOn] = useState(false);
  const [shuffleOn, setShuffleOn] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    setAudioEventHandlers();
  }, []);

  const handlePlay = () => {
    console.log("Current time state: " + currentTime);
    console.log(audio.duration);
    audio.currentTime = audio.duration - currentTime > 5 ? currentTime : 0;
    audio.play();
    setAudioDetails({ ...audioDetails, isPlaying: true });
  };
  const handlePause = () => {
    audio.pause();
    setAudioDetails({ ...audioDetails, isPlaying: false });
  };
  const handleSkip = () => {
    audio.currentTime = audio.duration;
  };
  const handleRewind = () => {
    audio.currentTime = 0;
  };

  const handleOnShuffleChange = () => {
    setShuffleOn(!shuffleOn);
  };

  const handleOnReplayChange = () => {
    audio.loop = !replayOn;
    setReplayOn(!replayOn);
  };

  const handleSliderChange = (event) => {
    let parsedTime = (event.target.value / 100) * audio.duration;
    audio.currentTime = parsedTime;
    setCurrentTime(parsedTime);
  };

  const setAudioEventHandlers = () => {
    console.log("Setting audio event handlers");

    console.log(audio.loop);

    audio.addEventListener("ended", () => {
      setAudioDetails((previousDetails) => {
        return { ...previousDetails, isPlaying: false };
      });
    });

    audio.addEventListener("timeupdate", () => {
      console.log(formatTime(audio.currentTime));
      setCurrentTime(audio.currentTime);
    });
  };
  return (
    <div className={styles["audio-options-controller"]}>
      {image && (
        <div
          style={{
            height: "68px",
            aspectRatio: "1 / 1",
            backgroundImage: `url(${image})`,
            marginLeft: "16px",
            borderRadius: "4px",
            overflow: "hidden",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
      )}
      <div className={styles["options-wrapper"]}>
        <div className={styles["options-top"]}>
          <IconButton
            onClick={handleOnShuffleChange}
            style={{ color: shuffleOn ? colors.green : null }}
          >
            <ShuffleIcon />
          </IconButton>
          <IconButton onClick={handleRewind}>
            <FirstPageIcon />
          </IconButton>

          {!audio.paused ? (
            <CustomIconButton onClick={handlePause}>
              <PauseIcon />
            </CustomIconButton>
          ) : (
            <CustomIconButton onClick={handlePlay}>
              <PlayArrowIcon />
            </CustomIconButton>
          )}

          <IconButton onClick={handleSkip}>
            <LastPageIcon />
          </IconButton>
          <IconButton
            onClick={handleOnReplayChange}
            style={{ color: replayOn ? colors.green : null }}
          >
            <RepeatIcon />
          </IconButton>
        </div>
        <div className={styles["options-bottom"]}>
          <div className={styles["options-current-time"]}>
            {formatTime(currentTime)}
          </div>
          <CustomSlider
            value={(currentTime / audio.duration) * 100}
            onChange={(e) => handleSliderChange(e)}
          />
          <div className={styles["options-duration"]}>
            {formatTime(audio.duration)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AudioOptionsController;
