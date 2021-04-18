import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// logic
import { selectUser } from "user/redux/user.selectors";
import { useAppLocation } from "shared/hooks/use-app-location.hook";
import { useToggle } from "shared/hooks/use-toggle.hook";
import { toggleSidebar } from "shared/redux/global.slice";

// components
import { HelpModal } from "modal/components/help-modal.component";
import { NavbarProfileMenu } from "./navbar-profile-menu.component";

// styles
import { theme } from "shared/styles/theme.style";
import { SButtonGreen } from "shared/styles/button.style";

export const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const appLocation = useAppLocation();

  const [helpModalShowing, toggleHelpModal] = useToggle(false);

  const LibraryLink = <li><SNavLink to="/library">Library</SNavLink></li>;

  function getLoggedInLinks() {
    return (
      <>
        <li>
          <SStudyLink
            $activeLink={appLocation !== "library"}
            to="/notebooks"
          >Study</SStudyLink>
        </li>
        {LibraryLink}
      </>
    );
  }

  function getLoggedOutLinks() {
    return (
      <>
        <li>
          <SNavLink to="/login">Login</SNavLink>
        </li>
        {LibraryLink}
      </>
    );
  }

  function handleToggleClick() {
    dispatch(toggleSidebar());
  }

  return (
    <SNav>
      { appLocation !== "other" && <SMenuToggle icon="bars" onClick={handleToggleClick} /> }
      <SNavList>
        { user && <SStuckButton onClick={toggleHelpModal}>I'm Stuck</SStuckButton> }
        { user ? getLoggedInLinks() : getLoggedOutLinks() }
        { user && <NavbarProfileMenu user={user} /> }
      </SNavList>
      <HelpModal handleClose={toggleHelpModal} isShowing={helpModalShowing} />
    </SNav>
  );
};

const SNav = styled.nav`
  background: ${theme.colors.gray[100]};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: ${theme.componentSizes.navbarHeight};
  padding: 0 ${theme.spacing.sideGap};
  position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  z-index: ${theme.zIndices.nav};
`;

const SMenuToggle = styled(FontAwesomeIcon)`
  cursor: pointer;
  font-size: 2.5rem;
  position: absolute;
    left: 1rem;
  
  ${theme.media.tabPort} {
    left: 3.5rem;
  }
`;

const SStuckButton = styled(SButtonGreen)`
  box-shadow: none;
  margin-right: ${theme.spacing.base};
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  padding: 0.5em;
  
  ${theme.media.phoneOnly} {
    font-size: ${theme.fontSizes.xs};
    padding: 0.6em;
  }
`;
const SNavList = styled.ul`
  display: flex;
    justify-content: flex-end;
    align-items: center;
  position: relative;
  
  & > *:not(:last-child) {
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