import React from "react";
import Main from "../Main/Main";
import "./Home.css";
import Header from "../Header/Header";
function Home({ token, setToken }) {
  return (
    <div className="home">
      <Header token={token} setToken={setToken} />
      {token === null ? <div>Explanation of the website</div> : <Main />}
    </div>
  );
}

export default Home;
