import React from "react";
import AccountHeader from "./AccountHeader";

import { render } from "@testing-library/react";

const TEST_ADDRESS = "VERY_LONG_TEST_ADDRESS_STRING";
const USERNAME = "hello_world";
const NUMBER_OF_SONGS = 3;

it("Test account header", () => {
  const { getByTestId } = render(
    <AccountHeader
      artistAddress={TEST_ADDRESS}
      username={USERNAME}
      numberOfSongs={NUMBER_OF_SONGS}
    />
  );

  expect(getByTestId("number-of-songs")).toHaveTextContent(
    "Number of songs: " + NUMBER_OF_SONGS
  );

  expect(getByTestId("account-address-bar")).toBeInTheDocument();
  expect(getByTestId("account-address-bar")).toHaveTextContent(
    "VERY_LONG_TEST_AD..."
  );
});

it("Test account without username", () => {
  const { getByTestId, queryByTestId } = render(
    <AccountHeader
      artistAddress={TEST_ADDRESS}
      numberOfSongs={NUMBER_OF_SONGS}
    />
  );

  expect(getByTestId("number-of-songs")).toHaveTextContent(
    "Number of songs: " + NUMBER_OF_SONGS
  );

  expect(queryByTestId("account-address-bar")).not.toBeInTheDocument();
});
