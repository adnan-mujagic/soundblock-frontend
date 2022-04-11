import { Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Header />}></Route>
      </Routes>
    </div>
  );
}

export default App;
