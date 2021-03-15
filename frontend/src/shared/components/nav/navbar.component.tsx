import React, { useCallback } from "react";
import { Link, NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";

// logic
import { selectUser } from "auth/redux/auth.selectors";
import { useAppLocation } from "shared/hooks/use-app-location.hook";
import { logout } from "auth/redux/auth.slice";
import { useToggle } from "shared/hooks/use-toggle.hook";

// components
import { HelpModal } from "modal/components/help-modal.component";

// styles
import { theme } from "shared/styles/theme.style";
import { SButtonGreen } from "shared/styles/button.style";
import { NavProfileMenu } from "./nav-profile-menu.component";

export const Navbar = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const appLocation = useAppLocation();

  const [helpModalShowing, toggleHelpModalShowing] = useToggle(false);

  const LibraryLink = <SNavItem>
    <SNavLink to="/library">Library</SNavLink>
  </SNavItem>;

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
      </>
    );
  }

  function getLoggedOutLinks() {
    return (
      <>
        <SNavItem>
          <SNavLink to="/login">Login</SNavLink>
        </SNavItem>
        {LibraryLink}
      </>
    );
  }

  return (
    <SNav>
      { user && <SStuckButton onClick={toggleHelpModalShowing}>I'm Stuck</SStuckButton> }
      <SNavList>
        { user ? getLoggedInLinks() : getLoggedOutLinks() }
      </SNavList>
      <NavProfileMenu user={user} />
      <HelpModal handleClose={toggleHelpModalShowing} isShowing={helpModalShowing} />
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

const SStuckButton = styled(SButtonGreen)`
  box-shadow: none;
  margin-right: ${theme.spacing.base};
  font-size: ${theme.fontSizes.sm};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0.5em;
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