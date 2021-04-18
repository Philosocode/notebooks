import React from "react";
import { useDispatch } from "react-redux";

import { INotebook } from "notebook/redux/notebook.types";
import { showModal } from "modal/redux/modal.slice";

import { deleteTagFromNotebook } from "notebook/redux/notebook-tag.thunk";
import { TagList } from "../../tag/components/tag-list.component";
import { DetailHeader } from "../../shared/components/info/detail-header.component";

interface IProps {
  notebook: INotebook;
}
export const NotebookDetailHeader: React.FC<IProps> = ({ notebook }) => {
  const dispatch = useDispatch();
  function showUpdateModal() {
    dispatch(
      showModal({
        modalType: "update-notebook",
        modalProps: { notebook },
      })
    );
  }

  function handleDeleteTag(tag: string) {
    dispatch(deleteTagFromNotebook({ tagName: tag, notebookId: notebook.id }));
  }

  return (
    <DetailHeader
      name={notebook.name}
      updatedAt={notebook.updated_at}
      showUpdateModal={showUpdateModal}
      bottomSlot={<TagList tags={notebook.tags} handleDeleteTag={handleDeleteTag} />}
    />
  );
}