import React from "react";

import { SHeadingSubtitle } from "shared/styles/typography.styles";
import { SButtonGreen } from "shared/styles/button.styles";
import styled from "styled-components";
import { theme } from "shared/styles/theme.styles";

export const AddConcept = () => (
  <SContent>
    <SHeadingSubtitle>Add Concept</SHeadingSubtitle>
    <p>Time to add a concept.</p>
    <SButtonGreen>Add Concept</SButtonGreen>
  </SContent>
);

const SContent = styled.div`
  & * + * {
    margin-top: ${theme.spacing.base};
  }
`;