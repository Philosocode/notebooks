import React from "react";
import { useDispatch, useSelector } from "react-redux";

// logic
import { IModalProps } from "modal/redux/modal.types";
import { createConcept } from "concept/redux/concept.thunks";
import { selectConceptList, selectConceptTags } from "concept/redux/concept.selectors";

import { CreateEntityModal } from "../../shared/components/modal/create-entity-modal.component";

export const CreateConceptModal: React.FC<IModalProps> = ({
  handleClose,
}) => {
  const dispatch = useDispatch();
  const conceptTags = useSelector(selectConceptTags);
  const concepts = useSelector(selectConceptList);

  function handleCreate(name: string, tags: string[]) {
    dispatch(createConcept({ name, tags }));
  }

  return (
    <CreateEntityModal
      entities={concepts}
      entityName="Concept"
      entityTags={conceptTags}
      createEntity={handleCreate}
      handleClose={handleClose}
    />
  );
};
