import React, { FC } from "react";

import { IModalProps } from "modal/redux/modal.types";
import { ConfirmationModal } from "modal/components/confirmation-modal.component";
import { trimString } from "shared/utils/string.util";

interface IProps extends IModalProps {
  entityName: string;
  handleDelete: () => void
}
export const DeleteEntityModal: FC<IProps> = ({ entityName, handleClose, handleDelete }) => {
  const trimmedName = trimString(entityName, 50);
  const modalText = `You are about to delete this ${entityName.toLowerCase()}: ` + trimmedName;

  return (
    <ConfirmationModal
      confirmButtonText="Delete"
      handleClose={handleClose}
      handleConfirm={handleDelete}
      title={`Delete ${entityName}`}
      text={modalText}
      isWarning
    />
  );
};
