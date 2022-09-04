import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import colors from "../../utils/colors";
import fetchDataWithAuth from "../../utils/fetchDataWithAuth";
import CustomButtonFilled from "../CustomButtonFilled";
import CustomTextField from "../CustomTextField/CustomTextField";
import styles from "./EditPlaylist.module.scss";
import typography from "../../utils/typography";
import { useNavigate } from "react-router-dom";

function EditPlaylist({
  playlist,
  open,
  setOpen,
  getOwnPlaylists,
  getPlaylistInfo,
}) {
  const navigate = useNavigate();

  const [name, setName] = useState(playlist?.name || "");

  const handleClose = () => {
    setName(playlist.name);
    setOpen(false);
  };

  const handleUpdate = async () => {
    if (name !== playlist.name) {
      await fetchDataWithAuth(`/playlists/${playlist._id}`, "PUT", {
        name: name,
      });
    }
    getOwnPlaylists();
    getPlaylistInfo();
    setOpen(false);
  };

  const handleDelete = async () => {
    await fetchDataWithAuth(`/playlists/${playlist._id}`, "DELETE");
    getOwnPlaylists();
    navigate("/");
    setOpen(false);
  };

  const isDisabled = () => {
    return playlist?.name === name || name === "";
  };

  return (
    <Dialog open={open} fullWidth={true}>
      <DialogTitle>Edit Playlist</DialogTitle>
      <DialogContent>
        <CustomTextField
          testId="playlist-name-text-field"
          placeholder={"Playlist name..."}
          variant="outlined"
          text={name}
          setText={setName}
        />
        <div
          style={{
            marginTop: "24px",
          }}
        >
          <CustomButtonFilled
            text={"Update"}
            onClick={handleUpdate}
            disabled={isDisabled()}
          />
        </div>

        <div
          style={{
            color: colors.error,
            fontSize: typography.tiny,
            margin: "24px 0",
          }}
        >
          Danger Zone
        </div>
        <button
          data-testid={"delete-playlist-button"}
          className={styles["outlined-button"]}
          onClick={handleDelete}
        >
          <DeleteIcon />
          Delete
        </button>
      </DialogContent>
      <DialogActions>
        <CustomButtonFilled text={"Close"} onClick={handleClose} />
      </DialogActions>
    </Dialog>
  );
}

export default EditPlaylist;
