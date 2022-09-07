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
import getColorFromString from "../../utils/getColorFromString";
import { defaultSongImage } from "../../utils/defaultImage";
import { IconButton, Tooltip } from "@mui/material";
import fetchDataWithAuth from "../../utils/fetchDataWithAuth";
import EmptyContent from "../EmptyContent/EmptyContent";
import useAudio from "../../hooks/useAudio";
import { useNavigate } from "react-router-dom";

function PlaylistDatatableRow({
  generateQueue,
  idx,
  song,
  audio,
  setAudio,
  audioDetails,
  setAudioDetails,
  handleRemove,
}) {
  const navigate = useNavigate();
  const { source, isPlaying } = audioDetails;
  const ownSongLocation = song.songLocation;
  const [handlePlay, handlePause] = useAudio(
    song,
    audio,
    setAudio,
    setAudioDetails
  );

  const handlePlayAndGenerateQueue = () => {
    console.log("Playing song with name", song.name);
    handlePlay();
    if (source !== ownSongLocation) {
      generateQueue(song._id);
    }
  };

  const onRemoveRequest = () => {
    handleRemove(song._id);
  };

  const handleArtistClick = () => {
    const artistId = song.artist[0]._id;
    if (artistId) {
      navigate(`/artists/${artistId}`);
    }
  };

  return (
    <div className={styles["playlist-datatable-row"]}>
      <div className={styles["playlist-datatable-overlay-left"]}>
        {!isPlaying || source !== ownSongLocation ? (
          <CustomIconButton onClick={handlePlayAndGenerateQueue}>
            <PlayArrowIcon />
          </CustomIconButton>
        ) : (
          <CustomIconButton onClick={handlePause}>
            <PauseIcon />
          </CustomIconButton>
        )}
      </div>
      <div className={styles["playlist-datatable-overlay-right"]}>
        <Tooltip title="Remove from playlist">
          <IconButton onClick={onRemoveRequest}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </div>
      <div style={{ ...tableCellStyles, flex: 0.1 }}>{idx}</div>
      <div style={{ ...tableCellStyles, flex: 1 }}>
        <div
          className={styles["playlist-datatable-removable-item"]}
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
        <div
          onClick={handleArtistClick}
          style={{ cursor: "pointer", width: "fit-content" }}
        >
          {song.artist[0].username ||
            shortenString(song.artist[0].walletAddress, 20)}
        </div>
      </div>
    </div>
  );
}

function PlaylistsDatatable({
  generateQueue,
  songs,
  audio,
  setAudio,
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
    await fetchDataWithAuth(`/playlists/removeSong/${playlistId}`, "DELETE", {
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

  let sortedSongs = songs.sort(getComparator(order, orderBy));
  console.log("Sorted songs are: ", sortedSongs);

  const generateQueueWithPlaylist = (songId) => {
    generateQueue(songId, sortedSongs);
  };

  return (
    <div className={styles["playlists-datatable"]}>
      <TableHead
        order={order}
        orderBy={orderBy}
        onRequestSort={onRequestSort}
      />
      {sortedSongs.map((song, idx) => (
        <PlaylistDatatableRow
          generateQueue={generateQueueWithPlaylist}
          key={idx}
          idx={idx + 1}
          song={song}
          audio={audio}
          setAudio={setAudio}
          audioDetails={audioDetails}
          setAudioDetails={setAudioDetails}
          handleRemove={handleRemove}
        />
      ))}
    </div>
  );
}

export default PlaylistsDatatable;
