import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";

// logic
import { selectUser } from "user/redux/user.selectors";
import { useAppLocation } from "shared/hooks/use-app-location.hook";
import { useToggle } from "shared/hooks/use-toggle.hook";
import { toggleSidebar } from "shared/redux/global.slice";

// components
import { HelpModal } from "modal/components/help-modal.component";
import { NavbarProfileMenu } from "./navbar-profile-menu.component";
import { RandomHookModal } from "../../../modal/components/random-hook-modal.component";

// styles
import { theme } from "shared/styles/theme.style";
import { SButtonGreen } from "../../styles/button.style";

export const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const appLocation = useAppLocation();

  const [randomHookModalShowing, toggleRandomHookModal] = useToggle(false);
  const [helpModalShowing, toggleHelpModal] = useToggle(false);

  function handleToggleClick() {
    dispatch(toggleSidebar());
  }

  return (
    <SNav>
      { appLocation !== "auth" && <SMenuToggle icon="bars" onClick={handleToggleClick} /> }
      <SNavList>
        { user && (
          <>
            <SRandomHookButton icon={faLightbulb} onClick={toggleRandomHookModal} />
            <SStuckButton onClick={toggleHelpModal}>I'm Stuck</SStuckButton>
            <NavbarProfileMenu user={user} />
          </>
        )}

        { appLocation === "auth" && (
          <>
            <SNavLink to="/login" activeClassName="active">Login</SNavLink>
            <SNavLink to="/register" activeClassName="active">Register</SNavLink>
          </>
        )}
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

const SNavLink = styled(NavLink)`
  &.active {
    font-weight: bold;
  }
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

const SRandomHookButton = styled(FontAwesomeIcon)`
  color: ${theme.colors.gray["700"]};
  cursor: pointer;
  font-size: 2rem;
  
  &:hover {
    color: ${theme.colors.green["300"]};
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
    margin-right: 3rem;
  }
`;