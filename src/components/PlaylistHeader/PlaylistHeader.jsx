import React, { useState } from "react";
import shortenString from "../../utils/shortenString";
import CustomButtonFilled from "../CustomButtonFilled";
import EditPlaylist from "../EditPlaylist";
import PlaylistImage from "../PlaylistImage";
import styles from "./PlaylistHeader.module.scss";

function PlaylistHeader({ playlist, getOwnPlaylists, getPlaylistInfo }) {
  const [editPlaylistDialogOpen, setEditPlaylistDialogOpen] = useState(false);

  return (
    <React.Fragment>
      <div className={styles["playlist-header"]}>
        <EditPlaylist
          open={editPlaylistDialogOpen}
          setOpen={setEditPlaylistDialogOpen}
          playlist={playlist}
          getOwnPlaylists={getOwnPlaylists}
          getPlaylistInfo={getPlaylistInfo}
        />
        <PlaylistImage
          songImages={playlist.songs
            .filter((song) => song.image !== null)
            .map((song) => song.image)}
        />
        <div
          data-testid="playlist-header-title"
          className={styles["playlist-header-title"]}
        >
          {playlist.name}
          <div className={styles["playlist-header-owner"]}>
            by{" "}
            {playlist.owner.username ??
              shortenString(playlist.owner.walletAddress, 15)}
          </div>
        </div>
      </div>
      <div className={styles["edit-profile-container"]}>
        <CustomButtonFilled
          text={"Edit Playlist"}
          onClick={() => setEditPlaylistDialogOpen(true)}
        />
      </div>
    </React.Fragment>
  );
}

export default PlaylistHeader;
