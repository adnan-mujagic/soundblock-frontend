import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import shortenString from "../../utils/shortenString";
import styles from "./SongsDatatable.module.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { styled } from "@mui/material/styles";
import colors from "../../utils/colors";
import { IconButton } from "@mui/material";
import SongActionsDialog from "../SongActionsDialog";
import { defaultSongImage } from "../../utils/defaultImage";
import getColorFromString from "../../utils/getColorFromString";
import useAudio from "../../hooks/useAudio";

export const headCells = [
  {
    id: "number",
    label: "#",
    sortable: false,
  },
  {
    id: "name",
    label: "NAME",
    sortable: true,
  },
  {
    id: "artist",
    label: "ARTIST",
    sortable: true,
  },
];

export const tableCellStyles = {
  display: "flex",
  alignItems: "center",
  padding: "24px",
};

function descendingComparator(a, b, orderBy) {
  let orderByValueA;
  let orderByValueB;
  if (orderBy === "name") {
    orderByValueA = a[orderBy];
    orderByValueB = b[orderBy];
  } else if (orderBy === "artist") {
    orderByValueA = a[orderBy][0].username || a[orderBy][0].walletAddress;
    orderByValueB = b[orderBy][0].username || b[orderBy][0].walletAddress;
  }

  if (orderByValueB < orderByValueA) {
    return -1;
  } else if (orderByValueB > orderByValueA) {
    return 1;
  }
  return 0;
}

export const CustomIconButton = styled(IconButton)({
  backgroundColor: colors.green,
  "&:hover": {
    backgroundColor: colors.green,
  },
});

export function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function TableHead({ order, orderBy, onRequestSort }) {
  return (
    <div className={styles["table-head"]}>
      {headCells.map((cell) => {
        return (
          <div
            item
            xs={cell.space}
            onClick={
              cell.sortable ? (event) => onRequestSort(event, cell.id) : null
            }
            key={cell.id}
            style={{
              ...tableCellStyles,
              flex: cell.id === "number" ? 0.1 : 1,
              cursor: cell.sortable ? "pointer" : "auto",
            }}
          >
            {cell.label}
            {orderBy === cell.id &&
              (order === "asc" ? (
                <KeyboardArrowUpIcon style={{ color: colors.green }} />
              ) : (
                <KeyboardArrowDownIcon style={{ color: colors.green }} />
              ))}
          </div>
        );
      })}
    </div>
  );
}

function TableRowOverlay({
  isPlaying,
  handlePlay,
  handlePause,
  song,
  handleExpandMore,
}) {
  return (
    <div className={styles["table-row-overlay"]}>
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
      <div>
        <IconButton onClick={(event) => handleExpandMore(event, song)}>
          <MoreHorizIcon />
        </IconButton>
      </div>
    </div>
  );
}

function TableRow({
  song,
  idx,
  audio,
  setAudio,
  audioDetails,
  setAudioDetails,
  handleExpandMore,
}) {
  const [handlePlay, handlePause] = useAudio(
    song,
    audio,
    setAudio,
    setAudioDetails
  );

  let ownSongLocation = song.songLocation;
  let { isPlaying, source } = audioDetails;

  return (
    <div className={styles["table-row"]}>
      <TableRowOverlay
        isPlaying={source === ownSongLocation && isPlaying}
        handlePlay={handlePlay}
        handlePause={handlePause}
        handleExpandMore={handleExpandMore}
        song={song}
      />
      <div style={{ ...tableCellStyles, flex: 0.1 }}>{idx}</div>
      <div style={{ ...tableCellStyles, flex: 1 }}>
        <div
          className={styles["removable"]}
          style={{
            height: "40px",
            aspectRatio: "1/1",
            backgroundImage: `url("${song.image ?? defaultSongImage}")`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            borderRadius: "4px",
          }}
        />
        <p className={styles["song-name"]}>{song.name}</p>
      </div>
      <div
        style={{
          ...tableCellStyles,
          flex: 1,
          color: getColorFromString(song.artist[0].walletAddress),
        }}
      >
        {song.artist[0]?.username ||
          shortenString(song.artist[0].walletAddress, 20)}
      </div>
    </div>
  );
}

function SongsDatatable({
  songs,
  audio,
  setAudio,
  audioDetails,
  setAudioDetails,
  playlists,
  getOwnPlaylists,
}) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(headCells[1].id);
  const [songInFocus, setSongInFocus] = useState(songs[0]);
  const [showSongActionsDialog, setShowSongActionsDialog] = useState(false);

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

  const handleExpandMore = (event, song) => {
    setSongInFocus(song);
    setShowSongActionsDialog(true);
  };

  const handleDialogClose = () => {
    setShowSongActionsDialog(false);
  };

  if (songs.length <= 0) {
    return null;
  }

  return (
    <React.Fragment>
      <SongActionsDialog
        song={songInFocus}
        open={showSongActionsDialog}
        audio={audio}
        audioDetails={audioDetails}
        setAudioDetails={setAudioDetails}
        handleClose={handleDialogClose}
        playlists={playlists}
        getOwnPlaylists={getOwnPlaylists}
      />
      <TableHead
        order={order}
        orderBy={orderBy}
        onRequestSort={onRequestSort}
      ></TableHead>
      <div className={styles["songs-table"]}>
        {songs.sort(getComparator(order, orderBy)).map((song, idx) => (
          <TableRow
            key={idx}
            song={song}
            idx={idx + 1}
            audio={audio}
            setAudio={setAudio}
            audioDetails={audioDetails}
            setAudioDetails={setAudioDetails}
            handleExpandMore={handleExpandMore}
          />
        ))}
      </div>
    </React.Fragment>
  );
}

SongsDatatable.propTypes = {
  songs: PropTypes.arrayOf(PropTypes.object).isRequired,
  audio: PropTypes.object.isRequired,
  audioDetails: PropTypes.object.isRequired,
  setAudioDetails: PropTypes.func.isRequired,
};

export default SongsDatatable;
