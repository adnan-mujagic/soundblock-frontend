import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AccountHeader from "../../components/AccountHeader";
import AudioOptionsController from "../../components/AudioOptionsController";
import Header from "../../components/Header";
import Loading from "../../components/Loading/Loading";
import Pagination from "../../components/Pagination";
import Sidebar from "../../components/Sidebar/Sidebar";
import SongCard from "../../components/SongCard";
import useAuthenticatedRoute from "../../hooks/useAuthenticatedRoute";
import fetchDataWithAuth from "../../utils/fetchDataWithAuth";
import typography from "../../utils/typography";
import styles from "./Artist.module.scss";

function Artist({
  token,
  setToken,
  audio,
  setAudio,
  audioDetails,
  setAudioDetails,
  queue,
  setQueue,
  playlists,
  previous,
  next,
  randomNext,
}) {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [artistSongs, setArtistSongs] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);

  useAuthenticatedRoute(token);

  useEffect(() => {
    getArtist();
  }, []);

  useEffect(() => {
    getArtistSongs();
  }, [page, limit]);

  const getArtist = async () => {
    if (!token) {
      return;
    }
    const { data } = await fetchDataWithAuth("/users/" + id, "GET");
    setArtist(data);
  };

  const getArtistSongs = async () => {
    if (!token) {
      return;
    }
    const { data, count } = await fetchDataWithAuth(
      `/songs/getByArtist?artistId=${id}&page=${page}&limit=${limit}`,
      "GET"
    );
    setArtistSongs(data);
    setTotal(count);
  };

  return (
    <div className={styles["artist"]}>
      <Header
        token={token}
        setToken={setToken}
        playlists={playlists}
        audio={audio}
      />
      <div className={styles["artist-content"]}>
        <Sidebar audioDetails={audioDetails} playlists={playlists} />
        <div className={styles["artist-main-content"]}>
          {artist ? (
            <AccountHeader
              username={artist.username}
              artistAddress={artist.walletAddress}
              numberOfSongs={total}
              imageUrl={artist.image}
            />
          ) : (
            <Loading />
          )}
          {!!artist && (
            <div style={{ fontSize: typography.header, marginBottom: "24px" }}>
              {!!artist.username ? artist.username : artist.walletAddress}'s
              discography
            </div>
          )}
          {artistSongs && (
            <React.Fragment>
              <div className={styles["artist-discography"]}>
                {artistSongs
                  .map((song) => {
                    return { ...song, artist: [artist] };
                  })
                  .map((expandedSong) => (
                    <SongCard
                      setQueue={setQueue}
                      key={expandedSong._id}
                      audio={audio}
                      setAudio={setAudio}
                      song={expandedSong}
                      audioDetails={audioDetails}
                      setAudioDetails={setAudioDetails}
                      canBuy={false}
                      showViewArtist={false}
                    />
                  ))}
              </div>
              <Pagination
                totalItems={total}
                page={page}
                setPage={setPage}
                limit={limit}
                setLimit={setLimit}
              />
            </React.Fragment>
          )}
        </div>
      </div>
      <AudioOptionsController
        queue={queue}
        setQueue={setQueue}
        audio={audio}
        setAudioDetails={setAudioDetails}
        audioDetails={audioDetails}
        previous={previous}
        next={next}
        randomNext={randomNext}
      />
    </div>
  );
}

export default Artist;
