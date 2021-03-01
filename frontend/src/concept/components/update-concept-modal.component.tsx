import React from "react";
import { useDispatch, useSelector } from "react-redux";

// logic
import { IConcept } from "../redux/concept.types";
import { IModalProps } from "modal/redux/modal.types";
import { showModal } from "modal/redux/modal.slice";
import { updateConcept } from "../redux/concept.thunks";
import { selectConcepts, selectConceptTags } from "../redux/concept.selectors";

import { UpdateEntityModal } from "../../shared/components/modal/update-entity-modal.component";

interface IProps extends IModalProps {
  concept: IConcept;
}
export const UpdateConceptModal: React.FC<IProps> = ({ concept, handleClose }) => {
  const dispatch = useDispatch();
  const concepts = useSelector(selectConcepts);
  const conceptTags = useSelector(selectConceptTags);

  function handleUpdate(name: string, tags: string[]) {
    dispatch(updateConcept({ id: concept.id, name, tags }));
  }

  function showDeleteModal() {
    dispatch(showModal({
      modalType: "delete-concept",
      modalProps: { concept }
    }));
  }

  return (
    <UpdateEntityModal
      currentEntity={concept}
      entities={concepts}
      entityName="Concept"
      entityTags={conceptTags}
      updateEntity={handleUpdate}
      deleteEntity={showDeleteModal}
      handleClose={handleClose}
    />
  );
};