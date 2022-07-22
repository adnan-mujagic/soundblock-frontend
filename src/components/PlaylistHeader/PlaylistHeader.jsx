import React from "react";
import PlaylistImage from "../PlaylistImage";
import styles from "./PlaylistHeader.module.scss";

function PlaylistHeader({ playlist }) {
  return (
    <div className={styles["playlist-header"]}>
      <PlaylistImage
        songImages={playlist.songs
          .filter((song) => song.image !== undefined)
          .map((song) => song.image)}
      />
      <div className={styles["playlist-header-title"]}>
        {playlist.name}
        <div className={styles["playlist-header-owner"]}>
          by {playlist.owner.username ?? playlist.owner.walletAddress}
        </div>
      </div>
    </div>
  );
}

export default PlaylistHeader;
