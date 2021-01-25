import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import { theme } from "shared/styles/theme.styles";
import { SidebarWrapper } from "shared/components/nav/sidebar-wrapper.component";

export const AppSidebar: FC = () => (
  <SidebarWrapper width="10rem">
    <SContent>

      <SSidebarLink to="/concepts">
        <SIcon icon={["far", "lightbulb"]} />
        <SName>Concepts</SName>
      </SSidebarLink>

      <SSidebarLink to="/materials">
        <SIcon icon="book" />
        <SName>Materials</SName>
      </SSidebarLink>

      <SSidebarLink to="/timer">
        <SIcon icon="stopwatch" />
        <SName>Timer</SName>
      </SSidebarLink>

      <SSidebarLink to="/practice">
        <SIcon icon={["far", "star"]} />
        <SName>Practice</SName>
      </SSidebarLink>

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
  color: #777;
  padding: ${theme.spacing.base} 0;
  text-align: center;
  transition: background ${transitionAppend};
  width: 100%;
  
  &:hover, &.active {
    background: #ddd;
    color: ${theme.colors.green};
    
    ${SIcon} {
      color: ${theme.colors.green};
    }
  }
  
}
`;
