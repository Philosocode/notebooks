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
  font-size: ${theme.fontSizes.xl};
`;

export const SHeadingSubtitle = styled.h2`
  ${SHeadingBase};
  font-size: ${theme.fontSizes.lg};
`;

export const SHeadingSubSubtitle = styled.h3`
  ${SHeadingBase};
  font-size: ${theme.fontSizes.md};
`;