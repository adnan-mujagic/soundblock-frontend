import React from "react";
import Header from "../../components/Header/Header";
import styles from "./Home.module.scss";
import Dashboard from "../Dashboard";
import WebsiteIntro from "../../components/WebsiteIntro";
import AudioOptionsController from "../../components/AudioOptionsController";
function Home({
  token,
  setToken,
  audio,
  setAudio,
  audioDetails,
  setAudioDetails,
  queue,
  setQueue,
  playlists,
}) {
  return (
    <div className={styles.home}>
      <Header token={token} setToken={setToken} playlists={playlists} />
      {token === null ? (
        <WebsiteIntro />
      ) : (
        <React.Fragment>
          <Dashboard
            audio={audio}
            setAudio={setAudio}
            audioDetails={audioDetails}
            setAudioDetails={setAudioDetails}
            playlists={playlists}
          />
          <AudioOptionsController
            queue={queue}
            setQueue={setQueue}
            audio={audio}
            setAudio={setAudio}
            setAudioDetails={setAudioDetails}
            audioDetails={audioDetails}
          />
        </React.Fragment>
      )}
    </div>
  );
}

export default Home;
