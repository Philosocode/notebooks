import styled from "styled-components";

import { theme } from "./theme.styles";

// padding-left for sidebar, margin-top for navbar
export const SMainContent = styled.main`
  margin-top: ${theme.componentSizes.navbarHeight};
  padding-left: ${theme.componentSizes.librarySidebarWidth};
  padding-bottom: ${theme.spacing.lg};
`;

export const SPageContent = styled.div`
  padding: ${theme.spacing.base};
`;

interface ISPageContentCenterProps {
  centerContent?: boolean;
}
export const SPageContentCenter = styled(SPageContent)`
  max-width: 80rem;
  margin: 0 auto;
  
  ${(props: ISPageContentCenterProps) => props.centerContent && `text-align: center;`}
`;
