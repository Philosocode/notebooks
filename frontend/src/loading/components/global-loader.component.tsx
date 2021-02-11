import React from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";

import { selectIsLoading } from "loading/redux/loading.selectors";
import styled from "styled-components";
import { theme } from "shared/styles/theme.style";

// FROM: https://loading.io/css/
export const GlobalLoader = () => {
  const isLoading = useSelector(selectIsLoading);
  if (!isLoading) return null;

  return ReactDOM.createPortal(
    // https://loading.io/css/
    <SLoaderContainer>
      <SLoaderRing>
        <div />
        <div />
        <div />
        <div />
      </SLoaderRing>
    </SLoaderContainer>,
    document.body
  );
};

const SLoaderContainer = styled.div`
  /* background: rgba(0, 0, 0, 0.25); */
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
`;

const SLoaderRing = styled.div`
  display: inline-block;
  height: 8rem;
  width: 8rem;
  position: fixed;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);

  & > div {
    border: 8px solid ${theme.colors.green[200]};
    border-color: ${theme.colors.green[200]} transparent transparent transparent;
    display: block;
    position: absolute;
    width: 6.4rem;
    height: 6.4rem;
    margin: 8px;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  }

  & > div:nth-child(1) {
    animation-delay: -0.45s;
  }
  & > div:nth-child(2) {
    animation-delay: -0.3s;
  }
  & > div:nth-child(3) {
    animation-delay: -0.15s;
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
