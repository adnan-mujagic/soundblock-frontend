import { defaultSongImage } from "../utils/defaultImage";

export default function useQueue(
  queue,
  setQueue,
  playedSongs,
  setPlayedSongs,
  audio,
  setAudio,
  audioDetails,
  setAudioDetails
) {
  const generateQueue = (playedSongId, songList) => {
    console.log("Using generateQueue() method");
    const indexOfPlayedSong = songList
      .map((song) => song._id)
      .indexOf(playedSongId);

    const nextChunk = songList.slice(indexOfPlayedSong + 1);

    const previousChunk = songList.slice(0, indexOfPlayedSong);

    const generatedSongs = [songList[indexOfPlayedSong]].concat(
      nextChunk,
      previousChunk
    );

    const generatedSongQueue = generatedSongs.map((song) => {
      const loadingAudio = new Audio(song.songLocation.replace(".infura", ""));
      console.log(
        "Background loading song: " +
          song.name +
          " because it is added to the queue"
      );

      loadingAudio.load();

      return {
        _id: song._id,
        source: song.songLocation,
        name: song.name,
        image: song.image,
        loadingAudio: loadingAudio,
      };
    });

    console.log("Generated song queue: ", generatedSongQueue);

    setQueue(generatedSongQueue);

    setPlayedSongs([generatedSongQueue[0]]);
  };

  const next = () => {
    console.log("Using next() method");
    const playedSongIds = playedSongs.map((playedSong) => playedSong._id);
    console.log("Played song ids are: ", playedSongIds);

    const nextSong = queue.find((song) => !playedSongIds.includes(song._id));

    if (nextSong) {
      console.log(
        "Found next song to play: ",
        nextSong.name,
        nextSong.loadingAudio
      );
      let newPlayed = [...playedSongs, nextSong];
      console.log(
        "New played songs: ",
        newPlayed.map((song) => song._id)
      );
      setPlayedSongs(newPlayed);
      handlePlay(nextSong);
    } else {
      console.log(
        "Couldn't find next song to play, reseting to first played song"
      );
      const firstSong = playedSongs[0];
      setPlayedSongs([firstSong]);
      handlePlay(firstSong);
    }
  };

  const previous = () => {
    console.log("Using previous() method");
    const hasPrevious = playedSongs.length >= 2;

    if (hasPrevious) {
      const previous = playedSongs[playedSongs.length - 2];
      console.log("The queue has a previous song: ", previous);
      removeLastPlayedSong();
      handlePlay(previous);
    } else {
      console.log("Queue has no previous song, returning the current song");
      const current = playedSongs[0];
      handlePlay(current);
    }
  };

  const randomNext = () => {
    console.log("Using randomNext() method");
    const songSelectionPool = queue.filter(
      (song) => !playedSongs.includes(song)
    );
    if (songSelectionPool.length) {
      console.log(
        `Queue has ${songSelectionPool.length} possible winners in the selection pool`
      );
      const winner = getRandomElement(songSelectionPool);
      setPlayedSongs([...playedSongs, winner]);
      console.log("Winner is: ", winner.name);
      handlePlay(winner);
    } else {
      console.log(
        "Queue has no possible winners in the selection pool, getting random song from the whole queue"
      );
      const winner = getRandomElement(queue);
      setPlayedSongs([winner]);
      console.log("Winner is: ", winner);
      handlePlay(winner);
    }
  };

  const removeLastPlayedSong = () => {
    const playedSongsWithoutLast = playedSongs.slice(0, playedSongs.length - 1);

    console.log("Removed last played song: ", playedSongsWithoutLast);
    setPlayedSongs(playedSongsWithoutLast);
  };

  const getRandomElement = (elements) => {
    return elements[Math.floor(Math.random() * elements.length)];
  };

  const handlePlay = (nextSong) => {
    // cleanup current song audio (pause it, rewind it)
    const currentSong = queue.find(
      (song) => song.source === audioDetails.source
    );
    if (currentSong.source === nextSong.source) {
      audio.currentTime = 0;
      return;
    }

    resetAudio(audio);
    resetAudio(currentSong.loadingAudio);
    // set up new song (copy current volume, and loop)
    const nextAudio = nextSong.loadingAudio;
    nextAudio.volume = audio.volume;
    nextAudio.loop = audio.loop;
    nextAudio.play();
    setAudio(nextAudio);
    // set audio details
    const { source, name, image } = nextSong;
    setAudioDetails({
      source,
      name,
      image: image || defaultSongImage,
      isPlaying: true,
    });
  };

  const resetAudio = (audio) => {
    audio.pause();
    audio.currentTime = 0;
  };

  return { generateQueue, next, previous, randomNext };
}
