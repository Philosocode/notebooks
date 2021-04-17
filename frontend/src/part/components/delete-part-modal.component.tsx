import React, { FC } from "react";
import { useDispatch } from "react-redux";

import { IModalProps } from "../../modal/redux/modal.types";
import { IPart } from "part/redux/part.types";
import { trimString } from "shared/utils/string.util";
import { deletePart } from "part/redux/part.thunks";

import { ConfirmationModal } from "modal/components/confirmation-modal.component";

interface IProps extends IModalProps {
  materialId: string;
  part: IPart;
}
export const DeletePartModal: FC<IProps> = ({ materialId, part, handleClose }) => {
  const dispatch = useDispatch();

  function handleDelete() {
    dispatch(deletePart({ materialId, part }));

    handleClose();
  }
  
  const trimmedName = trimString(part.name, 50);
  const modalText = "You are about to delete this note: " + trimmedName;

  return (
    <ConfirmationModal
      confirmButtonText="Delete"
      handleClose={handleClose}
      handleConfirm={handleDelete}
      title="Delete Section"
      text={modalText}
      isWarning
    />
  );
};
