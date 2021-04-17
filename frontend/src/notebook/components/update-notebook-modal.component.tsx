import React from "react";
import { useDispatch, useSelector } from "react-redux";

// logic
import { INotebook } from "../redux/notebook.types";
import { IModalProps } from "modal/redux/modal.types";
import { showModal } from "modal/redux/modal.slice";
import { updateNotebook } from "../redux/notebook.thunks";
import { selectNotebookList, selectNotebookTags } from "../redux/notebook.selectors";

import { UpdateEntityModal } from "../../shared/components/modal/update-entity-modal.component";

interface IProps extends IModalProps {
  notebook: INotebook;
}
export const UpdateNotebookModal: React.FC<IProps> = ({ notebook, handleClose }) => {
  const dispatch = useDispatch();
  const notebooks = useSelector(selectNotebookList);
  const notebookTags = useSelector(selectNotebookTags);

  function handleUpdate(name: string, tags: string[]) {
    dispatch(updateNotebook({ id: notebook.id, name, tags }));
  }

  function showDeleteModal() {
    dispatch(showModal({
      modalType: "delete-notebook",
      modalProps: { notebook }
    }));
  }

  return (
    <UpdateEntityModal
      currentEntity={notebook}
      entities={notebooks}
      entityName="Notebook"
      entityTags={notebookTags}
      updateEntity={handleUpdate}
      deleteEntity={showDeleteModal}
      handleClose={handleClose}
    />
  );
};