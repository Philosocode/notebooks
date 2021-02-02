import React, { FC } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { selectConceptTags } from "concept/redux/concept.selectors";
import { TagSidebarItem } from "./tag-sidebar-item.component";
import { theme } from "shared/styles/theme.styles";

export const TagSidebar: FC = () => {
  const conceptTags = useSelector(selectConceptTags);

  return (
    <STagSidebar>
      <SHeading>Tags</SHeading>
      <STagList>
        {
          conceptTags.map(t => <TagSidebarItem tag={t} />)
        }
      </STagList>
    </STagSidebar>
  );
}

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