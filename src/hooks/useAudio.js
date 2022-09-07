import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { defaultSongImage } from "../utils/defaultImage";

export default function useAudio(
  song,
  audio,
  setAudio,
  setAudioDetails,
  setQueue
) {
  const [backgroundAudio, setBackgroundAudio] = useState(null);
  const location = useLocation();

  useEffect(() => {
    loadAudio();
  }, [song]);

  const songSource = song.songLocation;

  const loadAudio = () => {
    console.log("Background loading audio for song: " + song.name);
    let loadingAudio = new Audio();
    // cutting infura from the link because they are no longer a public IPFS gateway :/
    let modifiedSource = songSource.replace(".infura", "");
    loadingAudio.src = modifiedSource;
    loadingAudio.load();
    setBackgroundAudio(loadingAudio);
  };

  const handlePlay = () => {
    // clean up the queue if path not allowed
    cleanupQueue();
    if (audio.src !== songSource) {
      pauseAndRewindCurrentAudio();
      replaceWithNewAudioAndStartPlaying();
    } else {
      audio.play();
    }
    setAudioDetails({
      isPlaying: true,
      source: songSource,
      name: song.name,
      image: song.image || defaultSongImage,
    });
  };

  const handlePause = () => {
    audio.pause();
    setAudioDetails((previous) => {
      return { ...previous, isPlaying: false };
    });
  };

  const pauseAndRewindCurrentAudio = () => {
    audio.pause();
    audio.currentTime = 0;
  };

  const replaceWithNewAudioAndStartPlaying = () => {
    backgroundAudio.play();
    backgroundAudio.volume = audio.volume;
    backgroundAudio.loop = audio.loop;
    setAudio(backgroundAudio);
  };

  const cleanupQueue = () => {
    const allowedPath = new RegExp("/playlists/[a-z0-9]{24}");
    const isAllowedPath = allowedPath.test(location.pathname);
    if (!isAllowedPath) {
      console.log(
        "Cleaning up queue because play was called from a path that doesn't support queues"
      );
      setQueue([]);
    }
  };

  return [handlePlay, handlePause];
}
