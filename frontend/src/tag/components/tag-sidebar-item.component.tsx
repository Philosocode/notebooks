import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import { theme } from "shared/styles/theme.style";
import { showModal } from "modal/redux/modal.slice";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface IProps {
  children: React.ReactNode;
  currentTag: string;
  handleClick: (name: string) => void;
  isSelected: boolean;
  icon: IconProp;
  tag?: string;
  showActions?: boolean;
}
export const TagSidebarItem: FC<IProps> = ({
  children,
  currentTag,
  handleClick,
  isSelected,
  icon,
  tag,
  showActions,
}) => {
  const dispatch = useDispatch();

  function handleEdit(event: React.MouseEvent) {
    event.stopPropagation();

    dispatch(
      showModal({
        modalType: "update-tag",
        modalProps: {
          oldTagName: tag,
        },
      })
    );
  }

  function handleDeleteTag(event: React.MouseEvent) {
    event.stopPropagation();

    dispatch(
      showModal({
        modalType: "delete-tag",
        modalProps: {
          tagName: tag,
        },
      })
    );
  }

  function handleItemClick() {
    handleClick(tag ?? "");
  }

  return (
    <SContainer onClick={handleItemClick} isSelected={isSelected}>
      <div>
        <SIcon icon={icon} />
        {children}
      </div>
      {
        showActions ? (
          <SActionIcons>
            <SEditIcon icon="pencil-alt" onClick={handleEdit} />
            <SDeleteIcon icon="trash" onClick={handleDeleteTag} />
          </SActionIcons>
        ) : null
      }
    </SContainer>
  );
};

const SActionIcons = styled.div`
  visibility: hidden;
`;

interface IContainerProps {
  isSelected: boolean;
}
const SContainer = styled.li<IContainerProps>`
  ${(p) => (p.isSelected ? `background: ${theme.colors.gray[100]}` : null)};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.sm} ${theme.spacing.base};

  &:hover {
    background: ${theme.colors.gray[100]};
  }

  &:hover ${SActionIcons} {
    visibility: visible;
  }
`;

const SIcon = styled(FontAwesomeIcon)`
  color: ${theme.colors.gray[600]};
  margin-right: ${theme.spacing.sm};
`;

const SEditIcon = styled(FontAwesomeIcon)`
  font-size: 1.8rem;
  margin-right: ${theme.spacing.sm};

  &:hover {
    color: orange;
  }
`;

const SDeleteIcon = styled(FontAwesomeIcon)`
  font-size: 1.8rem;

  &:hover {
    color: ${theme.colors.red[300]};
  }
`;
