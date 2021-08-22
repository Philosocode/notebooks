import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";

import { TAppState } from "shared/redux/store";
import { TAlertType } from "alert/redux/alert.types";
import { theme } from "shared/styles/theme.style";
import { clearAlert } from "alert/redux/alert.slice";

function getColour(type: TAlertType) {
  if (type === "warning" || type === "error") {
    return theme.colors.red[300];
  }

  return theme.colors.green[300];
}

function getIcon(type: TAlertType): JSX.Element {
  if (type === "warning" || type === "error") {
    return <SIcon icon="exclamation-triangle" />;
  }

  return <SIcon icon="check-circle" />;
}

// FROM: https://dev.to/tibetegya/how-to-create-a-notification-component-with-redux-toolkit-and-styled-componets-knp
export const Alert = () => {
  const dispatch = useDispatch();
  const alertState = useSelector((state: TAppState) => state.alert);
  const { message, type, isShowing } = alertState;

  const color = getColour(type);
  const icon = getIcon(type);

  function handleExit() {
    dispatch(clearAlert());
  }

  // need to use a ref to deal with error: https://stackoverflow.com/a/62192153
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      in={isShowing}
      timeout={300}
      onExited={handleExit}
      classNames="slide"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <SAlert color={color} ref={nodeRef}>
        {icon}
        <span>{message}</span>
      </SAlert>
    </CSSTransition>
  );
};

const SAlert = styled.div`
  animation: slide-enter 1s ease-in-out;
  background: ${(props) => props.color};
  border-radius: 5px;
  box-shadow: 0 5px 1.5rem rgba(0, 0, 0, 0.3);
  color: white;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: ${theme.fontSizes.base};
  max-width: 90vw;
  padding: ${theme.spacing.sm} ${theme.spacing.base};
  position: fixed;
  left: 50%;
  top: calc(5vh + ${theme.componentSizes.navbarHeight});
  transform: translateX(-50%);
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;

  &.slide-enter {
    opacity: 0;
    transform: translate(-50%, -5vh);
  }

  &.slide-enter-active {
    opacity: 1;
    transform: translate(-50%, 0);
  }

  &.slide-exit {
    opacity: 1;
    transform: translate(-50%, 0);
  }

  &.slide-exit-active {
    opacity: 0;
    transform: translate(-50%, -5vh);
  }
`;

const SIcon = styled(FontAwesomeIcon)`
  margin-right: ${theme.spacing.sm};
`;
