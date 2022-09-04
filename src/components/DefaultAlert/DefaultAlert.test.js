import { fireEvent, render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import DefaultAlert from "./DefaultAlert";

beforeEach(() => {
  jest.useFakeTimers();
});

it("Test alert closes automatically after some time", () => {
  const setOpen = jest.fn();
  const { getByTestId } = render(
    <DefaultAlert open={true} message="Hello world!" setOpen={setOpen} />
  );

  expect(getByTestId("default-alert")).toBeInTheDocument();

  expect(setOpen).not.toHaveBeenCalled();

  act(() => {
    jest.advanceTimersByTime(4000);
  });

  expect(setOpen).toHaveBeenCalledWith(false);
});

it("Test alert closes when close is clicked", () => {
  const setOpen = jest.fn();
  const { getByTestId } = render(
    <DefaultAlert open={true} message="Hello world!" setOpen={setOpen} />
  );

  expect(getByTestId("default-alert")).toBeInTheDocument();

  expect(setOpen).not.toHaveBeenCalled();

  const closeButton = getByTestId("default-alert-action");

  expect(closeButton).toBeInTheDocument();

  fireEvent.click(closeButton, { bubbles: true });

  expect(setOpen).toHaveBeenCalledWith(false);
});
