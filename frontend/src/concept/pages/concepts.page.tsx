import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { SPageContent } from "../../shared/styles/layout.styles";
import { getConceptsThunk } from "concept/redux/concept.thunks";
import { selectConcepts } from "concept/redux/concept.selectors";
import { ConceptListItem } from "concept/components/concept-list-item.component";
import { FloatingAddButton } from "shared/components/floating-add-button.component";
import { showModal } from "modal/redux/modal.slice";

export const ConceptsPage = () => {
  const dispatch = useDispatch();
  const concepts = useSelector(selectConcepts);

  useEffect(() => {
    if (concepts.length === 0) {
      dispatch(getConceptsThunk());
    }
  }, [dispatch, concepts.length]);

  const showAddConceptModal = () => {
    dispatch(showModal({ modalType: "create-concept" }))
  }

  return (
    <SPageContent>
      <h1>Concepts</h1>
      <SConceptList>
        {concepts?.map((concept) => (
          <ConceptListItem concept={concept} key={concept.id} />
        ))}
      </SConceptList>
      <FloatingAddButton handleClick={showAddConceptModal} />
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