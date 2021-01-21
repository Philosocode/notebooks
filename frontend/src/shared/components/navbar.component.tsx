import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav>
      <ul className="flex">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/library">Library</Link></li>
      </ul>
    </nav>
  )
};
