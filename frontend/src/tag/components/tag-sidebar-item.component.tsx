import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import { theme } from "shared/styles/theme.style";
import { showModal } from "modal/redux/modal.slice";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface IProps {
  children: React.ReactNode;
  handleClick: (name: string) => void;
  isSelected: boolean;
  icon: IconProp;
  tag?: string;
  showActions?: boolean;
}
export const TagSidebarItem: FC<IProps> = ({
  children,
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
      <SLeftColumn>
        <SIcon icon={icon} />
        <STagName>
          {children}
        </STagName>
      </SLeftColumn>
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
  position: absolute;
    right: ${theme.spacing.sm};
  ${theme.media.tabLand} {
    visibility: hidden;
  }
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
  
  ${theme.media.tabLand} {
    &:hover ${SActionIcons} {
      visibility: visible;
    }
  }
`;

const SLeftColumn = styled.div`
  display: flex;
  align-items: center;
`;

const SIcon = styled(FontAwesomeIcon)`
  color: ${theme.colors.gray[600]};
  margin-right: ${theme.spacing.sm};
`;

const SEditIcon = styled(FontAwesomeIcon)`
  margin-right: ${theme.spacing.sm};

  &:hover {
    color: orange;
  }
`;

const STagName = styled.span`
  display: inline-block;
  max-width: 15rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SDeleteIcon = styled(FontAwesomeIcon)`
  ${theme.media.tabLand} {
    font-size: ${theme.fontSizes.basePlus};
  }
  &:hover {
    color: ${theme.colors.red[300]};
  }
`;
