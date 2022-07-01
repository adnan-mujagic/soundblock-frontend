import PropTypes from "prop-types";
import React, { useState } from "react";
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

const headCells = [
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
  {
    id: "actions",
    label: "",
    sortable: false,
  },
];

const tableCellStyles = {
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

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function TableHead({ order, orderBy, onRequestSort }) {
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

function TableRowOverlay({ isPlaying, handlePlay, handlePause }) {
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
        <IconButton>
          <MoreHorizIcon />
        </IconButton>
      </div>
    </div>
  );
}

function TableRow({ song, idx, audio, audioDetails, setAudioDetails }) {
  let ownSongLocation = song.songLocation;

  let { isPlaying, source } = audioDetails;

  const handlePlay = (event) => {
    audio.load();
    audio.src = ownSongLocation;
    audio.play();
    setAudioDetails({ isPlaying: true, source: ownSongLocation });
  };

  const handlePause = (event) => {
    audio.pause();
    setAudioDetails({ isPlaying: false, source: ownSongLocation });
  };

  return (
    <div className={styles["table-row"]}>
      <TableRowOverlay
        isPlaying={source === ownSongLocation && isPlaying}
        handlePlay={handlePlay}
        handlePause={handlePause}
      />
      <div style={{ ...tableCellStyles, flex: 0.1 }}>{idx}</div>
      <div style={{ ...tableCellStyles, flex: 1 }}>
        <div
          style={{
            height: "60px",
            aspectRatio: "1/1",
            backgroundImage: `url("${
              song.image
                ? song.image
                : "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
            }")`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            borderRadius: "4px",
          }}
        />
        <p className={styles["song-name"]}>{song.name}</p>
      </div>
      <div style={{ ...tableCellStyles, flex: 1 }}>
        {song.artist[0]?.username ||
          shortenString(song.artist[0].walletAddress, 20)}
      </div>
      <div style={{ ...tableCellStyles, flex: 1 }}></div>
    </div>
  );
}

function SongsDatatable({ songs, audio, audioDetails, setAudioDetails }) {
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
    <React.Fragment>
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
            audioDetails={audioDetails}
            setAudioDetails={setAudioDetails}
          />
        ))}
      </div>
    </React.Fragment>
  );
}

export default SongsDatatable;
