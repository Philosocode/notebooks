import React, { Dispatch, FC, SetStateAction } from "react";
import styled from "styled-components";

import { TagSidebarItem } from "./tag-sidebar-item.component";
import { theme } from "shared/styles/theme.style";
import { IEntityFilter } from "shared/types.shared";

interface IProps {
  tags: string[];
  currentTag: string;
  isUncategorized: boolean;

  setCurrentTag: (tag: string) => void;
  setUncategorized: (_: string) => void;
}
export const TagSidebar: FC<IProps> = ({
  currentTag,
  isUncategorized,
  tags,
  setCurrentTag,
  setUncategorized
}) => {
  return (
    <STagSidebar>
      <SHeading>Tags</SHeading>
      <STagList>
        {tags.map((t) => (
          <TagSidebarItem
            currentTag={currentTag}
            key={t}
            tag={t}
            icon="tag"
            handleClick={setCurrentTag}
            isSelected={!isUncategorized && currentTag === t}
            showActions
          >
            {t}
          </TagSidebarItem>
        ))}

        <TagSidebarItem
          currentTag={currentTag}
          isSelected={!isUncategorized && currentTag === ""}
          handleClick={setCurrentTag}
          tag=""
          icon="layer-group"
        >
          all
        </TagSidebarItem>

        <TagSidebarItem
          currentTag={currentTag}
          isSelected={isUncategorized}
          handleClick={setUncategorized}
          icon="question-circle"
        >
          uncategorized
        </TagSidebarItem>

      </STagList>
    </STagSidebar>
  );
};

const STagSidebar = styled.aside`
  border-right: 1px solid ${theme.colors.gray[600]};
  height: 100vh;
  max-height: 100vh;
  overflow-y: auto;
  width: 30rem;
`;

const SHeading = styled.h2`
  font-size: ${theme.fontSizes.md};
  padding: ${theme.spacing.md};
`;

const STagList = styled.ul`
  list-style-type: none;
`;
