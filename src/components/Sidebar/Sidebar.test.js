import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./Sidebar";

it("Test sidebar", () => {
  const playlists = [
    { _id: "0", name: "best songs" },
    { _id: "1", name: "popular now" },
    { _id: "2", name: "old" },
  ];

  const audioDetails = { source: "some_source" };

  const { getByText } = render(
    <BrowserRouter>
      <Sidebar audioDetails={audioDetails} playlists={playlists} />
    </BrowserRouter>
  );

  [
    "Search",
    "Home",
    "Explore",
    "Your Purchases",
    "Account",
    "Purchase Status",
  ].map((item) => expect(getByText(item)).toBeInTheDocument());

  playlists.map((playlist) =>
    expect(getByText(playlist.name)).toBeInTheDocument()
  );
});
