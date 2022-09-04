import { fireEvent, render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import EditProfileDialog from "./EditProfileDialog";

beforeEach(() => {
  jest.useFakeTimers();
});

it("Test edit profile", async () => {
  const setOpen = jest.fn();
  const getUser = jest.fn();
  const current = {
    username: "adnanmujagic",
    email: "adnanmujagic@gmail.com",
    image: "my_profile_picture.jpg",
  };
  const { getByTestId, getByText } = render(
    <EditProfileDialog
      open={true}
      setOpen={setOpen}
      getUser={getUser}
      currentEmail={current.email}
      currentUsername={current.username}
      currentImage={current.image}
    />
  );

  const mockResponse = {
    message: "Data updated successfully",
  };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockResponse),
    })
  );

  // Modify username to make update button enabled
  const usernameInput = getByTestId("username-text-field").querySelector(
    "input"
  );
  expect(usernameInput.value).toBe(current.username);
  const updateButton = getByText("Update");
  expect(updateButton).toBeDisabled();
  fireEvent.change(usernameInput, { target: { value: "john_doe" } });
  expect(usernameInput.value).toBe("john_doe");
  expect(updateButton).not.toBeDisabled();

  // Update user

  await act(async () => {
    fireEvent.click(updateButton, { bubbles: true });
  });
  expect(getUser).toHaveBeenCalled();
  expect(setOpen).toHaveBeenCalledWith(false);
});
