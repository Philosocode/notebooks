import React from "react";
import { useDispatch } from "react-redux";

import { IMaterial } from "material/redux/material.types";
import { showModal } from "modal/redux/modal.slice";

import { DetailHeader } from "shared/components/info/detail-header.component";
import { deleteTagFromMaterial } from "material/redux/material-tag.thunk";

interface IProps {
  material: IMaterial;
}
export const MaterialDetailHeader: React.FC<IProps> = ({ material }) => {
  const dispatch = useDispatch();
  function showUpdateModal() {
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
    <DetailHeader
      name={material.name}
      updatedAt={material.updated_at}
      tags={material.tags}
      showUpdateModal={showUpdateModal}
      handleDeleteTag={handleDeleteTag}
    />
  );
}