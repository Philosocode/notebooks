import styled from "styled-components";

import { theme } from "shared/styles/theme.style";
import { SButtonGreen } from "shared/styles/button.style";
import { SHeadingSubSubtitle } from "shared/styles/typography.style";

export const SWorkflowHeading = styled(SHeadingSubSubtitle)`
  margin-top: ${theme.spacing.base};
`;

export const SButton = styled(SButtonGreen)`
  margin-top: ${theme.spacing.base};a
`;