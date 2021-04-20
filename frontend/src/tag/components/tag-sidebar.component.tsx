import React  from "react";
import styled from "styled-components";

import { TagSidebarItem } from "./tag-sidebar-item.component";
import { theme } from "shared/styles/theme.style";
import { useDispatch, useSelector } from "react-redux";
import { selectSidebarShowing, setSidebarShowing } from "../../shared/redux/global.slice";
import { useIsMobile } from "../../shared/hooks/use-is-mobile.hook";

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
  const dispatch = useDispatch();
  const sidebarShowing = useSelector(selectSidebarShowing);
  const isMobile = useIsMobile();

  function handleTagClick(tag: string) {
    setCurrentTag(tag);
    hideMobileSidebar();
  }

  function handleUncategorizedClick(_: string) {
    setUncategorized("");
    hideMobileSidebar();
  }

  function hideMobileSidebar() {
    if (isMobile && sidebarShowing) {
      dispatch(setSidebarShowing(false));
    }
  }

  return (
    <STagSidebar sidebarShowing={sidebarShowing} isMobile={isMobile}>
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
          handleClick={handleTagClick}
          tag=""
          icon="layer-group"
        >
          all
        </TagSidebarItem>

        <TagSidebarItem
          isSelected={isUncategorized}
          handleClick={handleUncategorizedClick}
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
  isMobile: boolean;
}
const STagSidebar = styled.aside<STagSidebarProps>`
  background: ${theme.colors.white};
  border-right: 1px solid ${theme.colors.gray[200]};
  height: 100vh;
  max-height: 100vh;
  position: fixed;
    left: ${props => props.isMobile
            ? theme.componentSizes.appSidebarWidthMobile
            : theme.componentSizes.appSidebarWidth
  };
  overflow-y: auto;
  transition: width ${theme.animations.transitionAppend}, transform ${theme.animations.transitionAppend};
  transform: ${props => props.sidebarShowing ? "translateX(0)" : `translateX(-30rem);` };
  width: ${props => {
    if (!props.sidebarShowing) {
      return 0;
    }
    
    if (props.isMobile) {
      return theme.componentSizes.tagSidebarWidthMobile;
    } else {
      return theme.componentSizes.tagSidebarWidth;
    }
  }};
  
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
