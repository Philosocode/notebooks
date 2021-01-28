import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import { IConcept } from "concept/redux/concept.types";
import { theme } from "shared/styles/theme.styles";

interface IProps {
  concept: IConcept;
}

export const ConceptListItem: FC<IProps> = ({ concept }) => {
  return (
    <SContainer>
      <div>
        <SHeadingId>{[concept.id]}</SHeadingId>
        <SConceptName>{concept.name}</SConceptName>
      </div>
    </SContainer>
  );
};

const SContainer = styled.li`
  border: 1px solid ${theme.colors.gray[200]};
  display: flex;
  align-items: space-between;
  justify-content: space-between;

  padding: ${theme.spacing.md};
  position: relative;
  width: 100%;
`;

const SHeadingId = styled.h4`
  color: ${theme.colors.gray[400]};
  font-size: ${theme.fontSizes.xs};
  font-weight: 400;
`;

const SConceptName = styled.h3`
  font-size: ${theme.fontSizes.md};
`;