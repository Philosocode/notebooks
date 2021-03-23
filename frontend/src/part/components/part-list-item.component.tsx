import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { IPart } from "part/redux/part.types";
import { IMenuAction, Menu } from "../../shared/components/menu/menu.component";
import { useToggle } from "../../shared/hooks/use-toggle.hook";
import { showModal } from "modal/redux/modal.slice";

import { CircleIcon } from "../../shared/components/button/circle-icon.component";

import { theme } from "shared/styles/theme.style";
import { DraggableWrapper } from "../../shared/components/drag-and-drop/draggable-wrapper.component";

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
    <DraggableWrapper draggableId={part.id} dragDisabled={false} index={index}>
      <SContainer to={`/parts/${part.id}`}>
        <div>
          <SHeadingId>{part.id}</SHeadingId>
          <SName>{part.name}</SName>
        </div>
        <div>
          <CircleIcon handleClick={toggleMenuShowing} icon="ellipsis-v" />
          <SMenuContainer>
            <Menu actions={menuActions} menuShowing={menuShowing} toggleMenu={toggleMenuShowing} />
          </SMenuContainer>
        </div>
      </SContainer>
    </DraggableWrapper>
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

const SMenuContainer = styled.div`
  transform: translate(-8rem, -0.5rem);
`;