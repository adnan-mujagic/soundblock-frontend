import { Collapse, Dialog, DialogActions } from "@mui/material";
import React, { useEffect, useState } from "react";
import fetchDataWithAuth from "../../utils/fetchDataWithAuth";

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

  return (
    <Dialog open={open} fullWidth>
      <DefaultAlert
        message={alertMessage}
        open={alertOpen}
        setOpen={setAlertOpen}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          margin: "16px",
        }}
      >
        <div
          style={{
            aspectRatio: "1/1",
            backgroundImage: `url("${
              song.image
                ? song.image
                : "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
            }")`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            borderRadius: "8px",
            marginBottom: "16px",
            height: "84px",
          }}
        />
        <div style={{ flex: "0.5", marginLeft: "16px" }}>
          <div style={{ fontSize: typography.title }}>{song.name}</div>
          <div style={{ fontSize: typography.tiny }}>
            {song.artist[0].username || song.artist[0].walletAddress}
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
