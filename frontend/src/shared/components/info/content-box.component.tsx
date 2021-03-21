import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AutosizeTextarea from "react-textarea-autosize";
import styled from "styled-components";

// styles
import { theme } from "shared/styles/theme.style";

export interface IContentBoxProps {
  entityId: string;
  index: number;
  title: string;
  content: string;
  isExpanded: boolean;
  toggleIsExpanded: (entityId: string) => void;
  headerSlot?: React.ReactNode;
  buttonSlot?: React.ReactNode;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}
export const ContentBox: React.FC<IContentBoxProps> = ({
  entityId,
  index,
  title,
  content,
  isExpanded,
  toggleIsExpanded,
  headerSlot,
  buttonSlot,
  handleChange,
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
            <STitleTextarea name="title" onChange={handleChange} value={title} placeholder="Enter title">
              {title}
            </STitleTextarea>
            <SContentTextarea name="content" onChange={handleChange} value={content} placeholder="Enter content">
              {content}
            </SContentTextarea>
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
  padding: 0 ${theme.spacing.base};
  list-style-type: none;

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
  padding: ${(props) => props.isExpanded ? theme.spacing.base : theme.spacing.sm} 0;
`;

const SHeaderColumn = styled.div`
  display: flex;
  align-items: center;
`;

const STitle = styled.h3`
  text-align: left;
  font-weight: 500;
  margin-left: ${theme.spacing.sm};
`;

const SPosition = styled.div`
  background: ${theme.colors.gray[200]};
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${theme.fontSizes.sm};
  height: 2.5rem;
  width: 2.5rem;
`;

const SCaret = styled(FontAwesomeIcon)`
  color: ${theme.colors.gray[500]};
  font-size: 3rem;
`;

export const STextareaBase = styled(AutosizeTextarea)`
  background: transparent;
  border: 1px solid ${theme.colors.gray[300]};
  padding: 0;
  resize: none;
  overflow: hidden;
  width: 100%;

  &:active,
  &:focus {
    border-color: ${theme.colors.gray[800]};
    outline: none;
  }
`;

const STitleTextarea = styled(STextareaBase)`
  border-top: none;
  border-left: none;
  border-right: none;
  padding-bottom: 5px;
`;

const SContentTextarea = styled(STextareaBase)`
  margin-top: ${theme.spacing.sm};
  padding: ${theme.spacing.sm};
`;

const SButtons = styled.div`
  margin-top: ${theme.spacing.sm};
  padding-bottom: ${theme.spacing.base};

  & > button {
    font-size: ${theme.fontSizes.sm};
  }

  & > button:first-child {
    margin-right: ${theme.spacing.base};
  }
`;