import React from "react";

import { Link } from "react-router-dom";

export const LibraryPage = () => {
  return (
    <div>
      <h1>Library Page</h1>
      <Link to="/">Home</Link>
      <Link to="/library">Library</Link>
    </div>
  );
 };