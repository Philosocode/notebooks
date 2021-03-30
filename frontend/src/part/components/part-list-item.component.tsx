import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

import { IPart } from "part/redux/part.types";
import { IMenuAction, Menu } from "../../shared/components/menu/menu.component";
import { useToggle } from "../../shared/hooks/use-toggle.hook";
import { showModal } from "modal/redux/modal.slice";

import { CircleIcon } from "../../shared/components/button/circle-icon.component";

import { theme } from "shared/styles/theme.style";

interface IProps {
  index: number;
  materialId: string;
  part: IPart;
}
export const PartListItem: React.FC<IProps> = ({ index, materialId, part }) => {
  const dispatch = useDispatch();
  const [menuShowing, toggleMenuShowing] = useToggle(false);

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

  const menuActions: IMenuAction[] = [
    { name: "Edit", icon: "pencil-alt", action: handleUpdate },
    { name: "Delete", icon: "trash", action: handleDelete }
  ];

  return (
    <Draggable draggableId={part.id} index={index} isDragDisabled={false}>
      {provided => (
        <SContainer
          to={`/parts/${part.id}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <SName>{part.name}</SName>
          <div>
            <CircleIcon handleClick={toggleMenuShowing} icon="ellipsis-v" />
            <SMenuContainer>
              <Menu actions={menuActions} menuShowing={menuShowing} toggleMenu={toggleMenuShowing} />
            </SMenuContainer>
          </div>
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

const SName = styled.h3`
  font-size: ${theme.fontSizes.basePlus};
  
  ${theme.media.tabLand} {
    font-size: ${theme.fontSizes.md};
  }
`;

const SMenuContainer = styled.div`
  transform: translate(-8rem, -0.5rem);
`;