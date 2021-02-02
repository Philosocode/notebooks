import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { getConcepts } from "concept/redux/concept.thunks";
import { selectConcepts } from "concept/redux/concept.selectors";
import { showModal } from "modal/redux/modal.slice";

import { ConceptListItem } from "concept/components/concept-list-item.component";
import { FloatingAddButton } from "shared/components/button/floating-add-button.component";
import { TagSidebar } from "concept/components/tag-sidebar.component";
import { theme } from "shared/styles/theme.styles";

export const ConceptsPage = () => {
  const dispatch = useDispatch();
  const concepts = useSelector(selectConcepts);

  useEffect(() => {
    if (concepts.length === 0) {
      dispatch(getConcepts());
    }
  }, [dispatch, concepts.length]);

  const showAddConceptModal = () => {
    dispatch(showModal({ modalType: "create-concept" }))
  }

  return (
    <SPage>
      <TagSidebar />
      <SConceptSection>
        <SHeading>Concepts</SHeading>
        <SConceptList>
          {concepts?.map((concept) => (
            <ConceptListItem concept={concept} key={concept.id} />
          ))}
        </SConceptList>
        <FloatingAddButton handleClick={showAddConceptModal} />
      </SConceptSection>
    </SPage>
  );
};

const SPage = styled.div`
  display: flex;
`;

const SHeading = styled.h1`
  font-size: ${theme.fontSizes.lg};
  padding: ${theme.spacing.md};
`;

const SConceptSection = styled.section`
  width: 100%;
`;

const SConceptList = styled.ul`
  display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  margin: 0 auto;
`;