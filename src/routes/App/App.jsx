import { useEffect } from "react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import fetchDataWithAuth from "../../utils/fetchDataWithAuth";
import SessionStorage from "../../utils/SessionStorage";
import Account from "../Account";
import Artist from "../Artist";
import Explore from "../Explore";
import Home from "../Home";
import Playlist from "../Playlist";
import Purchases from "../Purchases/Purchases";
import PurchaseStatus from "../PurchaseStatus";
import Search from "../Search";
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
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    getUserPlaylists();
  }, []);

  const getUserPlaylists = async () => {
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
      <Routes>
        <Route
          path="/"
          element={
            <Home
              audio={audio}
              setAudio={setAudio}
              audioDetails={audioDetails}
              setAudioDetails={setAudioDetails}
              token={token}
              setToken={setToken}
              queue={queue}
              setQueue={setQueue}
              playlists={playlists}
            />
          }
        ></Route>
        <Route
          path="/purchases"
          element={
            <Purchases
              queue={queue}
              setQueue={setQueue}
              audio={audio}
              setAudio={setAudio}
              audioDetails={audioDetails}
              setAudioDetails={setAudioDetails}
              token={token}
              setToken={setToken}
              playlists={playlists}
              getOwnPlaylists={getUserPlaylists}
            />
          }
        ></Route>
        <Route
          path="/explore"
          element={
            <Explore
              queue={queue}
              setQueue={setQueue}
              audio={audio}
              setAudio={setAudio}
              audioDetails={audioDetails}
              setAudioDetails={setAudioDetails}
              token={token}
              setToken={setToken}
              playlists={playlists}
              getOwnPlaylists={getUserPlaylists}
            />
          }
        ></Route>
        <Route
          path="/account"
          element={
            <Account
              queue={queue}
              setQueue={setQueue}
              audio={audio}
              setAudio={setAudio}
              audioDetails={audioDetails}
              setAudioDetails={setAudioDetails}
              token={token}
              setToken={setToken}
              playlists={playlists}
            />
          }
        ></Route>
        <Route
          path="/purchase-status"
          element={
            <PurchaseStatus
              queue={queue}
              setQueue={setQueue}
              audio={audio}
              setAudio={setAudio}
              audioDetails={audioDetails}
              setAudioDetails={setAudioDetails}
              token={token}
              setToken={setToken}
              playlists={playlists}
            />
          }
        ></Route>
        <Route
          path="/playlists/:id"
          element={
            <Playlist
              queue={queue}
              setQueue={setQueue}
              audio={audio}
              setAudio={setAudio}
              audioDetails={audioDetails}
              setAudioDetails={setAudioDetails}
              token={token}
              setToken={setToken}
              playlists={playlists}
              getOwnPlaylists={getUserPlaylists}
            />
          }
        ></Route>
        <Route
          path="/artists/:id"
          element={
            <Artist
              token={token}
              setToken={setToken}
              audio={audio}
              setAudio={setAudio}
              audioDetails={audioDetails}
              setAudioDetails={setAudioDetails}
              queue={queue}
              setQueue={setQueue}
              playlists={playlists}
            />
          }
        ></Route>
        <Route
          path="/search"
          element={
            <Search
              audio={audio}
              setAudio={setAudio}
              audioDetails={audioDetails}
              setAudioDetails={setAudioDetails}
              token={token}
              setToken={setToken}
              playlists={playlists}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
