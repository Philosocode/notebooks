import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { TAppState } from "shared/redux/store";
import { hideModal } from "modal/redux/modal.slice";
import { TModalType } from "../redux/modal.types";
import { AddConcept } from "../../concept/components/add-concept.component";
import { ModalWrapper } from "./modal-wrapper.component";
import { DeleteConcept } from "concept/components/delete-concept.component";

type TModalComponents = {
  [key in TModalType]: React.FC<any>;
};

const MODAL_COMPONENTS: TModalComponents = {
  "add-concept": AddConcept,
  "delete-concept": DeleteConcept,
};

export const ModalRoot = () => {
  const modalState = useSelector(((state: TAppState) => state.modal));
  const { modalType, modalShowing, modalProps } = modalState;
  const dispatch = useDispatch();

  function handleClose() {
    dispatch(hideModal());
  };

  if (!modalType) return null;

  const ModalComponent = MODAL_COMPONENTS[modalType];
  return (
    <ModalWrapper isShowing={modalShowing} handleClose={handleClose}>
      <ModalComponent handleClose={handleClose} {...modalProps} />
    </ModalWrapper>
  )
};