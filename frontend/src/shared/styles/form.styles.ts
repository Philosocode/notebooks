import styled from "styled-components";

import { theme } from "./theme.styles";

export const SInputBorderless = styled.input`
  border: none;
  border-bottom: 1px solid ${theme.colors.gray[500]};
  display: block;
  padding-bottom: ${theme.spacing.xs};
  width: 90%;
  max-width: 35rem;

  &:active,
  &:focus {
    outline: none;
  }
`;