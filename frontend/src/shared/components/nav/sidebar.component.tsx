import React from "react";
import { useLocation } from "react-router-dom";

import { AppSidebar } from "./app-sidebar.component";
import { LibrarySidebar } from "library/components/library-sidebar.component";
import { SidebarWrapper } from "./sidebar-wrapper.component";
import { theme } from "../../styles/theme.style";

interface IProps {
  sidebarShowing: boolean;
}
export const Sidebar: React.FC<IProps> = ({ sidebarShowing }) => {
  const { pathname } = useLocation();

  if (pathname.includes("login")) return null;
  if (pathname.includes("library")) return <LibrarySidebar />;

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
    <SidebarWrapper sidebarShowing={sidebarShowing} width={sidebarWidth}>
      <SidebarContent />
    </SidebarWrapper>
  )
};