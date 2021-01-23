import React from "react";
import { NavLink } from "react-router-dom";
import { theme } from "shared/styles/theme.styles";
import styled from "styled-components";

export const Navbar = () => {
  return (
    <SNav>
      <SNavList>
        <SNavItem>
          <SNavLink exact to="/login">Login</SNavLink>
        </SNavItem>
        <SNavItem>
          <SNavLink to="/library">Library</SNavLink>
        </SNavItem>
      </SNavList>
    </SNav>
  );
};

const SNav = styled.nav`
  background: #eee;
  display: flex;
    align-items: center;
    justify-content: flex-end;
  height: ${theme.other.navbarHeight};
  padding-right: ${theme.other.sideGap};
  position: fixed;
    top: 0;
    left: 0;
  width: 100vw;
`;

const SNavList = styled.ul`
  display: flex;
  justify-content: flex-end;
`;

const SNavItem = styled.li`
  &:not(:last-child) {
    margin-right: 2rem;
  }
`;

// https://spectrum.chat/styled-components/help/how-to-use-sc-with-nav-activeclassname~8f753cea-75c3-4524-8207-fd0216026665?m=MTUxNzc1MzI1MjY5MA==
const SNavLink = styled(NavLink).attrs({
  activeClassName: "active",
})`
  color: black;
  &.active {
    font-weight: bold;
  }
`;