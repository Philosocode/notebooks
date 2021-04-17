import React from "react";
import { useDispatch } from "react-redux";

import { INotebook } from "notebook/redux/notebook.types";
import { showModal } from "modal/redux/modal.slice";
import { deleteTagFromNotebook } from "../redux/notebook-tag.thunk";

import { EntityListItem } from "../../shared/components/info/entity-list-item.component";

interface IProps {
  notebook: INotebook;
}
export const NotebookListItem: React.FC<IProps> = ({ notebook }) => {
  const dispatch = useDispatch();

  function handleEdit() {
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
    <EntityListItem
      entity={notebook}
      link={`/notebooks/${notebook.id}`}
      updateEntity={handleEdit}
      deleteTag={handleDeleteTag}
    />
  );
};