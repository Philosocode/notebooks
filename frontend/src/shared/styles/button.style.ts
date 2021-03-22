import styled from "styled-components";

import { theme } from "./theme.style";

export const SButton = styled.button`
  border: none;
  border-radius: 5px;
  box-shadow: ${theme.boxShadows.light};
  cursor: pointer;
  font-weight: 500;
  font-size: ${theme.fontSizes.sm};
  transition: background ${theme.animations.transitionAppend};
  padding: 0.75em 1em;
  
  ${theme.media.tabPort} {
    font-size: ${theme.fontSizes.base};
  }

  &:active,
  &:focus {
    outline: 1px solid ${theme.colors.gray[500]};
  }

  &:disabled {
    cursor: not-allowed;
    background: ${theme.colors.gray[400]};
  }
`;

export const SButtonGreen = styled(SButton)`
  background: ${theme.colors.green[300]};
  color: white;

  &:hover:enabled {
    background: ${theme.colors.green[400]};
  }

  &:active,
  &:focus {
    outline: 1px solid ${theme.colors.green[500]};
  }
`;

export const SButtonRed = styled(SButton)`
  background: ${theme.colors.red[300]};
  color: white;

  &:hover:enabled {
    background: ${theme.colors.red[400]};
  }

  &:active,
  &:focus {
    outline: 1px solid ${theme.colors.red[400]};
  }
`;