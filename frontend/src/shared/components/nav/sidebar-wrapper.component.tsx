import React, { FC, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { selectSidebarShowing, setSidebarShowing } from "shared/redux/global.slice";
import { theme } from "shared/styles/theme.style";
import { useLocation } from "react-router-dom";
import { useIsMobile } from "../../hooks/use-is-mobile.hook";

interface IProps {
  width: string;
}
export const SidebarWrapper: FC<IProps> = ({ children, width }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const sidebarShowing = useSelector(selectSidebarShowing);
  const isMobile = useIsMobile();

  useEffect(() => {
    // hide sidebar when changing links on mobile
    if (isMobile) {
      dispatch(setSidebarShowing(false));
    }
  }, [dispatch, isMobile, location.pathname]);

  return (
    <SSidebar
      className="sidebar-wrapper"
      sidebarShowing={sidebarShowing}
      width={width}
    >{children}</SSidebar>
  );
};

interface SSidebarProps {
  sidebarShowing: boolean;
  width: string;
}
const SSidebar = styled.aside<SSidebarProps>`
  background: #eee;
  height: 100vh;
  padding-bottom: ${theme.spacing.md};
  padding-top: ${theme.componentSizes.navbarHeight};
  overflow-y: auto;
  transition: transform ${theme.animations.transitionAppend}, width ${theme.animations.transitionAppend};
  transform: ${props => props.sidebarShowing ? "translateX(0)" : "translateX(-12rem)"};
  width: ${props => props.sidebarShowing ? props.width : 0};
  position: fixed;
  z-index: ${theme.zIndices.sidebar};
  
  ${theme.media.tabLand} {
    position: relative;
  }
`;
