import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { css } from "styled-components";

import { theme } from "shared/styles/theme.style";
import { SidebarWrapper } from "shared/components/nav/sidebar-wrapper.component";
import { faLightbulb, faStar } from "@fortawesome/free-regular-svg-icons";
import { faBook, faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { showModal } from "modal/redux/modal.slice";

export const AppSidebar: React.FC = () => { 
  const dispatch = useDispatch();

  function showTimer() {
    dispatch(showModal({ modalType: "timer" }))
  }

  return (
    <SidebarWrapper width={theme.componentSizes.appSidebarWidth}>
      <SContent>
        <SSidebarLink to={`/concepts`}>
          <SIcon icon={faLightbulb} />
          <SName>Concepts</SName>
        </SSidebarLink>
        <SSidebarLink to={`/materials`}>
          <SIcon icon={faBook} />
          <SName>Materials</SName>
        </SSidebarLink>
        <SSidebarItem onClick={showTimer}>
          <SIcon icon={faStopwatch} />
          <SName>Timer</SName>
        </SSidebarItem>
        <SSidebarItem>
          <SIcon icon={faStar} />
          <SName>Practice</SName>
        </SSidebarItem>
      </SContent>
    </SidebarWrapper>
  )
 };

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

const SidebarItemCss = css`
  background: transparent;
  border: none;
  color: ${theme.colors.gray["400"]};
  cursor: pointer;
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
`;

const SSidebarItem = styled.button`
  ${SidebarItemCss}

  &:active, &:focus {
    outline: none;
  }
`;

const SSidebarLink = styled(NavLink).attrs({
  activeClassName: "active",
})`
  ${SidebarItemCss}
`;
