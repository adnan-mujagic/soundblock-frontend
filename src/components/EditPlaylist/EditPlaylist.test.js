import { fireEvent, render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import EditPlaylist from "./EditPlaylist";

it("Test edit playlist dialog", () => {
  const playlist = {
    name: "best songs",
  };
  const setOpen = jest.fn();

  const getOwnPlaylists = jest.fn();
  const getPlaylistInfo = jest.fn();
  const { getByTestId, queryByText, getByText } = render(
    <BrowserRouter>
      <EditPlaylist
        playlist={playlist}
        open={true}
        setOpen={setOpen}
        getOwnPlaylists={getOwnPlaylists}
        getPlaylistInfo={getPlaylistInfo}
      />
    </BrowserRouter>
  );

  // Change name
  const updateButton = getByText("Update");
  expect(updateButton).toBeDisabled();
  const playlistNameTextFieldInput = getByTestId(
    "playlist-name-text-field"
  ).querySelector("input");

  fireEvent.change(playlistNameTextFieldInput, {
    target: { value: "New playlist name" },
  });
  // Update button becomes enabled
  expect(updateButton).not.toBeDisabled();

  expect(getByTestId("delete-playlist-button")).toBeInTheDocument();

  const closeButton = queryByText("Close");
  expect(closeButton).toBeInTheDocument();

  // Close dialog
  expect(setOpen).not.toHaveBeenCalled();

  fireEvent.click(closeButton, { bubbles: true });

  expect(setOpen).toHaveBeenCalledWith(false);
});
