import React from "react";
import { useLocation } from "react-router-dom";

import { AppSidebar } from "./app-sidebar.component";
import { LibrarySidebar } from "library/components/library-sidebar.component";

export const Sidebar = () => {
  const { pathname } = useLocation();

  if (pathname.includes("login")) return null;
  if (pathname.includes("library")) return <LibrarySidebar />;

  return <AppSidebar />;
};