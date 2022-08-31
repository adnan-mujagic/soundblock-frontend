import React, { useState } from "react";
import AudioOptionsController from "../../components/AudioOptionsController";
import CustomSearchBox from "../../components/CustomSearchBox";
import EmptyContent from "../../components/EmptyContent/EmptyContent";
import Header from "../../components/Header";
import Pagination from "../../components/Pagination";
import Sidebar from "../../components/Sidebar/Sidebar";
import SongCard from "../../components/SongCard";
import typography from "../../utils/typography";
import styles from "./Search.module.scss";

function Search({
  token,
  setToken,
  audio,
  setAudio,
  audioDetails,
  setAudioDetails,
  playlists,
}) {
  const [songs, setSongs] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  return (
    <div>
      <Header token={token} setToken={setToken} />
      <div className={styles["search-container"]}>
        <Sidebar audioDetails={audioDetails} playlists={playlists} />
        <div className={styles["main-content"]}>
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
      </div>
      <AudioOptionsController
        audio={audio}
        setAudioDetails={setAudioDetails}
        audioDetails={audioDetails}
      />
    </div>
  );
}

export default Search;
