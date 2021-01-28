import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";

import { SPageContent } from "../../shared/styles/layout.styles";
import { showModal } from "modal/redux/modal.slice";
import { getConcepts } from "concept/redux/concept.thunks";
import { selectConcepts } from "concept/redux/concept.selectors";
import { ConceptListItem } from "concept/components/concept-list-item.component";
import styled from "styled-components";
// import { showAndHideAlert } from "alert/redux/alert.thunks";

export const ConceptsPage = () => {
  const dispatch = useDispatch();
  const concepts = useSelector(selectConcepts);

  useEffect(() => {
    dispatch(getConcepts());
  }, [dispatch]);

  function handleClick() {
    dispatch(
      showModal({
        modalType: "add-concept",
      })
    );

    // dispatch(showAndHideAlert({
    //   message: "Created Concept",
    //   type: "success"
    // }))
  }

  return (
    <SPageContent>
      <h1>Concepts</h1>
      <FontAwesomeIcon icon="tag" onClick={handleClick} />
      <SConceptList>
        {concepts?.map((concept) => (
          <ConceptListItem concept={concept} />
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