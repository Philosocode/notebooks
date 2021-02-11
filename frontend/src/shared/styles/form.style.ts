import styled from "styled-components";

import { theme } from "./theme.style";

export const SInputBorderless = styled.input`
  border: none;
  border-bottom: 1px solid ${theme.colors.gray[500]};
  display: block;
  padding-bottom: ${theme.spacing.xs};
  width: 100%;

  &:active,
  &:focus {
    outline: none;
  }
`;