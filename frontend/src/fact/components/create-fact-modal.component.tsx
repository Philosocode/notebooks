import React from "react";
import { useDispatch } from "react-redux";

import { IModalProps } from "modal/redux/modal.types";
import { createFact } from "../redux/fact.thunks";
import { CreateContentModal } from "../../modal/components/create-content-modal.component";

interface IProps extends IModalProps {
  sectionId: string;
}
export const CreateFactModal: React.FC<IProps> = ({
  handleClose,
  sectionId,
}) => {
  const dispatch = useDispatch();

  function handleCreate(title: string, content: string) {
    dispatch(createFact({
      sectionId,
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
