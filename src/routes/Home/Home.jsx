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
}) {
  return (
    <div className={styles.home}>
      <Header token={token} setToken={setToken} />
      {token === null ? (
        <WebsiteIntro />
      ) : (
        <React.Fragment>
          <Dashboard
            audio={audio}
            setAudio={setAudio}
            audioDetails={audioDetails}
            setAudioDetails={setAudioDetails}
            token={token}
            setToken={setToken}
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
