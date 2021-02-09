import React from "react";
import { Redirect } from "react-router-dom";

// navigating to /library should take the user to the first page in the library
export const LibraryPage = () => <Redirect to="/library/concrete-examples" />;
