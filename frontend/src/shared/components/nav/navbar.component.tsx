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
import { faLightbulb, faQuestion, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { RandomHookModal } from "../../../modal/components/random-hook-modal.component";
import { IMenuAction, Menu } from "../menu/menu.component";

export const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const appLocation = useAppLocation();

  const [menuShowing, toggleMenu] = useToggle(false);
  const [randomHookModalShowing, toggleRandomHookModal] = useToggle(false);
  const [helpModalShowing, toggleHelpModal] = useToggle(false);

  const menuActions: IMenuAction[] = [
    { name: "Random Hook", icon: faLightbulb, action: toggleRandomHookModal },
    { name: "I'm Stuck", icon: faQuestion, action: toggleHelpModal },
  ];

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
        { user && (
          <div>
            <SStuckButton icon={faQuestionCircle} onClick={toggleMenu} />
            <SMenuContainer>
              <Menu actions={menuActions} menuShowing={menuShowing} toggleMenu={toggleMenu} />
            </SMenuContainer>
          </div>
        )}
        { user ? getLoggedInLinks() : getLoggedOutLinks() }
        { user && <NavbarProfileMenu user={user} /> }
      </SNavList>
      <HelpModal handleClose={toggleHelpModal} isShowing={helpModalShowing} />
      <RandomHookModal handleClose={toggleRandomHookModal} isShowing={randomHookModalShowing} />
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

const SStuckButton = styled(FontAwesomeIcon)`
  cursor: pointer;
  font-size: 2.5rem;
  
  &:hover {
    color: ${theme.colors.green["300"]};
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

const SMenuContainer = styled.div`
  position: relative;
  top: 3px;
`;