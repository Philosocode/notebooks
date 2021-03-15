import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

import { IPart } from "part/redux/part.types";

import { theme } from "shared/styles/theme.style";
import { showModal } from "modal/redux/modal.slice";
import { PartListItemMenu } from "./part-list-item-menu.component";

interface IProps {
  index: number;
  materialId: string;
  part: IPart;
}
export const PartListItem: React.FC<IProps> = ({ index, materialId, part }) => {
  const dispatch = useDispatch();

  function handleUpdate() {
    dispatch(showModal({
      modalType: "update-part",
      modalProps: {
        materialId,
        part,
      }
    }))
  }

  function handleDelete() {
    dispatch(showModal({
      modalType: "delete-part",
      modalProps: {
        materialId,
        part,
      }
    }))
  }

  return (
    <Draggable draggableId={part.id} index={index}>
      {provided => (
        <SContainer
          ref={provided.innerRef}
          to={`/parts/${part.id}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div>
            <SHeadingId>{part.id}</SHeadingId>
            <SName>{part.name}</SName>
          </div>
          <PartListItemMenu />
        </SContainer>
      )}
    </Draggable>
  )
};

const SContainer = styled(Link)`
  background: ${theme.colors.offWhite};
  box-shadow: ${theme.boxShadows.light};
  display: flex;
    align-items: center;
    justify-content: space-between;
  margin-top: ${theme.spacing.base};
  padding: ${theme.spacing.base};
  max-width: 80rem;
`;

const SHeadingId = styled.h4`
  color: ${theme.colors.gray[400]};
  font-size: ${theme.fontSizes.xs};
  font-weight: 400;
`;

const SName = styled.h3`
  font-size: ${theme.fontSizes.md};
`;