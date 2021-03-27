import React from "react";
import { useLocation } from "react-router-dom";

import { AppSidebar } from "./app-sidebar.component";
import { LibrarySidebar } from "library/components/library-sidebar.component";
import { SidebarWrapper } from "./sidebar-wrapper.component";
import { theme } from "shared/styles/theme.style";

export const Sidebar: React.FC = () => {
  const { pathname } = useLocation();

  if (pathname.includes("login")) return null;

  let sidebarWidth: string;
  let SidebarContent: React.FC;

  if (pathname.includes("library")) {
    sidebarWidth = theme.componentSizes.librarySidebarWidth;
    SidebarContent = LibrarySidebar;
  } else {
    sidebarWidth = theme.componentSizes.appSidebarWidth;
    SidebarContent = AppSidebar;
  }

  return (
    <SidebarWrapper width={sidebarWidth}>
      <SidebarContent />
    </SidebarWrapper>
  )
}