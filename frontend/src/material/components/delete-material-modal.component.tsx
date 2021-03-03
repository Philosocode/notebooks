import React, { FC } from "react";
import { useDispatch } from "react-redux";

import { IMaterial } from "material/redux/material.types";
import { IModalProps } from "../../modal/redux/modal.types";
import { deleteMaterial } from "material/redux/material.thunks";
import { trimString } from "shared/utils/string.util";

import { ConfirmationModal } from "modal/components/confirmation-modal.component";
import { useHistory } from "react-router-dom";

interface IProps extends IModalProps {
  material: IMaterial;
}
export const DeleteMaterialModal: FC<IProps> = ({ material, handleClose }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  function handleDelete() {
    dispatch(deleteMaterial(material.id));
    handleClose();

    history.replace("/materials");
  }

  const trimmedName = trimString(material.name, 50);
  const modalText = "You are about to delete this material: " + trimmedName;

  return (
    <ConfirmationModal
      confirmButtonText="Delete"
      handleClose={handleClose}
      handleConfirm={handleDelete}
      title="Delete Material"
      text={modalText}
      isWarning
    />
  );
};
