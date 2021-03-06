import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import AutosizeTextarea from "react-textarea-autosize";
import styled from "styled-components";

// logic
import { useForm } from "shared/hooks/use-form.hook";

// styles
import { theme } from "shared/styles/theme.style";
import { SButtonGreen, SButtonRed } from "shared/styles/button.style";

interface IProps {
  dragDisabled: boolean;
  entityId: string;
  index: number;
  initialContent: string;
  initialName: string;
  isExpanded: boolean;
  handleDelete: (entityId: string) => void;
  handleUpdate: (name: string, content: string) => void;
  toggleIsExpanded: (entityId: string) => void;
}

export const DraggableContentBox: React.FC<IProps> = ({
  dragDisabled,
  entityId,
  index,
  initialName,
  initialContent,
  isExpanded,
  handleDelete,
  handleUpdate,
  toggleIsExpanded,
}) => {
  const dispatch = useDispatch();

  const { handleChange, values, itemsChanged } = useForm({
    title: initialName,
    content: initialContent,
  });

  const { content, title } = values;

  // event handlers
  function handleToggleClick() {
    toggleIsExpanded(entityId);
  }

  function handleDeleteClick() {
    handleDelete(entityId);
  }

  function handleUpdateClick() {
    //   if (!currentConcept) return;
    //   if (buttonDisabled()) return;
    //
    //   const updates = {
    //     ...(titleChanged() && { title }),
    //     ...(contentChanged() && { content }),
    //   };
    //
    //   dispatch(updateHook({
    //     conceptId: currentConcept.id,
    //     hookId: hook.id,
    //     updates,
    //   }));
  }

  // functions
  function buttonDisabled() {
    if (title.trim() === "" || content.trim() === "") return true;

    return itemsChanged();
  }

  return (
    <Draggable draggableId={entityId} index={index} isDragDisabled={dragDisabled}>
      {provided => (
        <SContainer
          isExpanded={isExpanded}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <SHeader isExpanded={isExpanded} onClick={handleToggleClick}>
            <SHeaderColumn>
              <SPosition>{index + 1}</SPosition>
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
                  <SButtonGreen
                    disabled={buttonDisabled()}
                    onClick={() => {}}
                  >Update</SButtonGreen>
                  <SButtonRed onClick={handleDeleteClick}>Delete</SButtonRed>
                </SButtons>
              </>
            )
          }
        </SContainer>
      )}
    </Draggable>
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

export const SHookTitleTextarea = styled(STextareaBase)`
  border: none;
  border-bottom: 1px solid ${theme.colors.gray[300]};
  font-size: ${theme.fontSizes.basePlus};
  padding: 0;
  padding-bottom: ${theme.spacing.xs};
`;

export const SHookContentTextarea = styled(STextareaBase)`
  margin-top: ${theme.spacing.base};
  padding: ${theme.spacing.sm};
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