import React, { useState } from "react";
import {
  CustomIconButton,
  getComparator,
  headCells,
  tableCellStyles,
  TableHead,
} from "../SongsDatatable/SongsDatatable";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import styles from "./PlaylistsDatatable.module.scss";
import shortenString from "../../utils/shortenString";
import typography from "../../utils/typography";
import getColorFromString from "../../utils/getColorFromString";
import { defaultSongImage } from "../../utils/defaultImage";

function PlaylistDatatableOverlay({ isPlaying, handlePlay, handlePause }) {
  return (
    <div className={styles["playlist-datatable-overlay"]}>
      <div>
        {!isPlaying ? (
          <CustomIconButton onClick={handlePlay}>
            <PlayArrowIcon />
          </CustomIconButton>
        ) : (
          <CustomIconButton onClick={handlePause}>
            <PauseIcon />
          </CustomIconButton>
        )}
      </div>
    </div>
  );
}

function PlaylistDatatableRow({
  idx,
  song,
  audio,
  audioDetails,
  setAudioDetails,
}) {
  const { source, isPlaying } = audioDetails;
  const ownSongLocation = song.songLocation;

  const handlePlay = () => {
    console.log("Playing...");
  };

  const handlePause = () => {
    console.log("Pausing...");
  };

  return (
    <div className={styles["playlist-datatable-row"]}>
      {
        <PlaylistDatatableOverlay
          handlePlay={handlePlay}
          handlePause={handlePause}
          isPlaying={ownSongLocation === source && isPlaying}
        />
      }
      <div style={{ ...tableCellStyles, flex: 0.1 }}>{idx}</div>
      <div style={{ ...tableCellStyles, flex: 1 }}>
        <div
          style={{
            aspectRatio: "1 / 1",
            height: "40px",
            backgroundImage: `url(${song.image ?? defaultSongImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "4px",
            overflow: "hidden",
            marginRight: "10px",
          }}
        />
        {song.name}
      </div>
      <div
        style={{
          ...tableCellStyles,
          flex: 1,
          color: getColorFromString(song.artist[0].walletAddress),
        }}
      >
        {song.artist[0].username ||
          shortenString(song.artist[0].walletAddress, 20)}
      </div>
      <div style={{ ...tableCellStyles, flex: 1 }}></div>
    </div>
  );
}

function PlaylistsDatatable({ songs, audio, audioDetails, setAudioDetails }) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(headCells[1].id);

  const onRequestSort = (event, cellId) => {
    if (orderBy === cellId) {
      if (order === "asc") {
        setOrder("desc");
      } else {
        setOrder("asc");
      }
    } else {
      setOrder("asc");
      setOrderBy(cellId);
    }
  };

  return (
    <div className={styles["playlists-datatable"]}>
      <TableHead
        order={order}
        orderBy={orderBy}
        onRequestSort={onRequestSort}
      />
      {songs.sort(getComparator(order, orderBy)).map((song, idx) => (
        <PlaylistDatatableRow
          idx={idx + 1}
          song={song}
          audio={audio}
          audioDetails={audioDetails}
          setAudioDetails={setAudioDetails}
        />
      ))}
    </div>
  );
}

export default PlaylistsDatatable;
