import styled from "styled-components";

import { theme } from "./theme.styles";

const { transitionAppend } = theme.animations;

export const SButton = styled.button`
  border: none;
  border-radius: 5px;
  box-shadow: ${theme.boxShadows.pressed};
  cursor: pointer;
  font-weight: 500;
  transition: background ${theme.animations.transitionAppend};
  padding: 0.75em 1em;

  &:active,
  &:focus {
    outline: 1px solid ${theme.colors.gray[100]};
  }

  &:disabled {
    cursor: not-allowed;
    background: ${theme.colors.gray[400]};
  }
`;

export const SHoverButton = styled(SButton)`
  transition: transform ${transitionAppend}, box-shadow ${transitionAppend};

  &:hover {
    box-shadow: ${theme.boxShadows.alt};
    transform: translateY(-3px);
  }

  &:active,
  &:focus {
    box-shadow: ${theme.boxShadows.pressed};
    transform: translateY(-1.5px);
  }
`;

export const SButtonGreen = styled(SButton)`
  background: ${theme.colors.green[300]};
  color: white;

  &:hover:enabled {
    background: ${theme.colors.green[400]};
  }
`;

export const SButtonRed = styled(SButton)`
  background: ${theme.colors.red[300]};
  color: white;

  &:hover:enabled {
    background: ${theme.colors.red[400]};
  }
`;