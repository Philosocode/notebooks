import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { selectConceptFilters, selectConceptTags } from "concept/redux/concept.selectors";
import { TagSidebarItem } from "./tag-sidebar-item.component";
import { theme } from "shared/styles/theme.styles";
import { setConceptFilters, setCurrConceptTag } from "concept/redux/concept.slice";

export const TagSidebar: FC = () => {
  const conceptTags = useSelector(selectConceptTags);
  const filters = useSelector(selectConceptFilters);

  const { tag: currConceptTag, isUncategorized } = filters;

  const dispatch = useDispatch();

  const setCurrTag = (tag: string) => {
    dispatch(setCurrConceptTag(tag));
  };

  const setIsUncategorized = (_: string) => {
    dispatch(setConceptFilters({ isUncategorized: true, tag: undefined }))
  }

  return (
    <STagSidebar>
      <SHeading>Tags</SHeading>
      <STagList>
        {conceptTags.map((t) => (
          <TagSidebarItem
            currTag={currConceptTag}
            key={t}
            tag={t}
            icon="tag"
            handleClick={setCurrTag}
            isSelected={!isUncategorized && currConceptTag === t}
            showActions
          >
            {t}
          </TagSidebarItem>
        ))}

        <TagSidebarItem
          currTag={currConceptTag}
          isSelected={!isUncategorized && currConceptTag === ""}
          handleClick={setCurrTag}
          tag=""
          icon="tags"
        >
          all
        </TagSidebarItem>

        <TagSidebarItem
          currTag={currConceptTag}
          isSelected={isUncategorized}
          handleClick={setIsUncategorized}
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
