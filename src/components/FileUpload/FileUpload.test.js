import { render, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import FileUpload from "./FileUpload";

const setup = () => {
  const file = null;
  const setFile = jest.fn();

  const utils = render(<FileUpload file={file} setFile={setFile} />);

  const fileUploadInput = utils
    .getByTestId("file-upload")
    .querySelector("input");
  return { ...utils, file, setFile, fileUploadInput };
};

it("Test file upload", async () => {
  const { setFile, fileUploadInput } = setup();

  const fileToUpload = new File(["foo"], "foo.mp3", { type: "audio/mpeg" });

  user.upload(fileUploadInput, fileToUpload);
  await waitFor(() => {
    expect(setFile).toHaveBeenCalledWith(fileToUpload);
  });
});

it("Test bad file type", async () => {
  const { fileUploadInput, getByTestId } = setup();

  const fileToUpload = new File(["foo"], "foo.txt", { type: "text/plain" });

  user.upload(fileUploadInput, fileToUpload);

  await waitFor(() => {
    const alert = getByTestId("default-alert");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent(/wrong file type/i);
  });
});
