import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Draggable } from "react-beautiful-dnd";

// logic
import { IHook } from "hook/redux/hook.types";
import { useForm } from "../../shared/hooks/use-form.hook";
import { showModal } from "modal/redux/modal.slice";
import { deleteHook, updateHook } from "../redux/hook.thunks";

// styles
import { theme } from "../../shared/styles/theme.style";
import { STextareaBase } from "../styles/hook.style";
import { SButtonGreen, SButtonRed } from "shared/styles/button.style";
import { selectCurrentConcept } from "../../concept/redux/concept.selectors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IProps {
  dragDisabled: boolean;
  index: number;
  isExpanded: boolean;
  toggleIsExpanded: (hookId: string) => void;
  hook: IHook;
}

export const HookListItem: React.FC<IProps> = ({ dragDisabled, index, isExpanded, hook, toggleIsExpanded }) => {
  const dispatch = useDispatch();
  const currentConcept = useSelector(selectCurrentConcept);

  const { handleChange, values } = useForm({
    title: hook.title,
    content: hook.content
  });

  const { content, title } = values;

  function showDeleteHookModal() {
    dispatch(showModal({
      modalType: "confirmation",
      modalProps: {
        handleConfirm: handleDeleteHook,
        title: "Delete Hook",
        text: `Are you sure you want to delete this hook?`,
        confirmButtonText: "Delete",
        isWarning: true
      }
    }));
  }

  function handleUpdateHook() {
    if (!currentConcept) return;
    if (buttonDisabled()) return;

    const updates = {
      ...(titleChanged() && { title }),
      ...(contentChanged() && { content }),
    };

    dispatch(updateHook({
      conceptId: currentConcept.id,
      hookId: hook.id,
      updates,
    }));
  }

  function handleToggleClick() {
    toggleIsExpanded(hook.id);
  }

  function handleDeleteHook() {
    if (!currentConcept) return;

    dispatch(deleteHook({
      hookId: hook.id,
      conceptId: currentConcept.id,
    }));
  }

  function titleChanged() {
    return title.trim() !== hook.title;
  }

  function contentChanged() {
    return content.trim() !== hook.content;
  }

  function buttonDisabled() {
    if (title.trim() === "" || content.trim() === "") return true;

    return (!titleChanged() && !contentChanged());
  }

  return (
    <Draggable draggableId={hook.id} index={index} isDragDisabled={dragDisabled}>
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
              {!isExpanded && <SHookTitle>{hook.title}</SHookTitle>}
            </SHeaderColumn>
            <SCaret icon={isExpanded ? "caret-up" : "caret-down"} />
          </SHeader>
          {
            isExpanded && (
              <>
                <STitleTextarea name="title" onChange={handleChange} value={title} placeholder="Enter hook title">
                  {hook.title}
                </STitleTextarea>
                <SContentTextarea name="content" onChange={handleChange} value={content} placeholder="Enter hook content">
                  {hook.content}
                </SContentTextarea>
                <SButtons>
                  <SButtonGreen
                    disabled={buttonDisabled()}
                    onClick={handleUpdateHook}
                  >Update</SButtonGreen>
                  <SButtonRed onClick={showDeleteHookModal}>Delete</SButtonRed>
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

const SHookTitle = styled.h3`
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