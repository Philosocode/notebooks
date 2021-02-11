import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { selectConceptsWithCurrTag } from "concept/redux/concept.selectors";
import { ConceptListItem } from "concept/components/concept-list-item.component";
import { theme } from "shared/styles/theme.style";

export const ConceptList = () => {
  const conceptsWithTag = useSelector(selectConceptsWithCurrTag);

  if (conceptsWithTag.length === 0) {
    return <SHeading>No concepts found.</SHeading>;
  }

  return (
    <SConceptList>
      {conceptsWithTag.map((concept) => (
        <ConceptListItem concept={concept} key={concept.id} />
      ))}
    </SConceptList>
  );
};

const SHeading = styled.h3`
  font-size: ${theme.fontSizes.md};
  text-align: center;
`;

const SConceptList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;
