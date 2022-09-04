import React from "react";
import { render } from "@testing-library/react";
import CollapsableMenu from "./CollapsableMenu";
import { BrowserRouter } from "react-router-dom";

it("Test collapsable menu", () => {
  const playlists = [
    {
      _id: 0,
      name: "best songs",
    },
    {
      _id: 1,
      name: "great songs",
    },
    {
      _id: 2,
      name: "good songs",
    },
  ];
  const { getByTestId } = render(
    <BrowserRouter>
      <CollapsableMenu open={true} playlists={playlists} />
    </BrowserRouter>
  );

  expect(getByTestId("collapsable-menu")).toBeInTheDocument();
});
