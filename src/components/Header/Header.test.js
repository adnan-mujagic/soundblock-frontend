import { render } from "@testing-library/react";
import Header from "./Header";
import { BrowserRouter } from "react-router-dom";

const setup = (loggedIn = false) => {
  const token = loggedIn ? "some-jwt-token" : null;
  const setToken = jest.fn();
  const playlists = [
    {
      _id: "0",
      name: "best songs",
    },
  ];
  const utils = render(
    <BrowserRouter>
      <Header token={token} setToken={setToken} playlists={playlists} />
    </BrowserRouter>
  );

  const header = utils.getByTestId("header");

  return { ...utils, header };
};

it("Test header when not logged in", () => {
  const { getByTestId, queryByTestId } = setup();

  expect(getByTestId("header-wallet-icon")).toBeInTheDocument();
  expect(queryByTestId("header-logout-icon")).not.toBeInTheDocument();
  expect(queryByTestId("collapsable-menu")).not.toBeInTheDocument();
});

it("Test header when logged in", () => {
  const { getByTestId, queryByTestId } = setup(true);

  expect(getByTestId("header-logout-icon")).toBeInTheDocument();
  expect(getByTestId("collapsable-menu")).toBeInTheDocument();
  expect(queryByTestId("header-wallet-icon")).not.toBeInTheDocument();
});
