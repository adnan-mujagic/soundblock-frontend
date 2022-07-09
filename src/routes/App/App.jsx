import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import SessionStorage from "../../utils/SessionStorage";
import Account from "../Account";
import Explore from "../Explore";
import Home from "../Home";
import Purchases from "../Purchases/Purchases";
import styles from "./App.module.scss";

let audio = new Audio();

function App() {
  const [token, setToken] = useState(SessionStorage.getToken());
  const [audioDetails, setAudioDetails] = useState({
    isPlaying: false,
    source: "",
    name: "",
    image: "",
  });

  const [queue, setQueue] = useState([]);

  // Making sure that when the song ends, the state is altered to not playing

  return (
    <div className={styles["app"]}>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              audio={audio}
              audioDetails={audioDetails}
              setAudioDetails={setAudioDetails}
              token={token}
              setToken={setToken}
            />
          }
        ></Route>
        <Route
          path="/purchases"
          element={
            <Purchases
              audio={audio}
              audioDetails={audioDetails}
              setAudioDetails={setAudioDetails}
              token={token}
              setToken={setToken}
            />
          }
        ></Route>
        <Route
          path="/explore"
          element={
            <Explore
              audio={audio}
              audioDetails={audioDetails}
              setAudioDetails={setAudioDetails}
              token={token}
              setToken={setToken}
            />
          }
        ></Route>
        <Route
          path="/account"
          element={
            <Account
              audio={audio}
              audioDetails={audioDetails}
              setAudioDetails={setAudioDetails}
              token={token}
              setToken={setToken}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
