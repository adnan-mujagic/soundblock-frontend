import React, { useEffect, useState } from "react";
import fetchDataWithAuth from "../../utils/fetchDataWithAuth";
import Loading from "../Loading/Loading";
import Pagination from "../Pagination";
import SoldSong from "../SoldSong/SoldSong";
import styles from "./SoldSongs.module.scss";

function SoldSongs() {
  const [soldSongs, setSoldSongs] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getSoldSongs();
  }, []);

  const getSoldSongs = async () => {
    setLoading(true);
    const response = await fetchDataWithAuth(
      `/users/songs/getSoldSongs?page=${page}&limit=5`,
      "GET"
    );
    if (response?.soldItems) {
      setSoldSongs(response);
    }
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles["sold-songs"]}>
      <div className={styles["sold-songs-title"]}>Top selling songs</div>
      <div className={styles["sold-songs-container"]}>
        {soldSongs?.soldItems?.map((soldItem) => (
          <SoldSong soldItem={soldItem} />
        ))}
      </div>

      <Pagination totalItems={soldSongs.count} page={page} setPage={setPage} />
    </div>
  );
}

export default SoldSongs;
