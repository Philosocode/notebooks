import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { TAppState } from "shared/redux/store";
import { hideModal } from "modal/redux/modal.slice";
import { TModalType } from "../redux/modal.types";
import { CreateConceptModal } from "concept/components/create-concept-modal.component";
import { UpdateConceptModal } from "concept/components/update-concept-modal.component";
import { ModalWrapper } from "./modal-wrapper.component";
import { DeleteConceptModal } from "concept/components/delete-concept-modal.component";
import { ConfirmationModal } from "./confirmation-modal.component";
import { DeleteTagModal } from "tag/components/delete-tag-modal.component";
import { UpdateTagModal } from "tag/components/update-tag-modal.component";
import { CreateConceptLinkModal } from "../../concept/components/create-concept-link-modal.component";

type TModalComponents = {
  [key in TModalType]: React.FC<any>;
};

const MODAL_COMPONENTS: TModalComponents = {
  "create-concept": CreateConceptModal,
  "update-concept": UpdateConceptModal,
  "delete-concept": DeleteConceptModal,
  "delete-tag": DeleteTagModal,
  "update-tag": UpdateTagModal,
  "confirmation": ConfirmationModal,
  "create-concept-link": CreateConceptLinkModal,
};

export const ModalRoot = () => {
  const modalState = useSelector(((state: TAppState) => state.modal));
  const { modalType, modalShowing, modalProps } = modalState;
  const dispatch = useDispatch();

  function handleClose() {
    dispatch(hideModal());
  };

  function getModalComponent() {
    if (!modalType) return null;

    const ModalComponent = MODAL_COMPONENTS[modalType];
    return (
      <ModalComponent handleClose={handleClose} {...modalProps} />
    );
  }

  return (
    <ModalWrapper isShowing={modalShowing} handleClose={handleClose}>
      {getModalComponent()}
    </ModalWrapper>
  )
};