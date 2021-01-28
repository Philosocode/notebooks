import { IConcept } from "concept/redux/concept.types";
import React, { FC } from "react";
import { theme } from "shared/styles/theme.styles";
import styled from "styled-components";

interface IProps {
  concept: IConcept;
}
export const ConceptListItem: FC<IProps> = ({ concept }) => (
  <SContainer>
    <SHeadingId>{[concept.id]}</SHeadingId>
    <SConceptName>{concept.name}</SConceptName>
  </SContainer>
);

const SHeadingId = styled.h4`
  color: ${theme.colors.gray[400]};
  font-size: ${theme.fontSizes.xs};
  font-weight: 400;
`;

const SConceptName = styled.h3`
  font-size: ${theme.fontSizes.md};
  margin-top: ${theme.spacing.xs};
`;

const SContainer = styled.li`
  border: 1px solid ${theme.colors.gray[200]};
  padding: ${theme.spacing.md};
  width: 100%;
`;