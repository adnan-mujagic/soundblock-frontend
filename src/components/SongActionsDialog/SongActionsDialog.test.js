import { fireEvent, render, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SongActionsDialog from "./SongActionsDialog";

it("Test song actions dialog", async () => {
  const fakeResponse = {
    message: "Data sent successfully",
  };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeResponse),
    })
  );

  const handleClose = jest.fn();
  const getOwnPlaylists = jest.fn();

  const song = {
    _id: "0",
    name: "Faded",
    artist: [{ image: "some_image.jpg", username: "john_doe" }],
    price: 0.003,
  };

  const playlists = [
    {
      _id: "0",
      name: "best songs",
    },
  ];

  const { getByText, queryByText } = render(
    <BrowserRouter>
      <SongActionsDialog
        open={true}
        song={song}
        handleClose={handleClose}
        playlists={playlists}
        getOwnPlaylists={getOwnPlaylists}
      />
    </BrowserRouter>
  );

  fireEvent.click(getByText(/add to playlist/i), { bubbles: true });

  const bestSongsPlaylistButton = queryByText(playlists[0].name);

  expect(bestSongsPlaylistButton).toBeInTheDocument();

  const addToNewPlaylistButton = queryByText(/add to a new playlist/i);

  expect(addToNewPlaylistButton).toBeInTheDocument();

  fireEvent.click(addToNewPlaylistButton, { bubbles: true });

  await waitFor(() => {
    expect(getOwnPlaylists).toBeCalledTimes(1);
  });
});
