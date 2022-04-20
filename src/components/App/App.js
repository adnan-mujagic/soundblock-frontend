import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import SessionStorage from "../../utils/SessionStorage";
import Home from "../Home/Home";
import "./App.css";

function App() {
  const [token, setToken] = useState(SessionStorage.getToken());
  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={<Home token={token} setToken={setToken} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
