import React, { useCallback } from "react";
import { Link, NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { theme } from "shared/styles/theme.style";
import { selectUser } from "auth/redux/auth.selectors";
import { useAppLocation } from "../../hooks/use-app-location.hook";
import { logout } from "auth/redux/auth.slice";

export const Navbar = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const appLocation = useAppLocation();

  const LibraryLink = <SNavItem>
    <SNavLink to="/library">Library</SNavLink>
  </SNavItem>;

  const handleLogout = useCallback((e) => {
    e.preventDefault();
    dispatch(logout());
  }, [dispatch]);

  function getLoggedInLinks() {
    return (
      <>
        <SNavItem>
          <SStudyLink
            $activeLink={appLocation !== "library"}
            to="/concepts"
          >Study</SStudyLink>
        </SNavItem>
        {LibraryLink}
        <SProfilePictureContainer onClick={handleLogout}>
          <SProfilePicture src={user?.photo_url} alt={user?.name} />
        </SProfilePictureContainer>
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
          user ? getLoggedInLinks() : getLoggedOutLinks()
        }
      </SNavList>
    </SNav>
  );
};

const SNav = styled.nav`
  background: ${theme.colors.gray[100]};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: ${theme.componentSizes.navbarHeight};
  padding-right: ${theme.other.sideGap};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: ${theme.zIndices.nav};
`;

const SNavList = styled.ul`
  display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const SNavItem = styled.li`
  &:not(:last-child) {
    margin-right: 2rem;
  }
`;

const SProfilePictureContainer = styled(SNavItem)`
  cursor: pointer;
  display: flex;
    justify-content: center;
    align-items: center;
`;

const SProfilePicture = styled.img`
  border-radius: 50%;
  height: 3rem;
  width: 3rem;
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

const SStudyLink = styled(Link)`
  font-weight: ${(props: { $activeLink: boolean }) => props.$activeLink ? "bold" : "400"};
`;