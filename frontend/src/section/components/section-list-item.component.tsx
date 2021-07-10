import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

import { ISection } from "section/redux/section.types";
import { IMenuAction, Menu } from "../../shared/components/menu/menu.component";
import { useToggle } from "../../shared/hooks/use-toggle.hook";
import { showModal } from "modal/redux/modal.slice";

import { CircleIcon } from "../../shared/components/button/circle-icon.component";

import { theme } from "shared/styles/theme.style";

interface IProps {
  index: number;
  notebookId: string;
  section: ISection;
}
export const SectionListItem: React.FC<IProps> = ({ index, notebookId, section }) => {
  const dispatch = useDispatch();
  const [menuShowing, toggleMenuShowing] = useToggle(false);

  function handleUpdate() {
    dispatch(showModal({
      modalType: "update-section",
      modalProps: {
        notebookId,
        section,
      }
    }))
  }

  function handleDelete() {
    dispatch(showModal({
      modalType: "delete-section",
      modalProps: {
        notebookId,
        section,
      }
    }))
  }

  const menuActions: IMenuAction[] = [
    { name: "Edit", icon: "pencil-alt", action: handleUpdate },
    { name: "Delete", icon: "trash", action: handleDelete }
  ];

  return (
    <Draggable draggableId={section.id} index={index} isDragDisabled={false}>
      {provided => (
        <SContainer
          to={`/sections/${section.id}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <SName>{section.name}</SName>
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
  padding: ${theme.spacing.sm} ${theme.spacing.sm};
  max-width: 60rem;
  
  ${theme.media.tabPort} {
    padding: ${theme.spacing.base};
  }
`;

const SName = styled.h3`
  font-size: ${theme.fontSizes.base};
  font-weight: 500;
  
  ${theme.media.tabLand} {
    font-size: ${theme.fontSizes.basePlus};
  }
`;

const SMenuContainer = styled.div`
  transform: translate(-8rem, -0.5rem);
`;