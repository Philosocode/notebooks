import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { TAppState } from "shared/redux/store";
import { hideModal } from "modal/redux/modal.slice";
import { TModalType } from "../redux/modal.types";
import { CreateUpdateConcept } from "concept/components/create-update-concept.component";
import { ModalWrapper } from "./modal-wrapper.component";
import { DeleteConcept } from "concept/components/delete-concept.component";

type TModalComponents = {
  [key in TModalType]: React.FC<any>;
};

const MODAL_COMPONENTS: TModalComponents = {
  "create-update-concept": CreateUpdateConcept,
  "delete-concept": DeleteConcept,
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