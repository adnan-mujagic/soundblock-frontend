import { fireEvent, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PlaylistHeader from "./PlaylistHeader";

const playlist = {
  _id: "0",
  name: "best songs",
  songs: [
    {
      image: "song_image_1.jpg",
    },
    {
      image: "song_image_2.jpg",
    },
  ],
  owner: {
    walletAddress: "walletAddress123",
    username: "john_doe",
  },
};

it("Test playlist header", () => {
  const getOwnPlaylists = jest.fn();
  const getPlaylistInfo = jest.fn();

  const { getByTestId, queryByTestId, queryByText } = render(
    <BrowserRouter>
      <PlaylistHeader
        playlist={playlist}
        getOwnPlaylists={getOwnPlaylists}
        getPlaylistInfo={getPlaylistInfo}
      />
    </BrowserRouter>
  );

  expect(queryByTestId("edit-playlist")).not.toBeInTheDocument();
  expect(getByTestId("playlist-header-title")).toHaveTextContent(/best songs/i);

  fireEvent.click(queryByText("Edit Playlist"), { bubbles: true });

  expect(queryByTestId("edit-playlist")).toBeInTheDocument();
});
