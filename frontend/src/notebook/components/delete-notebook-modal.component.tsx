import React, { FC } from "react";
import { useDispatch } from "react-redux";

import { INotebook } from "notebook/redux/notebook.types";
import { IModalProps } from "../../modal/redux/modal.types";
import { deleteNotebook } from "notebook/redux/notebook.thunks";
import { trimString } from "shared/utils/string.util";

import { ConfirmationModal } from "modal/components/confirmation-modal.component";
import { useHistory } from "react-router-dom";

interface IProps extends IModalProps {
  notebook: INotebook;
}
export const DeleteNotebookModal: FC<IProps> = ({ notebook, handleClose }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  function handleDelete() {
    dispatch(deleteNotebook(notebook.id));
    handleClose();

    history.replace("/notebooks");
  }

  const trimmedName = trimString(notebook.name, 50);
  const modalText = "You are about to delete this notebook: " + trimmedName;

  return (
    <ConfirmationModal
      confirmButtonText="Delete"
      handleClose={handleClose}
      handleConfirm={handleDelete}
      title="Delete Notebook"
      text={modalText}
      isWarning
    />
  );
};
