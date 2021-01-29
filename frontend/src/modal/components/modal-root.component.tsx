import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { TAppState } from "shared/redux/store";
import { hideModal } from "modal/redux/modal.slice";
import { TModalType } from "../redux/modal.types";
import { CreateConcept } from "../../concept/components/create-concept.component";
import { ModalWrapper } from "./modal-wrapper.component";
import { DeleteConcept } from "concept/components/delete-concept.component";
import { UpdateConcept } from "../../concept/components/update-concept.component";

type TModalComponents = {
  [key in TModalType]: React.FC<any>;
};

const MODAL_COMPONENTS: TModalComponents = {
  "create-concept": CreateConcept,
  "update-concept": UpdateConcept,
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