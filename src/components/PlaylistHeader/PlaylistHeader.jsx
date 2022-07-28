import React from "react";
import shortenString from "../../utils/shortenString";
import PlaylistImage from "../PlaylistImage";
import styles from "./PlaylistHeader.module.scss";

function PlaylistHeader({ playlist }) {
  return (
    <div className={styles["playlist-header"]}>
      <PlaylistImage
        songImages={playlist.songs
          .filter((song) => song.image !== null)
          .map((song) => song.image)}
      />
      <div className={styles["playlist-header-title"]}>
        {playlist.name}
        <div className={styles["playlist-header-owner"]}>
          by{" "}
          {playlist.owner.username ??
            shortenString(playlist.owner.walletAddress, 15)}
        </div>
      </div>
    </div>
  );
}

export default PlaylistHeader;
