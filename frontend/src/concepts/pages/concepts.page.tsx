import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";

import { SPageContent } from "../../shared/styles/layout.styles";
import { showModal } from "modal/redux/modal.slice";

export const ConceptsPage = () => {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(showModal({
      modalType: "add-concept"
    }));
  }

  return (
    <SPageContent>
      <h1>Concepts</h1>
      <FontAwesomeIcon icon="tag" onClick={handleClick} />
    </SPageContent>
  );
};