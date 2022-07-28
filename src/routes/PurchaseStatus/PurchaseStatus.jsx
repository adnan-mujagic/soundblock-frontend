import React, { useEffect, useState } from "react";
import ContentType from "../../components/ContentType/ContentType";
import DefaultAlert from "../../components/DefaultAlert/DefaultAlert";
import Header from "../../components/Header";
import Loading from "../../components/Loading/Loading";
import Pagination from "../../components/Pagination";
import PurchaseStatusCard from "../../components/PurchaseStatusCard";
import Sidebar from "../../components/Sidebar/Sidebar";
import fetchDataWithAuth from "../../utils/fetchDataWithAuth";
import styles from "./PurchaseStatus.module.scss";

function PurchaseStatus({
  queue,
  setQueue,
  audio,
  audioDetails,
  setAudioDetails,
  token,
  setToken,
}) {
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [purchases, setPurchases] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    getUserPurchases();
  }, [page]);

  const getUserPurchases = async () => {
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

  return (
    <div>
      <Header token={token} setToken={setToken} />
      <div className={styles["purchase-status-container"]}>
        <DefaultAlert
          message={alertMessage}
          open={alertOpen}
          setOpen={setAlertOpen}
        />
        <Sidebar audioDetails={audioDetails} />
        <div className={styles["purchase-status-content"]}>
          <ContentType contentType={"Purchase Status"} />
          {loading ? (
            <Loading />
          ) : (
            <React.Fragment>
              <div className={styles["purchase-status-grid"]}>
                {purchases?.data?.map((item) => (
                  <PurchaseStatusCard key={item._id} purchase={item} />
                ))}
              </div>
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
    </div>
  );
}

export default PurchaseStatus;
