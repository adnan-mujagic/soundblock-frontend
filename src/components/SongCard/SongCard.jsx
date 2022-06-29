import getColorFromString from "../../utils/getColorFromString";
import typography from "../../utils/typography";
import styles from "./SongCard.module.scss";
import SongCardOverlay from "../SongCardOverlay/SongCardOverlay";
import DefaultAlert from "../DefaultAlert/DefaultAlert";
import { useState } from "react";
import fetchDataWithAuth from "../../utils/fetchDataWithAuth";
import connect, { contractAddress } from "../../utils/connectWallet";
import { ethers } from "ethers";
import shortenString from "../../utils/shortenString";

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
    try {
      setPurchasing(true);
      if (!canBuy) {
        throw new Error("Can't buy this song");
      }
      if (!window.ethereum) {
        throw new Error(
          "Looks like you don't have a wallet extension installed. We can't make transactions without it."
        );
      }
      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      ethers.utils.getAddress(contractAddress);
      const tx = await signer.sendTransaction({
        to: contractAddress,
        value: ethers.utils.parseEther(song.price.toString()),
        gasLimit: ethers.utils.parseEther("0.00000000001"),
      });
      console.log(tx);

      const response = await fetchDataWithAuth(
        "/users/purchaseSong/" + song._id,
        "POST"
      );
      setMessage(response.message);
      setAlertOpen(true);
    } catch (error) {
      setPurchasing(false);
      setMessage(error.message);
      setAlertOpen(true);
    }
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
            {shortenString(
              song.artist[0].username
                ? song.artist[0].username
                : song.artist[0].walletAddress,
              20
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SongCard;
