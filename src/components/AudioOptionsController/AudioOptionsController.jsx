import React, { useEffect, useState } from "react";
import { CustomIconButton } from "../SongsDatatable/SongsDatatable";
import styles from "./AudioOptionsController.module.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import RepeatIcon from "@mui/icons-material/Repeat";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { IconButton } from "@mui/material";
import colors from "../../utils/colors";
import formatTime from "../../utils/formatTime";
import CustomSlider from "../CustomSlider";
import typography from "../../utils/typography";
import { defaultSongImage } from "../../utils/defaultImage";

function AudioOptionsController({
  audioDetails,
  setAudioDetails,
  audio,
  queue,
  setQueue,
}) {
  const { source, image, name } = audioDetails;
  const [replayOn, setReplayOn] = useState(false);
  const [shuffleOn, setShuffleOn] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(audio.volume || 0.5);

  useEffect(() => {
    setAudioEventHandlers();

    // Cleanup
    return () => {
      console.log("Unmounting... performing cleanup");

      audio.removeEventListener("ended", handleSongEnded);

      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [queue]);

  const handlePlay = () => {
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

    audio.addEventListener("ended", handleSongEnded);

    audio.addEventListener("timeupdate", handleTimeUpdate);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audio.currentTime);
  };

  const handleSongEnded = () => {
    if (replayOn) {
      console.log("Replay is on... returning");
      return;
    }

    if (queue && !queue.length) {
      setAudioDetails((previousDetails) => {
        return { ...previousDetails, isPlaying: false };
      });
    } else {
      console.log("There are songs in the queue", queue);
      let poppedSong = queue[0];
      console.log("Popping the song...", poppedSong);
      audio.src = poppedSong.songLocation;
      audio.load();
      audio.play();
      setAudioDetails({
        source: poppedSong.songLocation,
        name: poppedSong.name,
        image: poppedSong.image || defaultSongImage,
        isPlaying: true,
      });

      let remainingQueue = queue.slice(1);
      console.log("Remaining songs in the queue", remainingQueue);
      setQueue(remainingQueue);
    }
  };

  const handleVolumeChange = (event) => {
    let parsedVolume = event.target.value / 100;
    audio.volume = parsedVolume;
    setVolume(parsedVolume);
  };

  const handleMute = () => {
    setVolume(0);
    audio.volume = 0;
  };

  const handleUnmute = () => {
    setVolume(0.5);
    audio.volume = 0.5;
  };

  if (!source) {
    return null;
  }

  return (
    <div className={styles["audio-options-controller"]}>
      <div className={styles["song-image"]}>
        <div
          style={{
            height: "51px",
            aspectRatio: "1 / 1",
            backgroundImage: `url(${image})`,
            marginLeft: "16px",
            borderRadius: "4px",
            overflow: "hidden",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <div
          style={{
            fontSize: typography.tiny,
            marginLeft: "16px",
            marginTop: "5px",
          }}
        >
          {name}
        </div>
      </div>

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
          {audio.duration && (
            <div className={styles["options-duration"]}>
              {formatTime(audio.duration)}
            </div>
          )}
        </div>
      </div>
      <div className={styles["options-volume"]}>
        {volume === 0 ? (
          <IconButton onClick={handleUnmute} style={{ marginRight: "16px" }}>
            <VolumeOffIcon />
          </IconButton>
        ) : (
          <IconButton onClick={handleMute} style={{ marginRight: "16px" }}>
            <VolumeUpIcon />
          </IconButton>
        )}
        <CustomSlider value={volume * 100} onChange={handleVolumeChange} />
      </div>
    </div>
  );
}

export default AudioOptionsController;
