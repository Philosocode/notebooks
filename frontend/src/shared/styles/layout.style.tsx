import styled from "styled-components";

import { theme } from "./theme.style";

export const SMainContent = styled.main`
  margin-top: ${theme.componentSizes.navbarHeight};
  max-height: calc(100vh - ${theme.componentSizes.navbarHeight});
  overflow: auto;
  width: 100%;
`;

export const SPageContent = styled.div`
  padding: ${theme.spacing.base};
`;

export const SDetailPageContent = styled.div`
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
