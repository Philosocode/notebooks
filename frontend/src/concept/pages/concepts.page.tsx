import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { SPageContent } from "../../shared/styles/layout.styles";
import { getConcepts } from "concept/redux/concept.thunks";
import { selectConcepts } from "concept/redux/concept.selectors";
import { ConceptListItem } from "concept/components/concept-list-item.component";

export const ConceptsPage = () => {
  const dispatch = useDispatch();
  const concepts = useSelector(selectConcepts);

  useEffect(() => {
    dispatch(getConcepts());
  }, [dispatch]);

  return (
    <SPageContent>
      <h1>Concepts</h1>
      <SConceptList>
        {concepts?.map((concept) => (
          <ConceptListItem concept={concept} key={concept.id} />
        ))}
      </SConceptList>
    </SPageContent>
  );
};

const SConceptList = styled.ul`
  display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  margin: 0 auto;
`;