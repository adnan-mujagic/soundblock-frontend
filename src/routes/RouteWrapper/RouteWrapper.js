import React from "react";
import { Route, Routes } from "react-router-dom";
import AudioOptionsController from "../../components/AudioOptionsController";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Account from "../Account";
import Artist from "../Artist";
import Dashboard from "../Dashboard";
import Explore from "../Explore";
import Playlist from "../Playlist";
import Purchases from "../Purchases/Purchases";
import PurchaseStatus from "../PurchaseStatus";
import Search from "../Search";
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
  generateQueue,
  playlists,
  getOwnPlaylists,
  previous,
  next,
  randomNext,
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
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  audio={audio}
                  setAudio={setAudio}
                  audioDetails={audioDetails}
                  setAudioDetails={setAudioDetails}
                  setQueue={setQueue}
                />
              }
            />
            <Route
              path="/purchases"
              element={
                <Purchases
                  audio={audio}
                  setAudio={setAudio}
                  audioDetails={audioDetails}
                  setAudioDetails={setAudioDetails}
                  token={token}
                  setQueue={setQueue}
                  playlists={playlists}
                  getOwnPlaylists={getOwnPlaylists}
                />
              }
            />
            <Route
              path="/explore"
              element={
                <Explore
                  audio={audio}
                  setAudio={setAudio}
                  audioDetails={audioDetails}
                  setAudioDetails={setAudioDetails}
                  token={token}
                  setQueue={setQueue}
                />
              }
            />
            <Route
              path="/account"
              element={
                <Account
                  audio={audio}
                  setAudio={setAudio}
                  audioDetails={audioDetails}
                  setAudioDetails={setAudioDetails}
                  token={token}
                  setQueue={setQueue}
                />
              }
            />
            <Route
              path="/purchase-status"
              element={<PurchaseStatus token={token} />}
            />
            <Route
              path="/playlists/:id"
              element={
                <Playlist
                  generateQueue={generateQueue}
                  audio={audio}
                  setAudio={setAudio}
                  audioDetails={audioDetails}
                  setAudioDetails={setAudioDetails}
                  token={token}
                  getOwnPlaylists={getOwnPlaylists}
                />
              }
            />
            <Route
              path="/artists/:id"
              element={
                <Artist
                  token={token}
                  audio={audio}
                  setAudio={setAudio}
                  audioDetails={audioDetails}
                  setAudioDetails={setAudioDetails}
                  setQueue={setQueue}
                />
              }
            />
            <Route
              path="/search"
              element={
                <Search
                  audio={audio}
                  setAudio={setAudio}
                  audioDetails={audioDetails}
                  setAudioDetails={setAudioDetails}
                  token={token}
                  setQueue={setQueue}
                />
              }
            />
          </Routes>
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
