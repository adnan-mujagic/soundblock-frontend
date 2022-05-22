import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import SessionStorage from "../../utils/SessionStorage";
import Home from "../Home";
import Purchases from "../Purchases/Purchases";
import styles from "./App.module.scss";

function App() {
  const [token, setToken] = useState(SessionStorage.getToken());
  return (
    <div className={styles["app"]}>
      <Routes>
        <Route
          path="/"
          element={<Home token={token} setToken={setToken} />}
        ></Route>
        <Route
          path="/purchases"
          element={<Purchases token={token} setToken={setToken} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
