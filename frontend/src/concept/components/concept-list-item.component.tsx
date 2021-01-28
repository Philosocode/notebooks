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
      <SHeadingId>{[concept.id]}</SHeadingId>

      <SConceptNameContainer>
        <SConceptName>{concept.name}</SConceptName>
        <SEditIcon icon="pencil-alt" />
      </SConceptNameContainer>

    </SContainer>
  );
};

const SHeadingId = styled.h4`
  color: ${theme.colors.gray[400]};
  font-size: ${theme.fontSizes.xs};
  font-weight: 400;
`;

const SConceptName = styled.h3`
  font-size: ${theme.fontSizes.md};
`;

const SEditIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  font-size: 2rem;
  position: absolute;
    left: -3rem;
    top: 4px;
  opacity: 0;
  transition: opacity ${theme.animations.transitionAppend};
  
  &:hover {
    color: ${theme.colors.green};
  }
`;

const SConceptNameContainer = styled.div`
  position: relative;
`;

const SContainer = styled.li`
  border: 1px solid ${theme.colors.gray[200]};
  padding: ${theme.spacing.md};
  position: relative;
  width: 100%;

  &:hover ${SEditIcon} {
    opacity: 1;
  }
`;