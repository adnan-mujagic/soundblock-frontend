import getColorFromString from "../../utils/getColorFromString";
import typography from "../../utils/typography";
import styles from "./SongCard.module.scss";
import SongCardOverlay from "../SongCardOverlay/SongCardOverlay";
import DefaultAlert from "../DefaultAlert/DefaultAlert";
import { useState } from "react";
import fetchDataWithAuth from "../../utils/fetchDataWithAuth";

function SongCard({
  audio,
  audioDetails,
  setAudioDetails,
  song,
  canBuy = false,
}) {
  let { isPlaying, source } = audioDetails;

  let ownSongLocation = song.songLocation;

  const [message, setMessage] = useState(null);

  const [purchasing, setPurchasing] = useState(false);

  const [alertOpen, setAlertOpen] = useState(false);

  const handlePlay = (event) => {
    audio.load();
    audio.src = ownSongLocation;
    audio.play();
    setAudioDetails({ isPlaying: true, source: ownSongLocation });
  };

  const handlePause = (event) => {
    audio.pause();
    setAudioDetails({ isPlaying: false, source: ownSongLocation });
  };

  const handleBuy = async () => {
    if (!canBuy) {
      return;
    }

    // Todo: transfer funds from this account to address used on the backend
    setPurchasing(true);
    const response = await fetchDataWithAuth(
      "/users/purchaseSong/" + song._id,
      "POST"
    );
    setMessage(response.message);
    setAlertOpen(true);
  };

  return (
    <div className={styles["song-card"]}>
      {message && (
        <DefaultAlert
          message={message}
          open={alertOpen}
          setOpen={setAlertOpen}
        />
      )}
      <div>
        <div
          style={{
            aspectRatio: "1/1",
            background: `url("${
              song.image
                ? song.image
                : "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
            }")`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            borderRadius: "8px",
            marginBottom: "16px",
          }}
        >
          <SongCardOverlay
            canBuy={canBuy && !purchasing}
            showPlayPause={!!ownSongLocation}
            isPlaying={ownSongLocation === source && isPlaying}
            handlePlay={handlePlay}
            handlePause={handlePause}
            handleBuy={handleBuy}
          />
        </div>
      </div>
      <div className="song-card-info">
        {song?.name && <div>{song.name}</div>}
        {song?.artist[0] && (
          <div
            style={{
              fontSize: typography.tiny,
              color: getColorFromString(
                song.artist[0].username || song.artist[0].walletAddress
              ),
            }}
          >
            {song.artist[0].username
              ? song.artist[0].username
              : song.artist[0].walletAddress}
          </div>
        )}
      </div>
    </div>
  );
}

export default SongCard;
