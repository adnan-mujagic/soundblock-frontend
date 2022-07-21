import React, { useEffect } from "react";
import { useState } from "react";
import ContentType from "../../components/ContentType/ContentType";
import DashboardShowcasePanel from "../../components/DashboardShowcasePanel";
import Sidebar from "../../components/Sidebar/Sidebar";
import fetchDataWithAuth from "../../utils/fetchDataWithAuth";
import styles from "./Dashboard.module.scss";

function Dashboard({ audio, audioDetails, setAudioDetails, token, setToken }) {
  const [purchasedSongs, setPurchasedSongs] = useState([]);
  const [songsToExplore, setSongsToExplore] = useState([]);

  useEffect(() => {
    getPurchasedSongs();
    getSongsToExplore();
  }, []);

  const getPurchasedSongs = async () => {
    const response = await fetchDataWithAuth(
      "/users/songs/getPurchasedSongs?limit=5"
    );
    if (response?.data) {
      setPurchasedSongs(response.data.map((purchase) => purchase.song));
    }
  };

  const getSongsToExplore = async () => {
    const response = await fetchDataWithAuth(
      "/songs/getSongsToExplore?limit=5"
    );
    if (response?.data) {
      setSongsToExplore(response.data);
    }
  };

  return (
    <div className={styles.dashboard}>
      <Sidebar audioDetails={audioDetails} />
      <div className={styles["dashboard-wrapper"]}>
        <ContentType contentType={"Dashboard"} />
        {purchasedSongs.length > 0 && (
          <DashboardShowcasePanel
            title={"Your purchased songs..."}
            songs={purchasedSongs}
            moreInfoLink={"/purchases"}
            audio={audio}
            audioDetails={audioDetails}
            setAudioDetails={setAudioDetails}
          />
        )}
        {songsToExplore.length > 0 ? (
          <DashboardShowcasePanel
            title={"Explore new songs..."}
            songs={songsToExplore}
            moreInfoLink={"/explore"}
            audio={audio}
            audioDetails={audioDetails}
            setAudioDetails={setAudioDetails}
          />
        ) : (
          <div>It's quiet for now!</div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
