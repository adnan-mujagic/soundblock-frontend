import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AudioOptionsController from "../../components/AudioOptionsController";
import Header from "../../components/Header";
import Loading from "../../components/Loading/Loading";
import PlaylistHeader from "../../components/PlaylistHeader";
import PlaylistsDatatable from "../../components/PlaylistsDatatable";
import Sidebar from "../../components/Sidebar/Sidebar";
import fetchDataWithAuth from "../../utils/fetchDataWithAuth";
import styles from "./Playlist.module.scss";

function Playlist({
  audio,
  audioDetails,
  setAudioDetails,
  token,
  setToken,
  queue,
  setQueue,
}) {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    getPlaylistInfo();
  }, [id]);

  const getPlaylistInfo = async () => {
    const response = await fetchDataWithAuth("/playlists/" + id, "GET");
    if (response?.data) {
      setPlaylist(response.data);
    }
  };

  return (
    <div>
      <Header token={token} setToken={setToken} />
      <div className={styles["playlist-route-container"]}>
        <Sidebar audioDetails={audioDetails} />
        <div className={styles["playlist-content"]}>
          {playlist && <PlaylistHeader playlist={playlist} />}
          {playlist ? (
            <PlaylistsDatatable
              setQueue={setQueue}
              songs={playlist.songs}
              audio={audio}
              audioDetails={audioDetails}
              setAudioDetails={setAudioDetails}
              playlistId={playlist._id}
              refreshSongs={getPlaylistInfo}
            />
          ) : (
            <Loading />
          )}
        </div>
      </div>
      <AudioOptionsController
        queue={queue}
        setQueue={setQueue}
        audio={audio}
        audioDetails={audioDetails}
        setAudioDetails={setAudioDetails}
      />
    </div>
  );
}

export default Playlist;
