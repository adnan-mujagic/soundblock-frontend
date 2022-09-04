import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import DashboardShowcasePanel from "./DashboardShowcasePanel";

it("Test dashboard showcase panel", () => {
  const songs = [
    {
      _id: "631136e05c5d46bb65fdb34f",
      price: 0.00321,
      name: "Faded",
      image:
        "https://lastfm.freetls.fastly.net/i/u/770x0/20e3bed17bed5ffc14e1024f4d009f9e.jpg",
      category: "House",
      artistAddress: "0xfFC3Ba11F5269835C939Fb54A31f458C3F9a900c",
      uploadStatus: "SUCCESSFUL",
      __v: 0,
      transactionLink:
        "https://rinkeby.etherscan.io/tx/0xee02ab2e41be3748681c46627af61a840258b9309a11ebe4237091ac2a207448",
      isPurchased: false,
      songLocation:
        "https://aldin-sxr.dev/ipfs/Qma8BdskQu2hGbkn5KPzqzB92P3LJ9ncJqASvNPFJRsoZq",
      artist: [
        {
          _id: "62d9aec8be5942acbf89bc6e",
          role: "NORMAL",
          walletAddress: "0xfFC3Ba11F5269835C939Fb54A31f458C3F9a900c",
          __v: 0,
          email: "adnanmujagic@outlook.com",
          username: "hello_world",
          image:
            "https://img.freepik.com/premium-photo/astronaut-outer-open-space-planet-earth-stars-provide-background-erforming-space-planet-earth-sunrise-sunset-our-home-iss-elements-this-image-furnished-by-nasa_150455-16829.jpg?w=2000",
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
