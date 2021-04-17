import React from "react";
import { useDispatch } from "react-redux";

import { ISection } from "section/redux/section.types";
import { IModalProps } from "modal/redux/modal.types";
import { updateSection } from "section/redux/section.thunks";

import { UpdateNamedEntityModal } from "shared/components/modal/update-named-entity.modal";

interface IProps extends IModalProps {
  materialId: string;
  section: ISection;
}
export const UpdateSectionModal: React.FC<IProps> = ({ handleClose, materialId, section }) => {
  const dispatch = useDispatch();

  function handleUpdate(newName: string) {
    dispatch(
      updateSection({
        materialId,
        sectionId: section.id,
        name: newName,
      })
    );
  }

  return (
    <UpdateNamedEntityModal
      currentName={section.name}
      entityName="Section"
      handleClose={handleClose}
      updateEntity={handleUpdate}
    />
  );
};
