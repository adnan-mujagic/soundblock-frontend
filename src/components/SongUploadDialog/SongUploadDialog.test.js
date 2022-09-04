import { fireEvent, render, waitFor } from "@testing-library/react";
import SongUploadDialog from "./SongUploadDialog";
import user from "@testing-library/user-event";

it("Test song upload dialog", async () => {
  const setOpen = jest.fn();
  const updateUserSongs = jest.fn();

  const userId = "0";

  const { getByText, getByTestId } = render(
    <SongUploadDialog
      open={true}
      setOpen={setOpen}
      updateUserSongs={updateUserSongs}
      userId={userId}
    />
  );
  // expect upload button disabled
  expect(getByText("Upload")).toBeDisabled();
  // set name
  const nameInput = getByTestId("song-name").querySelector("input");
  fireEvent.change(nameInput, { target: { value: "Faded" } });
  // set image

  const imageInput = getByTestId("song-image").querySelector("input");
  fireEvent.change(imageInput, { target: { value: "some_image.jpg" } });
  // set price

  const priceInput = getByTestId("song-price").querySelector("input");
  fireEvent.change(priceInput, { target: { value: 0.003 } });
  // set category
  const categoryDropdown = getByText("Select category");

  fireEvent.click(categoryDropdown, { bubbles: true });
  fireEvent.click(getByText("House"), { bubbles: true });
  // add file

  const fileUploadInput = getByTestId("file-upload").querySelector("input");

  user.upload(
    fileUploadInput,
    new File(["foo"], "faded.mp3", { type: "audio/mpeg" })
  );

  // expect upload button enabled
  await waitFor(() => {
    expect(getByText("Upload")).not.toBeDisabled();
  });
});
