import React from "react";
import CustomButtonFilled from "../CustomButtonFilled";
import SongCard from "../SongCard/SongCard";
import { useNavigate } from "react-router-dom";
import styles from "./DashboardShowcasePanel.module.scss";

function DashboardShowcasePanel({
  title,
  songs,
  moreInfoLink,
  audio,
  setAudio,
  audioDetails,
  setAudioDetails,
  moreInfoLabel = "View more like this...",
  setQueue,
  icon = null,
}) {
  const navigate = useNavigate();
  return (
    <div className={styles["dashboard-showcase-panel"]}>
      <div className={styles["dashboard-header"]}>
        <div data-testid={"dashboard-showcase-panel-title"}>{title}</div>
        <div>
          <CustomButtonFilled
            text={moreInfoLabel}
            onClick={() => navigate(moreInfoLink)}
          />
        </div>
      </div>
      <div
        data-testid={"dashboard-song-container"}
        className={styles["dashboard-song-container"]}
      >
        {songs.map((song) => {
          return (
            <SongCard
              song={song}
              key={song?._id}
              audio={audio}
              setAudio={setAudio}
              audioDetails={audioDetails}
              setAudioDetails={setAudioDetails}
              setQueue={setQueue}
            />
          );
        })}
      </div>
    </div>
  );
}

export default DashboardShowcasePanel;
