import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import DashboardShowcasePanel from "./DashboardShowcasePanel";

it("Test dashboard showcase panel", () => {
  const songs = [
    {
      _id: "0",
      price: 0.00321,
      name: "Faded",
      category: "House",
      artistAddress: "0xfFC3Ba11F5269835C939Fb54A31f458C3F9a900c",
      uploadStatus: "SUCCESSFUL",
      isPurchased: false,
      songLocation:
        "https://aldin-sxr.dev/ipfs/Qma8BdskQu2hGbkn5KPzqzB92P3LJ9ncJqASvNPFJRsoZq",
      artist: [
        {
          _id: "1",
          role: "NORMAL",
          walletAddress: "0xfFC3Ba11F5269835C939Fb54A31f458C3F9a900c",
          email: "adnanmujagic@outlook.com",
          username: "hello_world",
        },
      ],
    },
  ];

  const audio = new Audio(songs[0].songLocation);
  const moreInfoLink = "https://soundblock-frontend.vercel.app/explore";
  const setAudio = jest.fn();
  const audioDetails = {
    isPlaying: false,
    source: songs[0].songLocation,
  };

  const { getByTestId } = render(
    <BrowserRouter>
      <DashboardShowcasePanel
        title="Explore"
        songs={songs}
        moreInfoLink={moreInfoLink}
        audio={audio}
        setAudio={setAudio}
        audioDetails={audioDetails}
      />
    </BrowserRouter>
  );

  expect(getByTestId("dashboard-showcase-panel-title")).toHaveTextContent(
    "Explore"
  );

  expect(getByTestId("dashboard-song-container")).toHaveTextContent(
    songs[0].name
  );
});
