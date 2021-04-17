import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { TAppState } from "shared/redux/store";
import { hideModal } from "modal/redux/modal.slice";
import { TModalType } from "../redux/modal.types";
import { ModalWrapper } from "./modal-wrapper.component";

import { CreateConceptModal } from "concept/components/create-concept-modal.component";
import { UpdateConceptModal } from "concept/components/update-concept-modal.component";
import { DeleteConceptModal } from "concept/components/delete-concept-modal.component";

import { CreateMaterialModal } from "material/components/create-material-modal.component";
import { UpdateMaterialModal } from "material/components/update-material-modal.component";
import { DeleteMaterialModal } from "../../material/components/delete-material-modal.component";

import { ConfirmationModal } from "./confirmation-modal.component";

import { DeleteTagModal } from "tag/components/delete-tag-modal.component";
import { UpdateTagModal } from "tag/components/update-tag-modal.component";

import { CreateNamedEntityModal } from "shared/components/modal/create-named-entity-modal.component";
import { UpdateNamedEntityModal } from "shared/components/modal/update-named-entity.modal";
import { UpdateSectionModal } from "../../section/components/update-section-modal.component";
import { DeleteSectionModal } from "../../section/components/delete-section-modal.component";
import { CreateFlashcardModal } from "../../flashcard/components/create-flashcard-modal.component";

type TModalComponents = {
  [key in TModalType]: React.FC<any>;
};

const MODAL_COMPONENTS: TModalComponents = {
  // Concept
  "create-concept": CreateConceptModal,
  "update-concept": UpdateConceptModal,
  "delete-concept": DeleteConceptModal,

  // Material
  "create-material": CreateMaterialModal,
  "update-material": UpdateMaterialModal,
  "delete-material": DeleteMaterialModal,

  // Section
  "update-section": UpdateSectionModal,
  "delete-section": DeleteSectionModal,

  // Flashcard
  "create-flashcard": CreateFlashcardModal,

  // Tag
  "delete-tag": DeleteTagModal,
  "update-tag": UpdateTagModal,

  // Other
  "create-named-entity": CreateNamedEntityModal,
  "update-named-entity": UpdateNamedEntityModal,
  "confirmation": ConfirmationModal,
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