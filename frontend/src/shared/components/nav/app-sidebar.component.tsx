import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import { theme } from "shared/styles/theme.style";
import { SidebarWrapper } from "shared/components/nav/sidebar-wrapper.component";
import { faLightbulb, faStar } from "@fortawesome/free-regular-svg-icons";
import { faBook, faStopwatch } from "@fortawesome/free-solid-svg-icons";

const sidebarLinks = [
  { name: "Concepts", icon: faLightbulb },
  { name: "Materials", icon: faBook },
  { name: "Timer", icon: faStopwatch },
  { name: "Practice", icon: faStar },
]

export const AppSidebar: FC = () => (
  <SidebarWrapper width={theme.componentSizes.appSidebarWidth}>
    <SContent>
      {
        sidebarLinks.map(sl => (
          <SSidebarLink key={sl.name} to={`/${sl.name.toLowerCase()}`}>
            <SIcon icon={sl.icon} />
            <SName>{sl.name}</SName>
          </SSidebarLink>
        ))
      }
    </SContent>
  </SidebarWrapper>
);

const { transitionAppend } = theme.animations;

const SContent = styled.div`
  display: flex;
    flex-direction: column;
    align-items: center;
`;

const SIcon = styled(FontAwesomeIcon)`
  font-size: 2rem;
  transition: color ${transitionAppend};
`;

const SName = styled.h3`
  font-size: ${theme.fontSizes.xs};
  letter-spacing: 1px;
  margin-top: ${theme.spacing.xs};
  text-transform: uppercase;
  transition: color ${transitionAppend};
`;

const SSidebarLink = styled(NavLink).attrs({
  activeClassName: "active",
})`
  background: transparent;
  color: ${theme.colors.gray["400"]};
  padding: ${theme.spacing.base} 0;
  text-align: center;
  transition: background ${transitionAppend};
  width: 100%;
  
  &:hover, &.active {
    background: ${theme.colors.gray["100"]};
    color: ${theme.colors.green[300]};
    
    ${SIcon} {
      color: ${theme.colors.green[300]};
    }
  }
}
`;
