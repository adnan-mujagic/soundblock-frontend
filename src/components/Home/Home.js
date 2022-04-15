import React from "react";

import Header from "../Header/Header";
import "./Home.css";

function Home({ token, setToken }) {
  return (
    <div>
      <Header token={token} setToken={setToken} />
    </div>
  );
}

export default Home;
