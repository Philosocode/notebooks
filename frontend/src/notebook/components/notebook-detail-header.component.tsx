import React from "react";
import { useDispatch } from "react-redux";

import { INotebook } from "notebook/redux/notebook.types";
import { showModal } from "modal/redux/modal.slice";

import { deleteTagFromNotebook } from "notebook/redux/notebook-tag.thunk";
import { TagList } from "../../tag/components/tag-list.component";
import { DetailHeader } from "../../shared/components/info/detail-header.component";

interface IProps {
  material: INotebook;
}
export const NotebookDetailHeader: React.FC<IProps> = ({ material }) => {
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
    dispatch(deleteTagFromNotebook({ tagName: tag, materialId: material.id }));
  }

  return (
    <DetailHeader
      name={material.name}
      updatedAt={material.updated_at}
      showUpdateModal={showUpdateModal}
      bottomSlot={<TagList tags={material.tags} handleDeleteTag={handleDeleteTag} />}
    />
  );
}