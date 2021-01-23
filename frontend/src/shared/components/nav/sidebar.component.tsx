import React, { FC } from "react";
import styled from "styled-components";

import { theme } from "shared/styles/theme.styles";
import { SidebarFooter } from "./sidebar-footer.component";

interface IProps {
  children?: React.ReactNode;
}

export const Sidebar: FC<IProps> = ({ children }) => {
  return (
    <SSidebar>
      {children}
      <SidebarFooter />
    </SSidebar>
  );
};

const SSidebar = styled.aside`
  background: #ddd;
  display: block;
  height: 100vh;
  width: ${theme.other.sidebarWidth};
  padding: ${theme.spacing.base};
  padding-bottom: ${theme.spacing.lg};
  position: fixed;
  top: ${theme.other.navbarHeight};
  left: 0;
  overflow-y: auto;
`;
