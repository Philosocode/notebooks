import React, { FC } from "react";
import styled from "styled-components";

import { TagSidebarItem } from "./tag-sidebar-item.component";
import { theme } from "shared/styles/theme.style";
import { IEntityFilter } from "shared/types.shared";

interface IProps {
  filters: IEntityFilter;
  tags: string[];
  
  setCurrTag: (tag: string) => void;
  setUncategorized: () => void;
}
export const TagSidebar: FC<IProps> = ({ filters, tags, setCurrTag, setUncategorized }) => {
  const { tag: currTag, isUncategorized } = filters;

  return (
    <STagSidebar>
      <SHeading>Tags</SHeading>
      <STagList>
        {tags.map((t) => (
          <TagSidebarItem
            currTag={currTag}
            key={t}
            tag={t}
            icon="tag"
            handleClick={setCurrTag}
            isSelected={!isUncategorized && currTag === t}
            showActions
          >
            {t}
          </TagSidebarItem>
        ))}

        <TagSidebarItem
          currTag={currTag}
          isSelected={!isUncategorized && currTag === ""}
          handleClick={setCurrTag}
          tag=""
          icon="layer-group"
        >
          all
        </TagSidebarItem>

        <TagSidebarItem
          currTag={currTag}
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
