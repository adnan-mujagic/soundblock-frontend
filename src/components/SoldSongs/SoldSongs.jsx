import React, { useEffect, useState } from "react";
import { defaultSongImage } from "../../utils/defaultImage";
import fetchDataWithAuth from "../../utils/fetchDataWithAuth";
import AdaptedDataTable, {
  getColumnsWithImage,
} from "../AdaptedDataTable/AdaptedDataTable";
import Loading from "../Loading/Loading";
import Pagination from "../Pagination";
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

  const columns = [
    {
      name: "Number of sales",
      selector: (row) => row.numberOfSales,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Earnings",
      selector: (row) => row.earnings,
      sortable: true,
    },
  ];

  const data = soldSongs?.soldItems?.map(({ count, song, totalEarned }) => ({
    id: song._id,
    numberOfSales: count,
    name: song.name,
    image: song.image ?? defaultSongImage,
    earnings: totalEarned,
  }));

  return (
    <div className={styles["sold-songs"]}>
      <AdaptedDataTable
        title="Top-selling songs"
        columns={getColumnsWithImage("image", columns)}
        data={data}
      />
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
