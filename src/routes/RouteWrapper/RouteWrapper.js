import React from "react";
import AudioOptionsController from "../../components/AudioOptionsController";
import ContentType from "../../components/ContentType/ContentType";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./RouteWrapper.module.scss";

function RouteWrapper({
  audio,
  setAudio,
  audioDetails,
  setAudioDetails,
  token,
  setToken,
  queue,
  setQueue,
  playlists,
  getOwnPlaylists,
  previous,
  next,
  randomNext,
  content,
  contentType,
}) {
  return (
    <div>
      <Header
        token={token}
        setToken={setToken}
        playlists={playlists}
        audio={audio}
      />
      <div className={styles["content-container"]}>
        <Sidebar audioDetails={audioDetails} playlists={playlists} />
        <div className={styles["main-content-wrapper"]}>
          <ContentType contentType={contentType} />
          {content}
        </div>
      </div>
      <AudioOptionsController
        queue={queue}
        setQueue={setQueue}
        audio={audio}
        setAudioDetails={setAudioDetails}
        audioDetails={audioDetails}
        previous={previous}
        next={next}
        randomNext={randomNext}
      />
    </div>
  );
}

export default RouteWrapper;
