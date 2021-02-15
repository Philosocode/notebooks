import styled from "styled-components";

import { theme } from "./theme.style";

// padding-left for sidebar, margin-top for navbar
export const SMainContent = styled.main`
  margin-top: ${theme.componentSizes.navbarHeight};
  padding-left: ${(props: { paddingLeft: string }) => props.paddingLeft};
`;

export const SPageContent = styled.div`
  padding: ${theme.spacing.base};
`;

export const SDetailPageContent = styled.div`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
`;

interface ISPageContentCenterProps {
  centerContent?: boolean;
}
export const SPageContentCenter = styled(SPageContent)`
  max-width: 80rem;
  margin: 0 auto;
  
  ${(props: ISPageContentCenterProps) => props.centerContent && `text-align: center;`}
`;
