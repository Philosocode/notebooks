import React  from "react";
import styled from "styled-components";

import { TagSidebarItem } from "./tag-sidebar-item.component";
import { theme } from "shared/styles/theme.style";
import { useSelector } from "react-redux";
import { selectSidebarShowing } from "../../shared/redux/global.slice";

interface IProps {
  tags: string[];
  currentTag: string;
  isUncategorized: boolean;

  setCurrentTag: (tag: string) => void;
  setUncategorized: (_: string) => void;
}
export const TagSidebar: React.FC<IProps> = ({
  currentTag,
  isUncategorized,
  tags,
  setCurrentTag,
  setUncategorized
}) => {
  const sidebarShowing = useSelector(selectSidebarShowing);

  return (
    <STagSidebar sidebarShowing={sidebarShowing}>
      <SHeading>Tags</SHeading>
      <STagList>
        {tags.map((t) => (
          <TagSidebarItem
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
          isSelected={!isUncategorized && currentTag === ""}
          handleClick={setCurrentTag}
          tag=""
          icon="layer-group"
        >
          all
        </TagSidebarItem>

        <TagSidebarItem
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

interface STagSidebarProps {
  sidebarShowing: boolean;
}
const STagSidebar = styled.aside<STagSidebarProps>`
  background: ${theme.colors.white};
  height: 100vh;
  max-height: 100vh;
  overflow-y: auto;
  transition: width ${theme.animations.transitionAppend}, transform ${theme.animations.transitionAppend};
  transform: ${props => props.sidebarShowing ? "translateX(0)" : `translateX(-30rem);` };
  width: ${props => props.sidebarShowing ? "30rem" : 0};
  z-index: 200;
`;

const SHeading = styled.h2`
  font-size: ${theme.fontSizes.md};
  padding: ${theme.spacing.md};
`;

const STagList = styled.ul`
  list-style-type: none;
`;
