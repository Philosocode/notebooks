import styled from "styled-components";
import { theme } from "./theme.styles";

export const SPageContent = styled.div`
  padding: ${theme.spacing.base};
  margin-top: ${theme.spacing.lg};
`;

interface ISPageContentCenterProps {
  centerContent?: boolean;
}
export const SPageContentCenter = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: ${theme.spacing.lg} ${theme.spacing.base} 0 ${theme.spacing.base};
  
  ${(props: ISPageContentCenterProps) => props.centerContent && `text-align: center;`}
`;
