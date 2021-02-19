import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

// logic
import { repositionHook } from "concept/redux/concept.slice";

// components
import { HookListItem } from "./hook-list-item.component";

// styles
import { theme } from "../../shared/styles/theme.style";
import { SHeadingSubSubtitle } from "shared/styles/typography.style";
import { IHook } from "../redux/hook.types";
import { updateHook, updateHookPosition } from "../redux/hook.thunks";

interface IExpandedHooks {
  [key: string]: boolean;
}
interface IProps {
  conceptId: string;
  hooks: IHook[];
}
export const HookList: React.FC<IProps> = ({ conceptId, hooks }) => {
  const dispatch = useDispatch();

  const [expandedHooks, setExpandedHooks] = useState<IExpandedHooks>({});

  function toggleExpandedHook(hookId: string) {
    const updatedValue = !expandedHooks[hookId];

    setExpandedHooks(prevState => ({ ...prevState, [hookId]: updatedValue }));
  }

  function handleDragEnd(result: DropResult) {
    const { source, destination } = result;
    if (!destination || destination.index === source.index) return;

    const oldIndex = source.index;
    const newIndex = destination.index;

    dispatch(repositionHook({
      ownerEntityId: conceptId,
      oldIndex,
      newIndex
    }));

    // async call to update position on backend
    dispatch(updateHookPosition({
      conceptId,
      hookId: hooks[oldIndex].id,
      newPosition: newIndex,
    }));
  }

  return (
    <SContainer>
      <SHeadingSubSubtitle># Hooks: {hooks.length}</SHeadingSubSubtitle>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="hook-list-droppable">
          {((provided) => (
            <SDroppableContainer
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <SHookList>
                {hooks.map((hook, index) => (
                  <HookListItem
                    key={hook.id}
                    hook={hook}
                    index={index}
                    isExpanded={expandedHooks[hook.id]}
                    toggleIsExpanded={toggleExpandedHook}
                  />
                ))}
              </SHookList>
              {provided.placeholder}
            </SDroppableContainer>
          ))}
        </Droppable>
      </DragDropContext>
    </SContainer>
  );
};

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SDroppableContainer = styled.div`
  list-style-type: none;
  width: 100%;
`;

const SHookList = styled.ul`
  margin-top: ${theme.spacing.md};
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
`;