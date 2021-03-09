import React from "react";
import { useDispatch, useSelector } from "react-redux";

// logic
import { IMaterial } from "../redux/material.types";
import { IModalProps } from "modal/redux/modal.types";
import { showModal } from "modal/redux/modal.slice";
import { updateMaterial } from "../redux/material.thunks";
import { selectMaterialList, selectMaterialTags } from "../redux/material.selectors";

import { UpdateEntityModal } from "../../shared/components/modal/update-entity-modal.component";

interface IProps extends IModalProps {
  material: IMaterial;
}
export const UpdateMaterialModal: React.FC<IProps> = ({ material, handleClose }) => {
  const dispatch = useDispatch();
  const materials = useSelector(selectMaterialList);
  const materialTags = useSelector(selectMaterialTags);

  function handleUpdate(name: string, tags: string[]) {
    dispatch(updateMaterial({ id: material.id, name, tags }));
  }

  function showDeleteModal() {
    dispatch(showModal({
      modalType: "delete-material",
      modalProps: { material }
    }));
  }

  return (
    <UpdateEntityModal
      currentEntity={material}
      entities={materials}
      entityName="Material"
      entityTags={materialTags}
      updateEntity={handleUpdate}
      deleteEntity={showDeleteModal}
      handleClose={handleClose}
    />
  );
};