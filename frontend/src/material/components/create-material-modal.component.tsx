import React from "react";
import { useDispatch, useSelector } from "react-redux";

// logic
import { IModalProps } from "modal/redux/modal.types";
import { selectMaterialList, selectMaterialTags } from "material/redux/material.selectors";
import { createMaterial } from "../redux/material.thunks";

import { CreateEntityModal } from "../../shared/components/modal/create-entity-modal.component";

export const CreateMaterialModal: React.FC<IModalProps> = ({
  handleClose,
}) => {
  const dispatch = useDispatch();
  const materialTags = useSelector(selectMaterialTags);
  const materials = useSelector(selectMaterialList);

  function handleCreate(name: string, tags: string[]) {
    dispatch(createMaterial({ name, tags }));
  }

  return (
    <CreateEntityModal
      entities={materials}
      entityName="Material"
      entityTags={materialTags}
      createEntity={handleCreate}
      handleClose={handleClose}
    />
  );
}