import styles from "./SongCard.module.scss";
import DefaultAlert from "../DefaultAlert/DefaultAlert";
import { useState } from "react";
import fetchDataWithAuth from "../../utils/fetchDataWithAuth";
import { contractAddress } from "../../utils/connectWallet";
import { ethers } from "ethers";
import shortenString from "../../utils/shortenString";
import { defaultSongImage } from "../../utils/defaultImage";
import useAudio from "../../hooks/useAudio";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import { useNavigate } from "react-router-dom";
import CustomButtonFilled from "../CustomButtonFilled";
import colors from "../../utils/colors";
import { songCategories } from "../../utils/songCategories";
import Badge from "../Badge";

function SongCard({
  audio,
  setAudio,
  audioDetails,
  setAudioDetails,
  song,
  canBuy = false,
  showViewArtist = true,
}) {
  const [message, setMessage] = useState(null);
  const [purchasing, setPurchasing] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [handlePlay, handlePause] = useAudio(
    song,
    audio,
    setAudio,
    setAudioDetails
  );

  const navigate = useNavigate();

  const handleArtistClick = () => {
    navigate("/artists/" + song.artist[0]._id);
  };

  const getUploadStatusColor = (uploadStatus) => {
    if (uploadStatus === "SUCCESSFUL") {
      return colors.green;
    } else if (uploadStatus === "ERROR") {
      return colors.error;
    }
    return colors.warning;
  };

  let { isPlaying, source } = audioDetails;
  let ownSongLocation = song.songLocation;

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
      <div className={styles["song-card-top-right-popup"]}>
        {ownSongLocation === source && isPlaying ? (
          <PauseCircleIcon
            onClick={handlePause}
            style={{
              cursor: "pointer",
              fontSize: "60",
              color: colors.green,
            }}
          />
        ) : (
          <PlayCircleIcon
            onClick={handlePlay}
            style={{
              cursor: "pointer",
              fontSize: "60",
              color: colors.green,
            }}
          />
        )}
      </div>

      <div className={styles["song-card-bottom-right-popup"]}>
        {canBuy && !purchasing && (
          <CustomButtonFilled text={"Buy"} onClick={handleBuy} />
        )}
      </div>

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
            backgroundImage: `url("${song.image ?? defaultSongImage}")`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            borderRadius: "8px",
            marginBottom: "16px",
          }}
        ></div>
      </div>
      <div className="song-card-info">
        <div className={styles["song-card-status-track"]}>
          {song.uploadStatus && (
            <Badge
              label="Status"
              title={
                song.uploadStatus.charAt(0) +
                song.uploadStatus.slice(1).toLowerCase()
              }
              backgroundColor={getUploadStatusColor(song.uploadStatus)}
            />
          )}
          {song.transactionLink && (
            <Badge
              title="Transaction"
              link={song.transactionLink}
              backgroundColor={colors.green}
            />
          )}
          {song.category && (
            <Badge
              title={song.category}
              backgroundColor={
                songCategories.find(
                  (category) => category.name === song.category
                )?.color || colors.green
              }
            />
          )}
        </div>
        {song?.price && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              alt="ETH"
              style={{ height: "20px", marginRight: "5px" }}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1257px-Ethereum_logo_2014.svg.png"
            />
            {song.price}
          </div>
        )}
        {song?.name && <div>{song.name}</div>}
        {song?.artist[0] && (
          <div
            className={styles["artist-username"]}
            onClick={handleArtistClick}
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
