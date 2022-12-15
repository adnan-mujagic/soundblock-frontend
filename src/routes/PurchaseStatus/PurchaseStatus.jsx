import React, { useEffect, useState } from "react";
import AdaptedDataTable, {
  getColumnsWithImage,
} from "../../components/AdaptedDataTable/AdaptedDataTable";
import AnchorButton from "../../components/AnchorButton/AnchorButton";
import AudioOptionsController from "../../components/AudioOptionsController";
import Badge from "../../components/Badge";
import ContentType from "../../components/ContentType/ContentType";
import DefaultAlert from "../../components/DefaultAlert/DefaultAlert";
import Header from "../../components/Header";
import Loading from "../../components/Loading/Loading";
import Pagination from "../../components/Pagination";
import Sidebar from "../../components/Sidebar/Sidebar";
import useAuthenticatedRoute from "../../hooks/useAuthenticatedRoute";
import colors from "../../utils/colors";
import { defaultSongImage } from "../../utils/defaultImage";
import fetchDataWithAuth from "../../utils/fetchDataWithAuth";
import styles from "./PurchaseStatus.module.scss";

function PurchaseStatus({
  audio,
  audioDetails,
  setAudioDetails,
  token,
  setToken,
  playlists,
  previous,
  next,
  randomNext,
}) {
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [purchases, setPurchases] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  useAuthenticatedRoute(token);

  useEffect(() => {
    getUserPurchases();
  }, [page]);

  const getUserPurchases = async () => {
    if (!token) {
      return;
    }
    setLoading(true);
    const response = await fetchDataWithAuth(
      `/users/songs/getPurchasedSongs?page=${page}&limit=${limit}`,
      "GET"
    );
    if (response?.data && response?.count) {
      setPurchases({
        data: response.data,
        count: response.count,
      });
    }
    setLoading(false);
    setAlertMessage(response.message);
    setAlertOpen(true);
  };

  const data = purchases?.data?.map((item) => ({
    id: item.song._id,
    name: item.song.name,
    price: item.song.price,
    status: item.status,
    image: item.song.image ?? defaultSongImage,
    ownerTransactionLink: item.ownerTransactionLink,
    purchaseTransactionLink: item.purchaseTransactionLink,
  }));

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => {
        return (
          <Badge
            title={row.status}
            backgroundColor={
              row.status === "SUCCESSFUL" ? colors.green : colors.error
            }
          />
        );
      },
      sortable: true,
    },
    {
      name: "Owner transaction link",
      cell: (row) => {
        return <AnchorButton text={""} link={row.ownerTransactionLink} />;
      },
    },
    {
      name: "Purchase transaction link",
      cell: (row) => {
        return <AnchorButton text={""} link={row.purchaseTransactionLink} />;
      },
    },
  ];

  console.log(data);

  return (
    <div>
      <Header
        token={token}
        setToken={setToken}
        playlists={playlists}
        audio={audio}
      />
      <div className={styles["purchase-status-container"]}>
        <DefaultAlert
          message={alertMessage}
          open={alertOpen}
          setOpen={setAlertOpen}
        />
        <Sidebar audioDetails={audioDetails} playlists={playlists} />
        <div className={styles["purchase-status-content"]}>
          <ContentType contentType={"Purchase Status"} />
          {loading ? (
            <Loading />
          ) : (
            <React.Fragment>
              <AdaptedDataTable
                data={data}
                columns={getColumnsWithImage("image", columns)}
              />
              {purchases && (
                <Pagination
                  totalItems={purchases.count}
                  page={page}
                  setPage={setPage}
                  limit={limit}
                />
              )}
            </React.Fragment>
          )}
        </div>
      </div>
      <AudioOptionsController
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

export default PurchaseStatus;
