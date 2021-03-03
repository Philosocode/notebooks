import React from "react";
import { useDispatch } from "react-redux";

import { IPart } from "part/redux/part.types";
import { IModalProps } from "modal/redux/modal.types";

import { UpdateNamedEntityModal } from "shared/components/modal/update-named-entity.modal";
import { updatePart } from "part/redux/part.thunks";

interface IProps extends IModalProps {
  materialId: string;
  part: IPart;
}
export const UpdatePartModal: React.FC<IProps> = ({ handleClose, materialId, part }) => {
  const dispatch = useDispatch();

  function handleUpdate(newName: string) {
    dispatch(
      updatePart({
        materialId,
        partId: part.id,
        name: newName,
      })
    );
  }

  return (
    <UpdateNamedEntityModal
      currentName={part.name}
      entityName="Part"
      handleClose={handleClose}
      updateEntity={handleUpdate}
    />
  );
};
