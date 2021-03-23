import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { theme } from "shared/styles/theme.style";
import { TagList } from "tag/components/tag-list.component";
import { OptionIcon } from "../button/option-icon.component";
import { SHeadingSubSubtitle, SHeadingSubtitle } from "../../styles/typography.style";
import { CircleIcon } from "../button/circle-icon.component";

interface IEntity {
  id: string;
  name: string;
  tags: string[];
}
interface IProps {
  entity: IEntity;
  link: string;
  updateEntity: () => void;
  deleteTag: (tag: string) => void;
  children?: React.ReactNode;
}
export const EntityListItem: React.FC<IProps> = ({
  children,
  entity,
  link,
  updateEntity,
  deleteTag,
}) => {
  function handleEdit(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    updateEntity();
  }

  function handleDeleteTag(tag: string) {
    deleteTag(tag);
  }

  return (
    <SContainer to={link}>
      <div>
        <SHeadingSubSubtitle>{entity.name}</SHeadingSubSubtitle>
        {children}
        <TagList tags={entity.tags} handleDeleteTag={handleDeleteTag} />
      </div>
      <SIcon icon="ellipsis-v" handleEventClick={handleEdit} />
    </SContainer>
  );
};

const SContainer = styled(Link)`
  border: 1px solid ${theme.colors.gray[200]};
  display: flex;
    justify-content: space-between;
    align-items: center;
  padding: ${theme.spacing.base} ${theme.spacing.sm};
  position: relative;
  width: 100%;
  
  ${theme.media.tabLand} {
    padding: ${theme.spacing.base} ${theme.spacing.md};
  }

  &:hover {
    background: ${theme.colors.offWhite};
  }
`;

const SIcon = styled(CircleIcon)`
  font-size: ${theme.fontSizes.basePlus};
  
  ${theme.media.tabLand} {
    font-size: 2rem;
  }
`;