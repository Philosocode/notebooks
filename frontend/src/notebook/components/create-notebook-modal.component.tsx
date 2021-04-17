import React from "react";
import { useDispatch, useSelector } from "react-redux";

// logic
import { IModalProps } from "modal/redux/modal.types";
import { selectNotebookList, selectNotebookTags } from "notebook/redux/notebook.selectors";
import { createNotebook } from "../redux/notebook.thunks";

import { CreateEntityModal } from "../../shared/components/modal/create-entity-modal.component";

export const CreateNotebookModal: React.FC<IModalProps> = ({
  handleClose,
}) => {
  const dispatch = useDispatch();
  const notebookTags = useSelector(selectNotebookTags);
  const notebooks = useSelector(selectNotebookList);

  function handleCreate(name: string, tags: string[]) {
    dispatch(createNotebook({ name, tags }));
  }

  return (
    <CreateEntityModal
      entities={notebooks}
      entityName="Notebook"
      entityTags={notebookTags}
      createEntity={handleCreate}
      handleClose={handleClose}
    />
  );
}