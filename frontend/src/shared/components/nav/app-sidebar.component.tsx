import React from "react";
import { NavLink, useHistory, useLocation, matchPath } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { faLightbulb, faStar } from "@fortawesome/free-regular-svg-icons";
import { faBook, faStopwatch, faStream } from "@fortawesome/free-solid-svg-icons";

import { showModal } from "timer/redux/timer.slice";
import { setPracticeState } from "practice/redux/practice.slice";
import { useAppLocation } from "../../hooks/use-app-location.hook";
import { selectTimerModalShowing } from "timer/redux/timer.selectors";

import { theme } from "shared/styles/theme.style";
import { TFlashcardSource } from "practice/redux/practice.types";

export const AppSidebar: React.FC = () => { 
  const dispatch = useDispatch();
  const history = useHistory();
  const timerModalShowing = useSelector(selectTimerModalShowing);
  const location = useLocation();
  const appLocation = useAppLocation();

  function showTimer() {
    dispatch(showModal())
  }

  function handlePracticeClick() {
    let source: TFlashcardSource = "all";

    switch(appLocation) {
      case "notebook-detail":
        source = "notebook";
        break;
      case "sections":
        source = "section";
        break;
    }

    if (source === "all") {
      dispatch(setPracticeState({ source: "all", id: "" }));
    } else {
      // FROM: https://github.com/ReactTraining/react-router/issues/5870#issuecomment-394194338
      const match = matchPath<{ id: string; }>(location.pathname, { path: `/${source}s/:id`, exact: true });
      if (match?.params.id) {
        dispatch(setPracticeState({ source, id: match.params.id }));
      }
    }

    history.push("/practice");
  }

  return (
    <SContent>
      <SSidebarLink to="/notebooks" $isSelected={appLocation === "sections"}>
        <SIcon icon={faBook} />
        <SName>Notebooks</SName>
      </SSidebarLink>
      <SSidebarLink to="/concepts">
        <SIcon icon={faLightbulb} />
        <SName>Concepts</SName>
      </SSidebarLink>
      <SSidebarItem onClick={showTimer} isSelected={timerModalShowing}>
        <SIcon icon={faStopwatch} />
        <SName>Timer</SName>
      </SSidebarItem>
      <SSidebarItem onClick={handlePracticeClick} isSelected={appLocation === "practice"}>
        <SIcon icon={faStar} />
        <SName>Practice</SName>
      </SSidebarItem>
      <SSidebarLink to="/workflows">
        <SIcon icon={faStream} />
        <SName>Workflows</SName>
      </SSidebarLink>
    </SContent>
  )
 };


interface ISelected {
  isSelected?: boolean;
  $isSelected?: boolean;
}

const { transitionAppend } = theme.animations;
const green = theme.colors.green[300];

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
  font-size: 0.9rem;
  letter-spacing: 1px;
  margin-top: ${theme.spacing.xs};
  text-transform: uppercase;
  transition: color ${transitionAppend};
  
  ${theme.media.tabLand} {
    font-size: ${theme.fontSizes.xs};
  }
`;

const SidebarItemCss = css<ISelected>`
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
    color: ${green};
    
    ${SIcon} {
      color: ${green};
    }
  }
`;

const SSidebarItem = styled.button<ISelected>`
  ${SidebarItemCss}

  color: ${props => props.isSelected && green};
  
  &:active, &:focus {
    outline: none;
  }
`;

const SSidebarLink = styled(NavLink).attrs({
  activeClassName: "active",
})<ISelected>`
  ${SidebarItemCss}

  color: ${props => (props.isSelected || props.$isSelected) && green};
`;
