import React, { useState } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

// logic
import { IHook } from "hook/redux/hook.types";

// styles
import { theme } from "../../shared/styles/theme.style";
import { HookListItem } from "./hook-list-item.component";
import { SHeadingSubSubtitle } from "shared/styles/typography.style";
import { useDispatch, useSelector } from "react-redux";
import { repositionHook } from "concept/redux/concept.slice";
import { selectCurrentConcept, selectCurrentConceptHooks } from "../../concept/redux/concept.selectors";

interface IExpandedHooks {
  [key: string]: boolean;
}
interface IProps {
  conceptId: string;
  hooks: IHook[];
}
export const HookList: React.FC<IProps> = ({ conceptId, hooks }) => {
  const [expandedHooks, setExpandedHooks] = useState<IExpandedHooks>(initExpandedHooks());
  const dispatch = useDispatch();

  console.log("HOOKS", hooks);

  function initExpandedHooks() {
    const hash: IExpandedHooks = {};

    hooks.forEach(hook => hash[hook.id] = false);

    return hash;
  }

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