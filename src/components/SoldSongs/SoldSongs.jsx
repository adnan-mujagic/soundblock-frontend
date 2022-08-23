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
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    getSoldSongs();
  }, [page]);

  const getSoldSongs = async () => {
    setLoading(true);
    const response = await fetchDataWithAuth(
      `/users/songs/getSoldSongs?page=${page}&limit=${limit}`,
      "GET"
    );
    if (response?.soldItems) {
      setSoldSongs(response);
    }
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  } else if (soldSongs.count === 0) {
    return null;
  }

  return (
    <div className={styles["sold-songs"]}>
      <div className={styles["sold-songs-title"]}>Top selling songs</div>
      <div className={styles["sold-songs-container"]}>
        {soldSongs?.soldItems?.map((soldItem) => (
          <SoldSong key={soldItem.song._id} soldItem={soldItem} />
        ))}
      </div>

      <Pagination
        totalItems={soldSongs.count}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
      />
    </div>
  );
}

export default SoldSongs;
