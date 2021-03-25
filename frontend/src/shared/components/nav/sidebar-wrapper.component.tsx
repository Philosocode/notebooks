import React, { FC } from "react";
import styled from "styled-components";

import { theme } from "shared/styles/theme.style";

interface IProps {
  sidebarShowing: boolean;
  width: string;
}
export const SidebarWrapper: FC<IProps> = ({ children, sidebarShowing, width }) => {
  return (
    <SSidebar
      sidebarShowing={sidebarShowing}
      width={width}
    >{children}</SSidebar>
  );
};

const SSidebar = styled.aside<IProps>`
  background: #eee;
  max-height: 100vh;
  padding-bottom: ${theme.spacing.md};
  padding-top: ${theme.componentSizes.navbarHeight};
  overflow-y: auto;
  transition: transform ${theme.animations.transitionAppend}, width ${theme.animations.transitionAppend};
  transform: ${props => props.sidebarShowing ? "translateX(0)" : "translateX(-12rem)"};
  width: ${props => props.sidebarShowing ? props.width : 0};
`;
