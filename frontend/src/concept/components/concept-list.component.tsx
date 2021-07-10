import React from "react";
import styled from "styled-components";

// logic
import { IConcept } from "../redux/concept.types";

// components
import { ConceptListItem } from "concept/components/concept-list-item.component";
import { theme } from "../../shared/styles/theme.style";

interface IProps {
  concepts: IConcept[];
}
export const ConceptList: React.FC<IProps> = ({ concepts }) => {
  return (
    <SConceptList>
      {concepts.map((concept) => (
        <ConceptListItem concept={concept} key={concept.id} />
      ))}
    </SConceptList>
  );
};

const SConceptList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding-bottom: ${theme.spacing.listBottomPadding};
`;
