import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { IPart } from "../redux/part.types";

import { DetailHeader } from "shared/components/info/detail-header.component";
import { ModalWrapper } from "modal/components/modal-wrapper.component";
import { UpdateNamedEntityModal } from "shared/components/modal/update-named-entity.modal";
import { updatePart } from "../redux/part.thunks";
import { useToggle } from "../../shared/hooks/use-toggle.hook";
import styled from "styled-components";
import { theme } from "../../shared/styles/theme.style";

interface IProps {
  part: IPart;
}
export const PartDetailHeader: React.FC<IProps> = ({ part }) => {
  const dispatch = useDispatch();
  const [modalShowing, toggleModalShowing] = useToggle(false);

  function handleUpdate(newName: string) {
    dispatch(updatePart({
      partId: part.id,
      materialId: part.material_id,
      name: newName
    }));
  }

  return (
    <>
      <DetailHeader
        name={part.name}
        updatedAt={part.updated_at}
        showUpdateModal={toggleModalShowing}
        topSlot={<SLink to={`/materials/${part.material_id}`}>Back to Material</SLink>}
      />
      <ModalWrapper isShowing={modalShowing} handleClose={toggleModalShowing}>
        <UpdateNamedEntityModal
          currentName={part.name}
          entityName="Part"
          updateEntity={handleUpdate}
          handleClose={toggleModalShowing}
        />
      </ModalWrapper>
    </>
  )
}

const SLink = styled(Link)`
  text-decoration: underline;
  
  &:hover {
    color: ${theme.colors.green[400]};
  }
`;