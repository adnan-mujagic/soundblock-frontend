import React, { useEffect, useState } from "react";
import AudioOptionsController from "../../components/AudioOptionsController/AudioOptionsController";
import ContentType from "../../components/ContentType/ContentType";
import DefaultAlert from "../../components/DefaultAlert/DefaultAlert";
import EmptyContent from "../../components/EmptyContent/EmptyContent";
import Header from "../../components/Header";
import Loading from "../../components/Loading/Loading";
import Sidebar from "../../components/Sidebar/Sidebar";
import SongCard from "../../components/SongCard";
import useAuthenticatedRoute from "../../hooks/useAuthenticatedRoute";
import dateToGreeting from "../../utils/dateToGreeting";
import fetchDataWithAuth from "../../utils/fetchDataWithAuth";
import typography from "../../utils/typography";
import styles from "./Explore.module.scss";

function Explore({
  audio,
  setAudio,
  audioDetails,
  setAudioDetails,
  token,
  setToken,
  queue,
  setQueue,
  playlists,
  previous,
  next,
  randomNext,
}) {
  const [songsToExplore, setSongsToExplore] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  useAuthenticatedRoute(token);

  useEffect(() => {
    async function getSongsToExplore() {
      if (!token) {
        return;
      }
      setLoading(true);
      const response = await fetchDataWithAuth(
        "/songs/getSongsToExplore",
        "GET"
      );
      if (response?.data) {
        setSongsToExplore(response.data);
      }
      setLoading(false);
      setMessage(response.message);
      setAlertOpen(true);
    }
    getSongsToExplore();
  }, []);

  return (
    <div className={styles.explore}>
      {message && (
        <DefaultAlert
          message={message}
          open={alertOpen}
          setOpen={setAlertOpen}
        />
      )}

      <ContentType contentType={"Explore"} />
      <div style={{ fontSize: typography.header, marginTop: "20px" }}>
        {`Good ${dateToGreeting()}, here are some new songs to explore...`}
        <div
          className={
            songsToExplore?.length > 0
              ? styles["explore-container"]
              : styles["explore-container-empty"]
          }
        >
          {songsToExplore && !loading ? (
            songsToExplore.map((song, index) => {
              return (
                <SongCard
                  setQueue={setQueue}
                  audio={audio}
                  setAudio={setAudio}
                  audioDetails={audioDetails}
                  setAudioDetails={setAudioDetails}
                  key={index}
                  song={song}
                  canBuy={!!song?.price}
                />
              );
            })
          ) : (
            <Loading />
          )}
        </div>
        {!loading && songsToExplore?.length <= 0 && (
          <EmptyContent
            message="Looks like there is nothing to explore currently..."
            isAnimated={true}
          />
        )}
      </div>
    </div>
  );
}

export default Explore;
