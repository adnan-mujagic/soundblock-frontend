import React from "react";
import IntroPanel from "../IntroPanel";
import DashImage from "./../../images/dashboard.PNG";
import AddToPlaylistImage from "./../../images/add_to_playlist.PNG";
import ExploreImage from "./../../images/explore.PNG";
import UploadImage from "./../../images/upload.PNG";
import MetamaskIntegrationImage from "./../../images/metamask_integration.PNG";
import Footer from "../Footer";

function WebsiteIntro() {
  return (
    <div>
      <IntroPanel
        imageUrl={DashImage}
        title="Sound of the chains"
        text="Listen, upload, buy or sell music served on the IPFS."
      />
      <IntroPanel
        imageUrl={MetamaskIntegrationImage}
        title="Metamask integration"
        text="Connect your metamask wallet by pressing the wallet icon in the top right corner."
        imagePosition="left"
        moreDetailsLink={"https://metamask.io/"}
      />

      <IntroPanel
        imageUrl={ExploreImage}
        title="Explore"
        text="Easily explore new songs to fall in love with, and buy them to support the artist."
      />
      <IntroPanel
        imageUrl={AddToPlaylistImage}
        title="Playlists"
        imagePosition="left"
        text="Once you have purchased the songs, you can add them to your playlists in just a few clicks."
      />
      <IntroPanel
        imageUrl={UploadImage}
        title="Upload your work"
        text="Have a new song? Upload it, set the price, and let us handle the rest! You will receive 50% of the song's sales directly to your Metamask wallet."
      />
      <Footer />
    </div>
  );
}

export default WebsiteIntro;
