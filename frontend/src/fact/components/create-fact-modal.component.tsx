import React from "react";
import { useDispatch } from "react-redux";

import { IModalProps } from "modal/redux/modal.types";
import { createFact } from "../redux/fact.thunks";
import { CreateContentModal } from "../../modal/components/create-content-modal.component";
import { ModalWrapper } from "../../modal/components/modal-wrapper.component";

interface IProps extends IModalProps {
  partId: string;
}
export const CreateFactModal: React.FC<IProps> = ({
  handleClose,
  partId,
}) => {
  const dispatch = useDispatch();

  function handleCreate(title: string, content: string) {
    dispatch(createFact({
      partId,
      initialValues: { question: title, answer: content }
    }));
  }

  return (
    <CreateContentModal
      entityName="Flashcard"
      handleCreate={handleCreate}
      handleClose={handleClose}
      placeholderTitle="Question"
      placeholderContent="Answer"
    />
  );
};
