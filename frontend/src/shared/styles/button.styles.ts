import styled from "styled-components";

import { theme } from "./theme.styles";

const { transitionAppend } = theme.animations;

export const SButton = styled.button`
  border: none;
  border-radius: 5px;
  box-shadow: ${theme.boxShadows.light};
  cursor: pointer;
  font-weight: 500;
  padding: 0.75em 1em;
`;

const SHoverButton = styled(SButton)`
  transition: transform ${transitionAppend}, box-shadow ${transitionAppend};

  &:hover {
    box-shadow: ${theme.boxShadows.alt};
    transform: translateY(-3px);
  }

  &:active,
  &:focus {
    box-shadow: ${theme.boxShadows.pressed};
    transform: translateY(-1.5px);
    outline: 1px solid green;
  }
`;

export const SButtonGreen = styled(SHoverButton)`
  background-color: ${theme.colors.green};
  color: white;
`;