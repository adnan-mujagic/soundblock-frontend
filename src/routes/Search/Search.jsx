import React, { useState } from "react";
import CustomSearchBox from "../../components/CustomSearchBox";
import EmptyContent from "../../components/EmptyContent/EmptyContent";
import Pagination from "../../components/Pagination";
import SongCard from "../../components/SongCard";
import useAuthenticatedRoute from "../../hooks/useAuthenticatedRoute";
import typography from "../../utils/typography";
import styles from "./Search.module.scss";

function Search({
  token,
  audio,
  setAudio,
  audioDetails,
  setAudioDetails,
  setQueue,
}) {
  const [songs, setSongs] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useAuthenticatedRoute(token);

  return (
    <div>
      <div style={{ fontSize: typography.header }}>
        Find your favorite songs
      </div>
      <CustomSearchBox
        setData={setSongs}
        setTotal={setTotal}
        page={page}
        setPage={setPage}
        limit={limit}
      />
      {songs && songs.length ? (
        <React.Fragment>
          <div className={styles["song-container"]}>
            {songs.map((song) => (
              <SongCard
                key={song._id}
                audio={audio}
                setAudio={setAudio}
                audioDetails={audioDetails}
                setAudioDetails={setAudioDetails}
                song={song}
                canBuy={!song.isPurchased}
                showViewArtist={true}
                setQueue={setQueue}
              />
            ))}
          </div>
          <Pagination
            totalItems={total}
            page={page}
            setPage={setPage}
            limit={limit}
          />
        </React.Fragment>
      ) : (
        <EmptyContent
          message="Your search results will appear here..."
          isAnimated
        />
      )}
    </div>
  );
}

export default Search;
