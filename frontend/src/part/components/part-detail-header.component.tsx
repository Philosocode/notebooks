import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { IPart } from "../redux/part.types";

import { DetailHeader } from "shared/components/info/detail-header.component";
import { ModalWrapper } from "modal/components/modal-wrapper.component";
import { UpdateNamedEntityModal } from "shared/components/modal/update-named-entity.modal";
import { updatePart } from "../redux/part.thunks";

interface IProps {
  part: IPart;
}
export const PartDetailHeader: React.FC<IProps> = ({ part }) => {
  const dispatch = useDispatch();
  const [modalShowing, setModalShowing] = useState(false);

  function showModal() {
    setModalShowing(true);
  }

  function hideModal() {
    setModalShowing(false);
  }

  function handleUpdate(newName: string) {
    dispatch(updatePart({
      partId: part.id,
      materialId: part.material_id,
      name: newName
    }));

    setModalShowing(false);
  }

  return (
    <>
      <DetailHeader
        name={part.name}
        updatedAt={part.updated_at}
        showUpdateModal={showModal}
        topSlot={<h1>Hello world</h1>}
      />
      <ModalWrapper isShowing={modalShowing} handleClose={hideModal}>
        <UpdateNamedEntityModal
          currentName={part.name}
          entityName="Part"
          updateEntity={handleUpdate}
          handleClose={hideModal}
        />
      </ModalWrapper>
    </>
  )
}