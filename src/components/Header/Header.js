import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <div>
      <Link to="/random">go to random</Link>
    </div>
  );
}

export default Header;
