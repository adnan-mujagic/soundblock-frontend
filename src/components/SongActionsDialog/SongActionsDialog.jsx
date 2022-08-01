import { Collapse, Dialog, DialogActions } from "@mui/material";
import React, { useEffect, useState } from "react";
import colors from "../../utils/colors.js";
import { defaultSongImage } from "../../utils/defaultImage";
import fetchDataWithAuth from "../../utils/fetchDataWithAuth";
import shortenString from "../../utils/shortenString.js";

import typography from "../../utils/typography";
import CustomButtonFilled from "../CustomButtonFilled";
import DefaultAlert from "../DefaultAlert/DefaultAlert";
import styles from "./SongActionsDialog.module.scss";

function SongActionsDialog({ open, song, handleClose }) {
  const [loadingPlaylists, setLoadingPlaylists] = useState(true);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [showPlaylists, setShowPlaylists] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    getUserPlaylists();
  }, []);

  const getUserPlaylists = async () => {
    setLoadingPlaylists(true);
    const response = await fetchDataWithAuth(
      "/users/playlists/getPlaylists",
      "GET"
    );
    if (response.data) {
      setUserPlaylists(response.data);
    }
    setLoadingPlaylists(false);
  };

  const handlePlaylistSelect = async (playlistId, songId) => {
    const response = await fetchDataWithAuth(
      `/playlists/${playlistId}`,
      "POST",
      {
        songId,
      }
    );

    setAlertMessage(response.message);
    setAlertOpen(true);
  };

  const closePlaylistsAndDialog = (e) => {
    if (showPlaylists) {
      setShowPlaylists(false);
    }
    handleClose(e);
  };

  const handleAddNewPlaylist = async () => {
    const body = {
      name: "New Playlist (" + song.name + ")",
      songs: [song._id],
    };
    const response = await fetchDataWithAuth("/playlists", "POST", body);
    setAlertMessage(response?.message);
    setAlertOpen(true);
    getUserPlaylists();
  };

  return (
    <Dialog open={open} fullWidth>
      <DefaultAlert
        message={alertMessage}
        open={alertOpen}
        setOpen={setAlertOpen}
      />
      <div className={styles["actions-dialog-header"]}>
        <div
          style={{
            aspectRatio: "1/1",
            backgroundImage: `url("${song.image ?? defaultSongImage}")`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            border: `1px solid ${colors.border}`,
            marginBottom: "16px",
            height: "112px",
          }}
        />
        <div className={styles["actions-dialog-header-text"]}>
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
          <div style={{ fontSize: typography.title }}>{song.name}</div>
          <div style={{ fontSize: typography.tiny }}>
            {song.artist[0].username ||
              shortenString(song.artist[0].walletAddress, 15)}
          </div>
        </div>
      </div>
      <div style={{ marginLeft: "16px", marginRight: "16px" }}>
        {!loadingPlaylists && (
          <CustomButtonFilled
            onClick={() => setShowPlaylists(!showPlaylists)}
            text={"Add to playlist"}
          />
        )}
        <Collapse in={showPlaylists} style={{ marginTop: "16px" }}>
          {userPlaylists.map((playlist) => (
            <PlaylistItem
              key={playlist._id}
              handleClick={handlePlaylistSelect}
              playlist={playlist}
              songId={song._id}
            />
          ))}
          <CustomButtonFilled
            text={"Add to a new playlist"}
            style={{ marginTop: "16px" }}
            onClick={handleAddNewPlaylist}
          />
        </Collapse>
      </div>

      <DialogActions>
        <CustomButtonFilled text={"Close"} onClick={closePlaylistsAndDialog} />
      </DialogActions>
    </Dialog>
  );
}

function PlaylistItem({ playlist, handleClick, songId }) {
  return (
    <div
      onClick={() => handleClick(playlist._id, songId)}
      className={styles["playlist-item"]}
    >
      {playlist.name}
    </div>
  );
}

export default SongActionsDialog;
