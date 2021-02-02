import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { selectConceptTags } from "concept/redux/concept.selectors";
import { TagSidebarItem } from "./tag-sidebar-item.component";
import { theme } from "shared/styles/theme.styles";
import { setCurrConceptTag } from "concept/redux/concept.slice";

export const TagSidebar: FC = () => {
  const conceptTags = useSelector(selectConceptTags);
  const dispatch = useDispatch();

  const setCurrTag = (tag: string) => {
    dispatch(setCurrConceptTag(tag));
  };

  return (
    <STagSidebar>
      <SHeading>Tags</SHeading>
      <STagList>
        {conceptTags.map((t) => (
          <TagSidebarItem key={t} tag={t} setCurrTag={setCurrTag} />
        ))}
        <TagSidebarItem tag="all" setCurrTag={() => setCurrTag("")} />
        <TagSidebarItem
          tag="uncategorized"
          setCurrTag={() => setCurrTag("uncategorized")}
        />
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
