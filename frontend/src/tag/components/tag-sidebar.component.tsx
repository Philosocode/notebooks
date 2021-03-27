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
  border-right: 1px solid ${theme.colors.gray[200]};
  height: 100vh;
  max-height: 100vh;
  position: fixed;
    left: ${theme.componentSizes.appSidebarWidth};
  overflow-y: auto;
  transition: width ${theme.animations.transitionAppend}, transform ${theme.animations.transitionAppend};
  transform: ${props => props.sidebarShowing ? "translateX(0)" : `translateX(-30rem);` };
  width: ${props => props.sidebarShowing ? "30rem" : 0};
  max-width: calc(100vw - ${theme.componentSizes.appSidebarWidth});
  z-index: ${theme.zIndices.sidebar};
  
  ${theme.media.tabLand} {
    position: static;
  }
`;

const SHeading = styled.h2`
  font-size: ${theme.fontSizes.md};
  padding: ${theme.spacing.base};

  ${theme.media.tabLand} {
    padding: ${theme.spacing.md};
  }
`;

const STagList = styled.ul`
  list-style-type: none;
`;
