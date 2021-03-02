import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { theme } from "shared/styles/theme.style";
import { TagList } from "tag/components/tag-list.component";
import { OptionIcon } from "../button/option-icon.component";

interface IEntity {
  id: string;
  name: string;
  tags: string[];
}
interface IProps {
  entity: IEntity;
  link: string;
  updateEntity: () => void;
  deleteTag: (entityId: string, tag: string) => void;
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
    deleteTag(entity.id, tag);
  }

  return (
    <SContainer to={link}>
      <div>
        <SHeadingId>{[entity.id]}</SHeadingId>
        <SName>{entity.name}</SName>
        {children}
        <TagList tags={entity.tags} handleDeleteTag={handleDeleteTag} />
      </div>
      <OptionIcon handleClick={handleEdit} />
    </SContainer>
  );
};

const SContainer = styled(Link)`
  border: 1px solid ${theme.colors.gray[200]};
  display: flex;
  justify-content: space-between;
    align-items: center;
  padding: ${theme.spacing.md};
  position: relative;
  width: 100%;

  &:hover {
    background: ${theme.colors.offWhite};
  }
`;

const SHeadingId = styled.h4`
  color: ${theme.colors.gray[400]};
  font-size: ${theme.fontSizes.xs};
  font-weight: 400;
`;

const SName = styled.h3`
  font-size: ${theme.fontSizes.md};
`;