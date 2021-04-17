import React, { FC } from "react";
import { useDispatch } from "react-redux";

import { IModalProps } from "../../modal/redux/modal.types";
import { trimString } from "shared/utils/string.util";
import { deleteConceptTag } from "concept/redux/concept-tag.thunk";
import { deleteNotebookTag } from "notebook/redux/notebook-tag.thunk";
import { useAppLocation } from "shared/hooks/use-app-location.hook";

import { ConfirmationModal } from "modal/components/confirmation-modal.component";

interface IProps extends IModalProps {
  tagName: string;
}
export const DeleteTagModal: FC<IProps> = ({ tagName, handleClose }) => {
  const dispatch = useDispatch();
  const appLocation = useAppLocation();
  
  const handleDelete = () => {
    appLocation === "concepts"
      ? dispatch(deleteConceptTag(tagName))
      : dispatch(deleteNotebookTag(tagName));

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
