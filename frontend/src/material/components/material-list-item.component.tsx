import React from "react";
import { useDispatch } from "react-redux";

import { IMaterial } from "material/redux/material.types";
import { showModal } from "modal/redux/modal.slice";
import { deleteTagFromMaterial } from "../redux/material-tag.thunk";

import { EntityListItem } from "../../shared/components/info/entity-list-item.component";

interface IProps {
  material: IMaterial;
}
export const MaterialListItem: React.FC<IProps> = ({ material }) => {
  const dispatch = useDispatch();

  function handleEdit() {
    dispatch(
      showModal({
        modalType: "update-material",
        modalProps: { material },
      })
    );
  }

  function handleDeleteTag(tag: string) {
    dispatch(deleteTagFromMaterial({ tagName: tag, materialId: material.id }));
  }

  return (
    <EntityListItem
      entity={material}
      link={`/materials/${material.id}`}
      updateEntity={handleEdit}
      deleteTag={handleDeleteTag}
    />
  );
};