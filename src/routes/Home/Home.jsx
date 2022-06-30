import React from "react";
import Header from "../../components/Header/Header";
import styles from "./Home.module.scss";
import Dashboard from "../Dashboard";
function Home({ token, setToken, audio, audioDetails, setAudioDetails }) {
  return (
    <div className={styles.home}>
      <Header token={token} setToken={setToken} />
      {token === null ? (
        <div>Explanation of the website</div>
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
