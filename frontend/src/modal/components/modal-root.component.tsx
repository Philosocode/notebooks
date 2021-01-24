import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { TAppState } from "redux/store";
import { hideModal } from "modal/redux/modal.slice";
import { TModalType } from "../redux/modal.types";
import { AddConcept } from "../../concepts/components/add-concept.component";
import { ModalWrapper } from "./modal-wrapper.component";

type TModalComponents = {
  [key in TModalType]: React.FC;
};

const MODAL_COMPONENTS: TModalComponents = {
  "add-concept": AddConcept
};

export const ModalRoot = () => {
  const modalState = useSelector(((state: TAppState) => state.modal));
  const { modalType, modalShowing, modalProps } = modalState;
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch(hideModal());
  }, []);

  if (!modalType) return null;

  const ModalComponent = MODAL_COMPONENTS[modalType];
  return (
    <ModalWrapper isShowing={modalShowing} handleClose={handleClose}>
      <ModalComponent {...modalProps} />
    </ModalWrapper>
  )
};