import { useState, useEffect } from "react";
import { defaultSongImage } from "../utils/defaultImage";

export default function useAudio(song, audio, setAudio, setAudioDetails) {
  const [backgroundAudio, setBackgroundAudio] = useState(null);

  useEffect(() => {
    loadAudio();
  }, []);

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

  return [handlePlay, handlePause];
}
