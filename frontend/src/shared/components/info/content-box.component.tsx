import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

// styles
import { theme } from "shared/styles/theme.style";
import { STextareaBase } from "../../styles/form.style";
import { MarkdownEditor, TMarkdownEditorTab } from "../../mde/markdown-editor.component";

export interface IContentBoxProps {
  entityId: string;
  index: number;
  title: string;
  content: string;
  isExpanded: boolean;
  toggleIsExpanded: (entityId: string) => void;
  initialTab?: TMarkdownEditorTab;
  headerSlot?: React.ReactNode;
  buttonSlot?: React.ReactNode;
  handleTitleChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleContentChange?: (value: string) => void;
}
export const ContentBox: React.FC<IContentBoxProps> = ({
  entityId,
  index,
  title,
  content,
  isExpanded,
  toggleIsExpanded,
  initialTab,
  headerSlot,
  buttonSlot,
  handleTitleChange,
  handleContentChange,
}) => {
  function handleToggleClick() {
    toggleIsExpanded(entityId);
  }

  return (
    <SContainer
      isExpanded={isExpanded}
    >
      <SHeader isExpanded={isExpanded} onClick={handleToggleClick}>
        <SHeaderColumn>
          <SPosition>{index + 1}</SPosition>
          { headerSlot }
          {!isExpanded && <STitle>{title}</STitle>}
        </SHeaderColumn>
        <SCaret icon={isExpanded ? "caret-up" : "caret-down"} />
      </SHeader>
      {
        isExpanded && (
          <>
            <STitleTextarea name="title" onChange={handleTitleChange} value={title} placeholder="Enter title">
              {title}
            </STitleTextarea>
            <MarkdownEditor
              value={content}
              setValue={handleContentChange}
              placeholder="Enter content"
              initialTab={initialTab}
            />
            <SButtons>
              {buttonSlot}
            </SButtons>
          </>
        )
      }
    </SContainer>
  );
};

interface IExpanded {
  isExpanded: boolean;
}

const SContainer = styled.li<IExpanded>`
  background: ${theme.colors.offWhite};
  box-shadow: ${theme.boxShadows.light};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  list-style-type: none;
  text-align: left;
  
  ${theme.media.tabLand} {
    padding: 0 ${theme.spacing.base};
  }

  &:first-child {
    border-top: none;
  }
`;

const SHeader = styled.div<IExpanded>`
  background: ${theme.colors.green};
  cursor: pointer;
  display: flex;
    align-items: center;
    justify-content: space-between;
  position: relative;
  padding: ${(props) => props.isExpanded ? theme.spacing.sm : theme.spacing.xs} 0;

  ${theme.media.tabLand} {
    padding: ${(props) => props.isExpanded ? theme.spacing.base : theme.spacing.sm} 0;
  }
`;

const SHeaderColumn = styled.div`
  display: flex;
  align-items: center;
`;

const STitle = styled.h3`
  font-size: ${theme.fontSizes.sm};
  font-weight: 500;
  margin-left: ${theme.spacing.sm};
  margin-right: ${theme.spacing.sm};
  
  ${theme.media.tabLand} {
    font-size: ${theme.fontSizes.base};
  }
`;

const SPosition = styled.div`
  background: ${theme.colors.gray[200]};
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${theme.fontSizes.sm};
  height: 1.8em;
  width: 1.8em;
  min-width: 1.8em;
`;

const SCaret = styled(FontAwesomeIcon)`
  color: ${theme.colors.gray[500]};
  font-size: 2.5rem;
  
  ${theme.media.tabLand} {
    font-size: 3rem;
  }
`;

const STitleTextarea = styled(STextareaBase)`
  border-top: none;
  border-left: none;
  border-right: none;
  padding-bottom: 5px;
`;

const SButtons = styled.div`
  margin-top: calc(${theme.spacing.sm} + 5px);
  padding-bottom: ${theme.spacing.sm};
  
  ${theme.media.tabLand} {
    padding-bottom: ${theme.spacing.base};
  }

  & > button {
    font-size: ${theme.fontSizes.sm};
  }

  & > button:first-child {
    margin-right: ${theme.spacing.base};
  }
`;