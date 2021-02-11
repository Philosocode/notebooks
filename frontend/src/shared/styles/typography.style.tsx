import styled, { css } from "styled-components";
import { theme } from "./theme.style";

const SBold = css`
  font-weight: bold;
`;

export const SHeadingTitle = styled.h1`
  font-size: ${theme.fontSizes.xl};
  ${SBold};
`;

export const SHeadingSubtitle = styled.h2`
  font-size: ${theme.fontSizes.lg};
  ${SBold}
`;

export const SHeadingSubSubtitle = styled.h3`
  font-size: ${theme.fontSizes.md};
  ${SBold}
`;