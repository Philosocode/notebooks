import styled from "styled-components";
import AutosizeTextarea from "react-textarea-autosize";

import { theme } from "shared/styles/theme.style";

export const STextareaBase = styled(AutosizeTextarea)`
  background: transparent;
  border: 1px solid ${theme.colors.gray[300]};
  padding: 0;
  resize: none;
  overflow: hidden;
  width: 100%;

  &:active,
  &:focus {
    border-color: ${theme.colors.gray[800]};
    outline: none;
  }
`;

export const SHookTitleTextarea = styled(STextareaBase)`
  border: none;
  border-bottom: 1px solid ${theme.colors.gray[300]};
  font-size: ${theme.fontSizes.basePlus};
  padding: 0;
  padding-bottom: ${theme.spacing.xs};
`;

export const SHookContentTextarea = styled(STextareaBase)`
  margin-top: ${theme.spacing.base};
  padding: ${theme.spacing.sm};
`;
