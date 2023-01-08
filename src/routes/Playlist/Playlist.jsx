import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import PlaylistHeader from "../../components/PlaylistHeader";
import PlaylistsDatatable from "../../components/PlaylistsDatatable";
import useAuthenticatedRoute from "../../hooks/useAuthenticatedRoute";
import fetchDataWithAuth from "../../utils/fetchDataWithAuth";
import styles from "./Playlist.module.scss";

function Playlist({
  generateQueue,
  audio,
  setAudio,
  audioDetails,
  setAudioDetails,
  token,
  getOwnPlaylists,
}) {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);

  useAuthenticatedRoute(token);

  useEffect(() => {
    getPlaylistInfo();
  }, [id]);

  const getPlaylistInfo = async () => {
    if (!token) {
      return;
    }
    const response = await fetchDataWithAuth("/playlists/" + id, "GET");
    if (response?.data) {
      setPlaylist(response.data);
    }
  };

  return (
    <div>
      {playlist && (
        <PlaylistHeader
          getOwnPlaylists={getOwnPlaylists}
          getPlaylistInfo={getPlaylistInfo}
          playlist={playlist}
        />
      )}
      {playlist ? (
        <PlaylistsDatatable
          generateQueue={generateQueue}
          songs={playlist.songs}
          audio={audio}
          setAudio={setAudio}
          audioDetails={audioDetails}
          setAudioDetails={setAudioDetails}
          playlistId={playlist._id}
          refreshSongs={getPlaylistInfo}
          getOwnPlaylists={getOwnPlaylists}
        />
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Playlist;
