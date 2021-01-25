import React, { useCallback } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { theme } from "shared/styles/theme.styles";
import { selectIsLoggedIn } from "auth/redux/auth.selectors";
import { logout } from "auth/redux/auth.slice";

export const Navbar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const LibraryLink = <SNavItem>
    <SNavLink to="/library">Library</SNavLink>
  </SNavItem>;

  const handleLogout = useCallback((e) => {
    e.preventDefault();
    dispatch(logout());
  }, [dispatch]);

  function getLoggedInLinks() {
    const active = !pathname.includes("library") && !pathname.includes("login");

    return (
      <>
        <SNavItem>
          <SStudyLink active={active} to="/concepts">Study</SStudyLink>
        </SNavItem>
        {LibraryLink}
        <SNavItem>
          <SLinkDiv onClick={handleLogout}>Logout</SLinkDiv>
        </SNavItem>
      </>
    );
  };

  function getLoggedOutLinks() {
    return (
      <>
        <SNavItem>
          <SNavLink to="/login">Login</SNavLink>
        </SNavItem>
        {LibraryLink}
      </>
    );
  };

  return (
    <SNav>
      <SNavList>
        {
          isLoggedIn ? getLoggedInLinks() : getLoggedOutLinks()
        }
      </SNavList>
    </SNav>
  );
};

const SNav = styled.nav`
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: ${theme.componentSizes.navbarHeight};
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

const SLinkStyles = css`
  color: black;
  cursor: pointer;

  &.active {
    font-weight: bold;
  }
`;

// https://spectrum.chat/styled-components/help/how-to-use-sc-with-nav-activeclassname~8f753cea-75c3-4524-8207-fd0216026665?m=MTUxNzc1MzI1MjY5MA==
const SNavLink = styled(NavLink).attrs({
  activeClassName: "active",
})`
  ${SLinkStyles}
`;

const SLinkDiv = styled.div`
  ${SLinkStyles};
`;

const SStudyLink = styled(Link)`
  font-weight: ${(props: { active: boolean}) => props.active ? "bold" : "400"};
`;