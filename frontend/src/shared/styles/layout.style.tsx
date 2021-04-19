import styled, { css } from "styled-components";

import { theme } from "./theme.style";

const pageOverflowCSS = css`
  max-height: calc(100vh - ${theme.componentSizes.navbarHeight});
  overflow: auto;
`;

export const SMainContent = styled.main`
  ${pageOverflowCSS};
  
  margin-top: ${theme.componentSizes.navbarHeight};
  width: 100%;
`;

export const SPageContent = styled.div`
  ${pageOverflowCSS};
  
  padding: ${theme.spacing.base};
`;

export const SDetailPageContent = styled.div`
  ${pageOverflowCSS};
  
  padding: ${theme.spacing.base} ${theme.spacing.base};
  
  ${theme.media.tabLand} {
    padding: ${theme.spacing.md} ${theme.spacing.lg};
  }
`;

interface ISPageContentCenterProps {
  centerContent?: boolean;
}
export const SPageContentCenter = styled(SPageContent)`
  max-width: 80rem;
  margin: 0 auto;
  
  ${(props: ISPageContentCenterProps) => props.centerContent && `text-align: center;`}
`;
