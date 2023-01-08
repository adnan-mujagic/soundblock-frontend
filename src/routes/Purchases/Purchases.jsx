import React, { useEffect, useState } from "react";
import fetchDataWithAuth from "../../utils/fetchDataWithAuth";
import typography from "../../utils/typography";
import DefaultAlert from "../../components/DefaultAlert/DefaultAlert";
import Loading from "../../components/Loading/Loading";
import ContentType from "../../components/ContentType/ContentType";
import EmptyContent from "../../components/EmptyContent/EmptyContent";
import dateToGreeting from "../../utils/dateToGreeting";
import SongsDatatable from "../../components/SongsDatatable";
import useAuthenticatedRoute from "../../hooks/useAuthenticatedRoute";
import styles from "./Purchases.module.scss";

function Purchases({
  audio,
  setAudio,
  audioDetails,
  setAudioDetails,
  token,
  setQueue,
  playlists,
  getOwnPlaylists,
}) {
  const [purchases, setPurchases] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState(null);

  useAuthenticatedRoute(token);

  useEffect(() => {
    async function getPurchases() {
      if (!token) {
        return;
      }
      setLoading(true);
      const response = await fetchDataWithAuth(
        "/users/songs/getPurchasedSongs",
        "GET"
      );
      if (response?.data) {
        setMessage(response.message);
        setSnackbarOpen(true);

        setPurchases(response.data.map((purchase) => purchase.song));
      } else {
        setMessage(response.message);
        setSnackbarOpen(true);
      }
      setLoading(false);
    }
    getPurchases();
  }, []);

  return (
    <div>
      <ContentType contentType={"Purchases"} />
      {message && (
        <DefaultAlert
          message={message}
          open={snackbarOpen}
          setOpen={setSnackbarOpen}
        />
      )}
      {loading ? (
        <Loading margin />
      ) : (
        <div
          style={{
            fontSize: typography.header,
            marginTop: "20px",
            marginBottom: "50px",
          }}
        >
          {`Good ${dateToGreeting()}${
            purchases?.length > 0 ? ", here are your purchased songs" : ""
          }`}
          {purchases && (
            <div
              style={{
                marginBottom: purchases.length === 0 ? "20px" : "0",
              }}
            >
              <SongsDatatable
                songs={purchases}
                audio={audio}
                setAudio={setAudio}
                audioDetails={audioDetails}
                setAudioDetails={setAudioDetails}
                playlists={playlists}
                getOwnPlaylists={getOwnPlaylists}
                setQueue={setQueue}
              />
            </div>
          )}
          {purchases?.length <= 0 && (
            <EmptyContent
              message="Looks like you don't have any purchases yet"
              isAnimated={true}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Purchases;
