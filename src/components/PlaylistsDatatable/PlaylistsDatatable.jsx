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
import CloseIcon from "@mui/icons-material/Close";
import styles from "./PlaylistsDatatable.module.scss";
import shortenString from "../../utils/shortenString";
import typography from "../../utils/typography";
import getColorFromString from "../../utils/getColorFromString";
import { defaultSongImage } from "../../utils/defaultImage";
import { IconButton, Tooltip } from "@mui/material";
import fetchDataWithAuth from "../../utils/fetchDataWithAuth";
import EmptyContent from "../EmptyContent/EmptyContent";

function PlaylistDatatableOverlay({
  isPlaying,
  handlePlay,
  handlePause,
  handleRemove,
}) {
  return (
    <div className={styles["playlist-datatable-overlay"]}>
      <div style={{ marginLeft: "10px" }}>
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
      <div style={{ marginRight: "10px" }}>
        <Tooltip title="Remove from playlist">
          <IconButton onClick={handleRemove}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
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
  handleRemove,
}) {
  const { source, isPlaying } = audioDetails;
  const ownSongLocation = song.songLocation;

  const handlePlay = () => {
    console.log("Playing...");
  };

  const handlePause = () => {
    console.log("Pausing...");
  };

  const onRemoveRequest = () => {
    handleRemove(song._id);
  };

  return (
    <div className={styles["playlist-datatable-row"]}>
      {
        <PlaylistDatatableOverlay
          handlePlay={handlePlay}
          handlePause={handlePause}
          isPlaying={ownSongLocation === source && isPlaying}
          handleRemove={onRemoveRequest}
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

function PlaylistsDatatable({
  songs,
  audio,
  audioDetails,
  setAudioDetails,
  playlistId,
  refreshSongs,
}) {
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

  const handleRemove = async (songId) => {
    await fetchDataWithAuth(`/playlists/${playlistId}`, "DELETE", {
      songId: songId,
    });
    refreshSongs();
  };

  if (songs.length <= 0) {
    return (
      <div style={{ marginTop: "24px" }}>
        <EmptyContent
          message="Oops, looks like this playlist is currently empty."
          isAnimated
        />
      </div>
    );
  }

  return (
    <div className={styles["playlists-datatable"]}>
      <TableHead
        order={order}
        orderBy={orderBy}
        onRequestSort={onRequestSort}
      />
      {songs.sort(getComparator(order, orderBy)).map((song, idx) => (
        <PlaylistDatatableRow
          key={idx}
          idx={idx + 1}
          song={song}
          audio={audio}
          audioDetails={audioDetails}
          setAudioDetails={setAudioDetails}
          handleRemove={handleRemove}
        />
      ))}
    </div>
  );
}

export default PlaylistsDatatable;
