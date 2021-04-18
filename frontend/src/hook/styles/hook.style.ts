import styled from "styled-components";

import { theme } from "shared/styles/theme.style";
import { STextareaBase } from "../../shared/styles/form.style";

export const SHookNameTextarea = styled(STextareaBase)`
  border: none;
  border-bottom: 1px solid ${theme.colors.gray[300]};
  padding: 0;
  padding-bottom: ${theme.spacing.xs};
  
  ${theme.media.tabLand} {
    font-size: ${theme.fontSizes.basePlus};
  }
`;

export const SHookContentTextarea = styled(STextareaBase)`
  margin-top: ${theme.spacing.base};
  padding: ${theme.spacing.xs};
  
  ${theme.media.tabLand} {
    padding: ${theme.spacing.sm};
  }
`;
