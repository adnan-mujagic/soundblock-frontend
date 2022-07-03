import React from "react";
import Header from "../../components/Header/Header";
import styles from "./Home.module.scss";
import Dashboard from "../Dashboard";
import WebsiteIntro from "../../components/WebsiteIntro";
function Home({ token, setToken, audio, audioDetails, setAudioDetails }) {
  return (
    <div className={styles.home}>
      <Header token={token} setToken={setToken} />
      {token === null ? (
        <WebsiteIntro />
      ) : (
        <Dashboard
          audio={audio}
          audioDetails={audioDetails}
          setAudioDetails={setAudioDetails}
          token={token}
          setToken={setToken}
        />
      )}
    </div>
  );
}

export default Home;
