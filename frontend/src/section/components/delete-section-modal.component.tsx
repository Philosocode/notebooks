import React, { FC } from "react";
import { useDispatch } from "react-redux";

import { IModalProps } from "../../modal/redux/modal.types";
import { ISection } from "section/redux/section.types";
import { trimString } from "shared/utils/string.util";
import { deleteSection } from "section/redux/section.thunks";

import { ConfirmationModal } from "modal/components/confirmation-modal.component";

interface IProps extends IModalProps {
  materialId: string;
  section: ISection;
}
export const DeleteSectionModal: FC<IProps> = ({ materialId, section, handleClose }) => {
  const dispatch = useDispatch();

  function handleDelete() {
    dispatch(deleteSection({ materialId, section }));

    handleClose();
  }
  
  const trimmedName = trimString(section.name, 50);
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
