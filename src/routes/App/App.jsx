import { useEffect } from "react";
import { useState } from "react";
import WebsiteIntro from "../../components/WebsiteIntro";
import useQueue from "../../hooks/useQueue";
import fetchDataWithAuth from "../../utils/fetchDataWithAuth";
import SessionStorage from "../../utils/SessionStorage";
import RouteWrapper from "../RouteWrapper/RouteWrapper";
import styles from "./App.module.scss";

function App() {
  const [token, setToken] = useState(SessionStorage.getToken());
  const [audioDetails, setAudioDetails] = useState({
    isPlaying: false,
    source: "",
    name: "",
    image: "",
  });

  const [audio, setAudio] = useState(new Audio());
  const [queue, setQueue] = useState([]);
  const [playedSongs, setPlayedSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  const { generateQueue, previous, next, randomNext } = useQueue(
    queue,
    setQueue,
    playedSongs,
    setPlayedSongs,
    audio,
    setAudio,
    audioDetails,
    setAudioDetails
  );

  useEffect(() => {
    getUserPlaylists();
  }, []);

  const getUserPlaylists = async () => {
    if (!token) return;
    const response = await fetchDataWithAuth(
      "/users/playlists/getPlaylists",
      "GET"
    );
    if (response?.data) {
      setPlaylists(response.data);
    }
  };

  return (
    <div className={styles["app"]}>
      {token === null ? (
        <WebsiteIntro />
      ) : (
        <RouteWrapper
          queue={queue}
          setQueue={setQueue}
          generateQueue={generateQueue}
          audio={audio}
          setAudio={setAudio}
          audioDetails={audioDetails}
          setAudioDetails={setAudioDetails}
          token={token}
          setToken={setToken}
          playlists={playlists}
          getOwnPlaylists={getUserPlaylists}
          previous={previous}
          next={next}
          randomNext={randomNext}
          contentType={"Purchases"}
        />
      )}
    </div>
  );
}

export default App;
