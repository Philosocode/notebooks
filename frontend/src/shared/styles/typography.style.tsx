import styled, { css } from "styled-components";

import { theme } from "./theme.style";

interface IHeadingBaseProps {
  weight?: number;
}
const SHeadingBase = css<IHeadingBaseProps>`
  font-weight: ${props => props.weight ?? "bold"};
`;

export const SHeadingTitle = styled.h1`
  ${SHeadingBase};
  font-size: ${theme.fontSizes.lg};
  
  ${theme.media.tabLand} {
    font-size: ${theme.fontSizes.xl};
  }
`;

export const SHeadingSubtitle = styled.h2`
  ${SHeadingBase};
  font-size: ${theme.fontSizes.md};
  
  ${theme.media.tabLand} {
    font-size: ${theme.fontSizes.lg};
  }
`;

export const SHeadingSubSubtitle = styled.h3`
  ${SHeadingBase};
  font-size: ${theme.fontSizes.md};
`;

export const SAnchorTag = styled.a`
  color: ${theme.colors.green[300]};
  text-decoration: underline;
`;