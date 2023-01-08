import React from "react";
import Dashboard from "../Dashboard";

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
  previous,
  next,
  randomNext,
  setPlaylists,
}) {
  return (
    <Dashboard
      audio={audio}
      setAudio={setAudio}
      audioDetails={audioDetails}
      setAudioDetails={setAudioDetails}
      playlists={playlists}
      setQueue={setQueue}
    />
  );
}

export default Home;
