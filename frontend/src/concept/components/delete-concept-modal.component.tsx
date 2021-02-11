import React, { FC } from "react";
import { useDispatch } from "react-redux";

import { IConcept } from "concept/redux/concept.types";
import { IModalProps } from "../../modal/redux/modal.types";
import { deleteConcept } from "concept/redux/concept.thunks";
import { ConfirmationModal } from "modal/components/confirmation-modal.component";
import { trimString } from "shared/utils/string.util";

interface IProps extends IModalProps {
  concept: IConcept;
}
export const DeleteConceptModal: FC<IProps> = ({ concept, handleClose }) => {
  const dispatch = useDispatch();
  
  function handleDelete() {
    dispatch(deleteConcept(concept.id));
    handleClose();
  }
  
  const trimmedName = trimString(concept.name, 50);
  const modalText = "You are about to delete this concept: " + trimmedName;

  return (
    <ConfirmationModal
      confirmButtonText="Delete"
      handleClose={handleClose}
      handleConfirm={handleDelete}
      title="Delete Concept"
      text={modalText}
      isWarning
    />
  );
};
