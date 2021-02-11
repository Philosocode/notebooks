import React, { FC } from "react";
import { useDispatch } from "react-redux";

import { IModalProps } from "../../modal/redux/modal.types";
import { ConfirmationModal } from "modal/components/confirmation-modal.component";
import { trimString } from "shared/utils/string.util";
import { deleteConceptTag } from "concept/redux/concept-tag.thunk";

interface IProps extends IModalProps {
  tagName: string;
}
export const DeleteTagModal: FC<IProps> = ({ tagName, handleClose }) => {
  const dispatch = useDispatch();
  
  const handleDelete = () => {
    dispatch(deleteConceptTag(tagName));
    handleClose();
  }
  
  const trimmedName = trimString(tagName, 50);
  const modalText = "You are about to delete this tag: " + trimmedName;

  return (
    <ConfirmationModal
      confirmButtonText="Delete"
      handleClose={handleClose}
      handleConfirm={handleDelete}
      title="Delete Tag"
      text={modalText}
      isWarning
    />
  );
};
