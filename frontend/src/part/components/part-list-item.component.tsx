import React from "react";
import { useDispatch } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

import { IPart } from "part/redux/part.types";

import { Menu, IMenuAction } from "shared/components/menu/menu.component";

import { theme } from "shared/styles/theme.style";
import { showModal } from "modal/redux/modal.slice";

interface IProps {
  index: number;
  materialId: string;
  part: IPart;
}
export const PartListItem: React.FC<IProps> = ({ index, materialId, part }) => {
  const dispatch = useDispatch();

  const menuActions: IMenuAction[] = [
    { name: "Edit", icon: "pencil-alt", action: handleUpdate },
    { name: "Delete", icon: "trash", action: handleDelete }
  ];

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
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div>
            <SHeadingId>{part.id}</SHeadingId>
            <SName>{part.name}</SName>
          </div>
          <Menu actions={menuActions} />
        </SContainer>
      )}
    </Draggable>
  )
};

const SContainer = styled.li`
  background: ${theme.colors.offWhite};
  box-shadow: ${theme.boxShadows.light};
  display: flex;
    align-items: center;
    justify-content: space-between;
  margin-top: ${theme.spacing.base};
  padding: ${theme.spacing.base};
`;

const SHeadingId = styled.h4`
  color: ${theme.colors.gray[400]};
  font-size: ${theme.fontSizes.xs};
  font-weight: 400;
`;

const SName = styled.h3`
  font-size: ${theme.fontSizes.md};
`;